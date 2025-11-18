import { usePagination } from '@/hooks/usePagination';
import { Pagination, PaginationProps } from 'antd';
import { useTranslation } from 'react-i18next';

const CustomPagination = (props: PaginationProps) => {
  const { pagination, setPagination, page_sizes } = usePagination();
  const { t } = useTranslation();

  return (
    <Pagination
      current={pagination?.page}
      pageSize={pagination?.per_page}
      pageSizeOptions={page_sizes}
      onChange={(page, per_page) => setPagination({ page, per_page })}
      style={{ textAlign: 'center' }}
      showTotal={total =>
        `${t('const.total')}: ${t('const.number_count', { number: total })}`
      }
      {...props}
    />
  );
};

export default CustomPagination;
