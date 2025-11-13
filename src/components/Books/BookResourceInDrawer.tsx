import { uniLibraryBaseApi } from '@/services/api/const';
import { useGetBookIdMutation } from '@/services/dashboard';
import { getFileSize } from '@/utils/fileFunc';
import { getLangParam } from '@/utils/stringFunc';
import {
  CalendarOutlined,
  DownloadOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  SafetyOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Button, Empty, Flex, Image, Tag, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashedList from '../DashedList';
import DownloadRegularButton from '../FileList/DownloadRegularButton';
import BookDetailSkeleton from '../Skeletons/BookDetailSkeleton';
import GenerateSkeleton from '../Skeletons/GenerateSkeleton';
import ExpandableText from '../Text/ExpandableText';

const BookResourceInDrawer = ({ bookId }: { bookId?: number }) => {
  const { t, i18n } = useTranslation();
  const [getBookId, { data, isLoading, isError }] = useGetBookIdMutation();

  useEffect(() => {
    getBookId({
      id: bookId,
      language: getLangParam(i18n.language),
    });
  }, [getBookId]);

  if (isLoading)
    return (
      <GenerateSkeleton>
        <BookDetailSkeleton />
      </GenerateSkeleton>
    );
  if (isError || !data || data?.result?.length === 0)
    return <Empty description={`${t('const.info')} ${t('const.not_found')}`} />;

  const book = data?.result[0];

  return (
    <Flex vertical gap={18} className="book-resource-in-drawer">
      <Flex align="flex-start" gap={10} className="book-header">
        <Image
          src={book?.publisher_resource_icon}
          className="book-cover-img"
          fallback="/images/default-book.jpg"
        />
        <Flex vertical gap={3}>
          <Typography.Title
            level={5}
            className="book-name"
            style={{ margin: 0 }}
          >
            {book?.name}
          </Typography.Title>
          <Typography.Text>{book?.authors}</Typography.Text>
          {book?.publisher_name && (
            <Flex gap={3} align="center" style={{ width: '100%' }}>
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
        </Flex>
      </Flex>

      <Flex wrap className="dashboard__details-list">
        <Flex gap={5}>
          <EyeOutlined />
          <Typography.Text>{book?.count_view}</Typography.Text>
        </Flex>
        <Flex gap={5}>
          <DownloadOutlined />
          <Typography.Text>{book?.count_download}</Typography.Text>
        </Flex>
        <Flex gap={5}>
          <TranslationOutlined />
          <Typography.Text>{book?.resource_language_name}</Typography.Text>
        </Flex>
        <Flex gap={5}>
          <CalendarOutlined />
          <Typography.Text>{book?.publisher_year}</Typography.Text>
        </Flex>
      </Flex>

      <Flex vertical className="book-buttons" gap={5}>
        <Button
          icon={<EyeOutlined />}
          href={`${uniLibraryBaseApi}/storage/${book?.media[1]?.directory}/${book?.media[1]?.filename}.${book?.media[1]?.extension}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('const.see')}
        </Button>

        <DownloadRegularButton
          type="primary"
          href={`${uniLibraryBaseApi}/api/user/guest-publisher-resources/${book?.id}/${book?.media[1]?.filename}/${book?.media[1]?.extension}`}
          filename={`${book?.name}.${book?.media[1]?.extension}`}
          mimeType={book?.media[1]?.mime_type}
          loadingText={`${t('const.downloading')} (${getFileSize(book?.media[1]?.size)})`}
          icon={<DownloadOutlined />}
        >
          {`${t('const.download')} (${getFileSize(book?.media[1]?.size)})`}
        </DownloadRegularButton>
      </Flex>

      <Flex gap={8} align="flex-start">
        <InfoCircleOutlined
          style={{ transform: 'translateY(5px)', color: '#3C89E8' }}
        />
        <ExpandableText>{book?.abstract_name}</ExpandableText>
      </Flex>

      <DashedList
        list={[
          {
            label: 'ISBN:',
            value: book?.isbn,
          },
          {
            label: `${t('const.category')}:`,
            value: book?.resource_categories_name,
          },
          {
            label: `${t('const.field')}:`,
            value: book?.resource_field_name,
          },
          {
            label: `${t('const.type')}:`,
            value: book?.resource_type_name,
          },
          {
            label: `${t('const.country')}:`,
            value: book?.country_name,
          },
          {
            label: `${t('const.type_of_file')}:`,
            value: book?.media[1]?.extension.toUpperCase(),
          },
        ]}
      />

      <Flex vertical gap={5}>
        <Typography.Text strong>{t('const.keywords')}</Typography.Text>
        <Flex wrap gap={5}>
          {book?.keywords?.split(', ')?.map((keyword, index) => (
            <Tag key={index} color="blue" style={{ margin: 0 }}>
              {keyword}
            </Tag>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookResourceInDrawer;
