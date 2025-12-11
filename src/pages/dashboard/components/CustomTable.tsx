import { usePagination } from '@/hooks/usePagination';
import { Flex, Table, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomPagination from './CustomPagination';
import useCustomTable from './hooks/useCustomTable';

const CustomTable = ({
  paginationTotal,
  dataSource,
  ...props
}: TableProps & { paginationTotal?: number }) => {
  const { emptyText } = useCustomTable({});
  const { t } = useTranslation();
  const { pagination } = usePagination();

  return (
    <Flex vertical gap={24} className="w-full">
      <Table
        rowKey={'id'}
        scroll={{ x: 800, y: 'max(calc(100dvh - 450px), 300px)' }}
        locale={{ emptyText }}
        pagination={{
          showTotal: total =>
            `${t('const.total')}: ${t('const.number_count', { number: total })}`,
          align: 'center',
        }}
        dataSource={[...(dataSource || [])]?.map((elem, index) => ({
          ...elem,
          index:
            props?.pagination === false || dataSource?.[0]?.index !== undefined
              ? ((pagination?.page || 1) - 1) * pagination?.per_page + index + 1
              : index + 1,
        }))}
        {...props}
      />

      {props?.pagination === false && (
        <CustomPagination total={paginationTotal} />
      )}
    </Flex>
  );
};

export default CustomTable;
