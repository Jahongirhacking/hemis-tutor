import { IPaginationProps } from '@/services/student/type';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const DEFAULT_PAGINATION: IPaginationProps = {
  page: 1,
  per_page: 10,
  search: undefined,
};

const page_sizes = [10, 20, 30, 40];

export enum PaginationKeys {
  Page = 'page',
  PerPage = 'per_page',
  Search = 'search',
}

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get(PaginationKeys.Page);
  const perPageParam = searchParams.get(PaginationKeys.PerPage);
  const searchParam = searchParams.get(PaginationKeys.Search);

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGINATION.page;
  const per_page = perPageParam
    ? Number(perPageParam)
    : DEFAULT_PAGINATION.per_page;
  const search = searchParam ? searchParam : DEFAULT_PAGINATION.search;

  const setPagination = useCallback(
    (pagination: Partial<IPaginationProps>) => {
      setSearchParams(params => {
        (
          [
            { key: PaginationKeys.Page, value: pagination?.page },
            { key: PaginationKeys.PerPage, value: pagination?.per_page },
            { key: PaginationKeys.Search, value: pagination?.search },
          ] as { key: string; value: string }[]
        ).forEach(el => {
          if (el?.value) {
            params.set(el?.key, String(el?.value));
          } else {
            params.delete(el?.key);
          }
        });
        return params;
      });
    },
    [setSearchParams, searchParams]
  );

  return {
    pagination: { page, per_page, search } as IPaginationProps,
    setPagination,
    searchParams,
    setSearchParams,
    page_sizes,
  };
}
