import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Skeleton, Table, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';

const AttendanceTableSkeleton = ({ data }: { data: boolean[] }) => {
  const { t } = useTranslation();

  const columns: TableColumnsType<any> = [
    {
      title: t('const.subjects') as string,
      dataIndex: 'subjectName',
      key: 'subjectName',
      render: () => (
        <Skeleton.Input active size="small" className="small-skeleton" />
      ),
    },
    {
      title: t('const.lesson_date') as string,
      dataIndex: 'date',
      key: 'date',
      className: 'attendance-date-column',
      render: () => (
        <Skeleton.Input active size="small" className="small-skeleton" />
      ),
    },
    {
      title: t('const.training') as string,
      dataIndex: 'type',
      key: 'type',
      className: 'attendance-type-column',
      render: () => (
        <Skeleton.Input active size="small" className="small-skeleton" />
      ),
    },
    {
      title: toFirstCapitalLetter(t('const.explicable')),
      key: 'explicable',
      dataIndex: 'explicable',
      className: 'attendance-explicable-column',
      render: value => (
        <Skeleton.Input
          active
          size="small"
          className={`${value ? '' : 'not-'}explicable-skeleton`}
        />
      ),
    },
    {
      title: toFirstCapitalLetter(t('const.hours_plural')),
      key: 'hours',
      dataIndex: 'explicable',
      render: value => (
        <Skeleton.Input
          active
          size="small"
          className={`${value ? '' : 'not-'}explicable-skeleton`}
        />
      ),
    },
    {
      title: t('const.staff') as string,
      key: 'staff',
      dataIndex: 'staff',
      className: 'attendance-employee-column',
      render: () => (
        <Skeleton.Input active size="small" className="small-skeleton" />
      ),
    },
    {
      title: t('const.actions') as string,
      key: 'actions',
      dataIndex: 'actions',
      className: 'attendance-actions-column',
      render: () => (
        <Skeleton.Input active size="small" className="actions-skeleton" />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.map((explicable, index) => ({ explicable, index }))}
      rowKey="index"
      pagination={false}
    />
  );
};

export default AttendanceTableSkeleton;
