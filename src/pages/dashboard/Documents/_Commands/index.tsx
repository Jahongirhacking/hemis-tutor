import DownloadAuthButton from '@/components/FileList/DownloadAuthButton';
import { useColumnSearch } from '@/components/Form/useColumnSearch';
import { useGetDecreeMutation } from '@/services/documents';
import { IDecree } from '@/services/documents/type';
import { Empty, Skeleton, Table, TableColumnsType } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Commands = () => {
  const [getDecree, { data, isLoading }] = useGetDecreeMutation();
  const { getColumnSearchProps } = useColumnSearch();
  const { t } = useTranslation();

  const columns: TableColumnsType<any> = [
    {
      title: t('dashboard.documents_page.orders.order_number') as string,
      key: 'id',
      dataIndex: 'id',
      className: 'command-number-column',
      render: (_, record: IDecree) => record?.number,
    },
    {
      title: t('dashboard.documents_page.orders.order_name') as string,
      key: 'name',
      dataIndex: 'name',
      className: 'command-name-column',
      ...getColumnSearchProps('name'),
    },
    {
      title: t('dashboard.documents_page.orders.order_date') as string,
      key: 'date',
      dataIndex: 'date',
      sorter: (a: IDecree, b: IDecree) => a.date - b.date,
      showSorterTooltip: { title: t('components.sorting.date') },
      className: 'command-date-column',
      render: (_, record: IDecree) =>
        moment.unix(record?.date).format('DD.MM.YYYY'),
    },

    {
      title: t('dashboard.documents_page.orders.order_type') as string,
      key: 'type',
      dataIndex: 'type',
      className: 'command-type-column',
      render: (_, record: IDecree) => record?.decreeType?.name,
    },
    {
      title: t('const.actions') as string,
      key: 'actions',
      dataIndex: 'actions',
      render: (_, command: IDecree) => (
        <DownloadAuthButton href={command.file} filename={command.name}>
          {t('const.download')}
        </DownloadAuthButton>
      ),
    },
  ];

  useEffect(() => {
    getDecree();
  }, [getDecree]);

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data?.data}
      pagination={{ pageSize: 8 }}
      className="commands__table"
      locale={{
        emptyText: isLoading ? (
          <Skeleton />
        ) : (
          <Empty description="Buyruq topilmadi" />
        ),
      }}
    />
  );
};

export default Commands;
