import { IJournal } from '@/services/dashboard/type';
import {
  EyeOutlined,
  SafetyOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Flex, Image, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import DashedList from '../DashedList';

const JournalInDrawer = ({ journal }: { journal?: IJournal }) => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18} className="book-resource-in-drawer">
      <Flex align="flex-start" gap={10} className="book-header">
        <Image
          src={journal?.file_url_photo}
          className="book-cover-img"
          fallback="/images/default-book.jpg"
        />
        <Flex vertical gap={3}>
          <Typography.Title
            level={5}
            className="book-name"
            style={{ margin: 0 }}
          >
            {journal?.name}
          </Typography.Title>
          {journal?.university_name && (
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
                {journal?.university_name}
              </Typography.Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Flex wrap className="dashboard__details-list">
        <Flex gap={5}>
          <EyeOutlined />
          <Typography.Text>{journal?.count_view}</Typography.Text>
        </Flex>
        <Flex gap={5}>
          <TranslationOutlined />
          <Typography.Text>{journal?.language}</Typography.Text>
        </Flex>
      </Flex>

      <DashedList
        list={[
          {
            label: `${t('const.category')}:`,
            value: t('const.journals'),
          },
          {
            label: `${t('const.field')}:`,
            value: journal?.resource_field_name,
          },
          {
            label: `${t('const.type')}:`,
            value: journal?.journal_type_name,
          },
          {
            label: `${t('const.country')}:`,
            value: journal?.country_name,
          },
        ]}
      />
    </Flex>
  );
};

export default JournalInDrawer;
