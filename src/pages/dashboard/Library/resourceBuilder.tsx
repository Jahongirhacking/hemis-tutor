import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { IResourceGetParam } from '@/services/dashboard/type';
import { getInnerValue } from '@/utils/objectFunc';
import {
  getExistedOne,
  getSessionStorage,
  sessionStorageNames,
  setSessionStorage,
} from '@/utils/storageFunc';
import { getLangParam } from '@/utils/stringFunc';
import { Flex, Image, Pagination } from 'antd';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ILibrarySessionData, ResourceTypes } from './Library';

export interface IPage {
  key: ResourceTypes;
  page: number;
}

const resourceBuilder = ({ resourceType }: { resourceType: ResourceTypes }) => {
  return ({
    children,
    getMutationFunc,
    searchValue,
  }: {
    searchValue?: string;
    children?: (data: object) => ReactElement | ReactElement[];
    getMutationFunc?: () => [
      getBookList: (arg: IResourceGetParam) => Promise<object>,
      {
        data: object | undefined;
        isLoading: boolean;
        isError: boolean;
      },
    ];
  }) => {
    const initialPages: IPage[] = [
      {
        key: 'all',
        page: 1,
      },
      {
        key: 'literature',
        page: 1,
      },
      {
        key: 'articles',
        page: 1,
      },
      {
        key: 'dissertations',
        page: 1,
      },
      {
        key: 'monographs',
        page: 1,
      },
      {
        key: 'journals',
        page: 1,
      },
    ];
    const { i18n } = useTranslation();
    const [limit, setLimit] = useState<number>(12);
    const [pages, setPages] = useState<IPage[]>(
      getExistedOne(
        (
          getSessionStorage(
            sessionStorageNames.e_library
          ) as ILibrarySessionData
        )?.pages,
        initialPages
      )
    );
    const [sortType] = useState<'asc' | 'desc'>('desc');
    const [getFunc, { isError, isLoading, data }] = getMutationFunc();
    const checkSearchValue = useRef(searchValue);

    const onPageChange = (newPage: number) => {
      setPages(
        pages.map(item =>
          item.key === resourceType ? { ...item, page: newPage } : { ...item }
        )
      );
    };

    useEffect(() => {
      setSessionStorage(sessionStorageNames.e_library, {
        ...getSessionStorage(sessionStorageNames.e_library),
        pages,
      });
    }, [pages]);

    useEffect(() => {
      if (checkSearchValue.current !== searchValue) {
        setPages(initialPages);
        checkSearchValue.current = searchValue;
      }
    }, [searchValue]);

    useEffect(() => {
      const defaultParam: IResourceGetParam = {
        name: searchValue,
        page: pages.find(item => item?.key === resourceType)?.page,
        limit,
        language: getLangParam(i18n.language),
        sort: sortType,
      };

      if (resourceType === 'all') {
        getFunc(defaultParam);
      } else if (resourceType === 'literature') {
        getFunc({
          ...defaultParam,
          resource_category_id: 1,
        });
      } else if (resourceType === 'monographs') {
        getFunc({
          ...defaultParam,
          resource_category_id: 2,
        });
      } else if (resourceType === 'dissertations') {
        getFunc({
          ...defaultParam,
          resource_category_id: 3,
        });
      } else if (resourceType === 'articles') {
        getFunc({
          ...defaultParam,
          resource_category_id: 4,
        });
      } else if (resourceType === 'journals') {
        getFunc({
          ...defaultParam,
        });
      }
    }, [
      getFunc,
      searchValue,
      pages,
      limit,
      sortType,
      i18n.language,
      resourceType,
    ]);

    if (isLoading)
      return (
        <Image
          className="book-loading"
          src="/images/book-loading.gif"
          preview={false}
        />
      );
    if (isError)
      return (
        <NotFoundAnimation.Card description="Ushbu xizmatda texnik ishlar olib borilmoqda" />
      );

    return (
      <Flex
        vertical
        className="library__resources resources-with-media"
        gap={35}
      >
        <Flex gap={26} wrap className="resource-cards">
          {children(data)}
        </Flex>
        <Pagination
          showSizeChanger
          pageSize={limit}
          current={pages.find(item => item.key === resourceType)?.page}
          onChange={onPageChange}
          onShowSizeChange={(_, pageSize) => setLimit(pageSize)}
          style={{
            textAlign: 'center',
            margin: 'auto',
            maxWidth: '100%',
          }}
          total={getInnerValue(data, 'result', 'total') as number}
          pageSizeOptions={[6, 12, 24, 36]}
        />
      </Flex>
    );
  };
};

export default resourceBuilder;
