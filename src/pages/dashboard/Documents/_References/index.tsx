import DownloadAuthButton from '@/components/FileList/DownloadAuthButton';
import {
  useGenReferenceMutation,
  useGetReferenceMutation,
} from '@/services/documents';
import { IReference } from '@/services/documents/type';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  Button,
  Empty,
  Flex,
  message,
  Skeleton,
  Table,
  TableColumnsType,
  Tag,
} from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const References = () => {
  const [getReference, { data, isLoading }] = useGetReferenceMutation();
  const [genReference] = useGenReferenceMutation();
  const { t } = useTranslation();

  const handleClickGetReference = () => {
    genReference()
      .then(() => getReference())
      .catch(() => {
        message.warning("Ma'lumotnoma yaratishda xatolik yuzaga keldi");
      });
  };

  const columns: TableColumnsType<any> = [
    {
      title: t(
        'dashboard.documents_page.references.reference_number'
      ) as string,
      dataIndex: 'id',
      key: 'id',
      className: 'reference-number-column',
      render: (_, record: IReference) => record?.reference_number,
    },
    {
      title: t('dashboard.documents_page.references.reference_date') as string,
      dataIndex: 'date',
      className: 'reference-date-column',
      render: (_, record: IReference) =>
        moment.unix(record?.reference_date).format('DD.MM.YYYY'),
    },
    {
      title: t('const.academic_year') as string,
      dataIndex: 'years',
      key: 'years',
      sorter: (ref1: IReference, ref2: IReference) =>
        ref1?.semester?.education_year?.name.localeCompare(
          ref2?.semester?.education_year?.name
        ),
      showSorterTooltip: { title: t('components.sorting.academic_year') },
      className: 'reference-years-column',
      render: (_, record: IReference) => record?.semester?.education_year?.name,
    },
    {
      title: t('const.course') as string,
      dataIndex: 'course',
      key: 'course',
      className: 'reference-course-column',
      render: (_, record: IReference) => (
        <Tag color="purple">{record?.level?.name}</Tag>
      ),
    },
    {
      title: t('const.semester') as string,
      dataIndex: 'semester',
      key: 'semester',
      render: (_, record: IReference) => record?.semester?.name,
    },
    {
      title: t('const.file') as string,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, reference: IReference) => (
        <DownloadAuthButton
          href={reference.file}
          filename={`${reference?.reference_number}.pdf`}
        >
          {t('const.download')}
        </DownloadAuthButton>
      ),
    },
  ];

  useEffect(() => {
    getReference();
  }, [getReference]);

  return (
    <Flex vertical gap={16}>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={handleClickGetReference}
        style={{ width: 'fit-content' }}
      >
        {t('dashboard.documents_page.get_reference')}
      </Button>
      <Table
        className="references__table"
        locale={{
          emptyText: isLoading ? (
            <Skeleton />
          ) : (
            <Empty description="Ma’lumotnoma topilmadi" />
          ),
        }}
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
      />
    </Flex>
  );
};

export default References;
