import { useGetJournalListMutation } from '@/services/dashboard';
import { IJournal } from '@/services/dashboard/type';
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

const ResourcesJournal = ({ children }: { children: ReactElement }) => {
  const searchValue = useContext(LibraryContext)?.searchValue;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickJournal = (book: object) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.JournalResource);
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.in_detail'),
        props: { journal: book },
      })
    );
  };

  return React.cloneElement(children, {
    children: (data: IBaseDataUniLib<IJournal[]>) =>
      data?.result?.data?.length !== 0 ? (
        data?.result?.data?.map(book => (
          <Card
            key={book?.id}
            className="resource-card"
            hoverable
            onClick={() => {
              handleClickJournal(book);
            }}
          >
            <Flex vertical gap={3}>
              <Image
                src={book?.file_url_photo}
                fallback="/images/default-book.jpg"
                preview={false}
                className="book-cover-img"
              />
              <Flex
                vertical
                className="resource-card__body"
                gap={8}
                justify="space-between"
              >
                <Flex vertical gap={3}>
                  <Typography.Text strong>
                    {truncateString(book?.name)}
                  </Typography.Text>
                </Flex>
                <Flex vertical gap={3}>
                  {book?.university_name && (
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
                        {book?.university_name}
                      </Typography.Text>
                    </Flex>
                  )}
                  <Flex wrap gap={3} className="tags">
                    <Tag color="green">{book?.journal_type_name}</Tag>
                    <Tag color="cyan">{book?.resource_field_name}</Tag>
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
    getMutationFunc: () => useGetJournalListMutation(),
    searchValue,
  });
};

export default ResourcesJournal;
