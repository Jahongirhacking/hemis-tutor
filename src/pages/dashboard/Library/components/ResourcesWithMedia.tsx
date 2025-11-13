import { useGetBookListMutation } from '@/services/dashboard';
import { IPublisherResource } from '@/services/dashboard/type';
import { IBaseDataUniLib } from '@/services/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { truncateString } from '@/utils/stringFunc';
import { SafetyOutlined } from '@ant-design/icons';
import { Card, Empty, Flex, Image, Tag, Typography } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { LibraryContext } from '../Library';
import Authors from './Authors';

const ResourcesWithMedia = ({ children }: { children: ReactElement }) => {
  const searchValue = useContext(LibraryContext)?.searchValue;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickBook = (bookId: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.BookResource);
    newParams.set(SearchParams.DrawerProps, JSON.stringify({ bookId }));
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.in_detail'),
      })
    );
  };

  return React.cloneElement(children, {
    children: (data: IBaseDataUniLib<IPublisherResource[]>) =>
      data?.result?.data?.length !== 0 ? (
        data?.result?.data?.map(book => (
          <Card
            key={book?.id}
            className={`resource-card`}
            hoverable
            onClick={() => handleClickBook(book?.id)}
          >
            <Flex vertical gap={3}>
              <Image
                className="book-cover-img"
                preview={false}
                src={book?.publisher_resource_icon}
                fallback="/images/default-book.jpg"
              />
              <Flex
                vertical
                className="resource-card__body"
                gap={8}
                justify="space-between"
              >
                <Flex vertical gap={3}>
                  <Authors authors={book?.authors} />
                  <Typography.Text strong>
                    {truncateString(book?.name, 80)}
                  </Typography.Text>
                </Flex>
                <Flex vertical gap={3}>
                  {book?.publisher_name && (
                    <Flex gap={3} align="center">
                      <SafetyOutlined style={{ color: 'green' }} />
                      <Typography.Text
                        style={{
                          maxWidth: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {book?.publisher_name}
                      </Typography.Text>
                    </Flex>
                  )}
                  <Flex wrap gap={3} className="tags">
                    <Tag color="green">{book?.resource_category_name}</Tag>
                    <Tag color="cyan">{book?.resource_type_name}</Tag>
                    <Tag color="blue">{book?.resource_field_name}</Tag>
                    <Tag color="geekblue">{book?.resource_language_name}</Tag>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        ))
      ) : (
        <Empty
          description={`${t('const.info')} ${t('const.not_found')}`}
          style={{ margin: 'auto' }}
        />
      ),
    getMutationFunc: () => useGetBookListMutation(),
    searchValue,
  });
};

export default ResourcesWithMedia;
