import { usePagination } from '@/hooks/usePagination';
import { Pagination, PaginationProps } from 'antd';

const CustomPagination = (props: PaginationProps) => {
  const { pagination, setPagination } = usePagination();
  return (
    <Pagination
      current={pagination?.page}
      pageSize={pagination?.per_page}
      onChange={(page, per_page) => setPagination({ page, per_page })}
      style={{ textAlign: 'center' }}
      {...props}
    />
  );
};

export default CustomPagination;
