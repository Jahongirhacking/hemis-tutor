import { UniLibraryLogo, UniLibraryLogoDark } from '@/assets/icon';
import { RootState } from '@/store/store';
import {
  getSessionStorage,
  sessionStorageNames,
  setSessionStorage,
} from '@/utils/storageFunc';
import { Divider, Flex, GetProps, Image, Input, Segmented } from 'antd';
import { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './Library.scss';
import ResourceReducer from './ResourceReducer';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export type ResourceTypes =
  | 'all'
  | 'literature'
  | 'articles'
  | 'dissertations'
  | 'monographs'
  | 'journals';

export const LibraryContext = createContext<{ searchValue: string }>(null);

export interface ILibrarySessionData {
  searchValue: string;
  resourceType: ResourceTypes;
  pages: number;
}

const LibraryPage = () => {
  const { t } = useTranslation();
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const [searchValue, setSearchValue] = useState(
    (getSessionStorage(sessionStorageNames.e_library) as ILibrarySessionData)
      ?.searchValue || ''
  );
  const [resourceType, setResourceType] = useState<ResourceTypes>(
    (getSessionStorage(sessionStorageNames.e_library) as ILibrarySessionData)
      ?.resourceType || 'all'
  );

  const handleSearch: SearchProps['onSearch'] = (value: string) => {
    setSearchValue(value);
    setSessionStorage(sessionStorageNames.e_library, {
      ...getSessionStorage(sessionStorageNames.e_library),
      searchValue: value,
    });
  };

  const handleKeyChange = (activeKey: ResourceTypes) => {
    setResourceType(activeKey);
    setSessionStorage(sessionStorageNames.e_library, {
      ...getSessionStorage(sessionStorageNames.e_library),
      resourceType: activeKey,
    });
  };

  return (
    <LibraryContext.Provider value={{ searchValue }}>
      <section className="section dashboard__outlet">
        <Flex
          className="dashboard__title"
          justify="space-between"
          align="center"
          gap={16}
          wrap
        >
          <h2 className="section_title">
            {
              (
                t('dashboard.navbar.navbarList', {
                  returnObjects: true,
                }) as string[]
              )[8]
            }
          </h2>
        </Flex>

        <div className="dashboard__outlet--content">
          <Flex vertical className="library upper-element" gap={16}>
            <Flex
              className="library__header"
              justify="space-between"
              align="center"
              style={{ padding: '24px 24px 8px 24px' }}
              wrap
            >
              <Image
                preview={false}
                src={
                  themeColor === 'dark' ? UniLibraryLogoDark : UniLibraryLogo
                }
              />
              <Segmented
                value={resourceType}
                onChange={handleKeyChange}
                options={[
                  {
                    label: t('const.all'),
                    value: 'all',
                  },
                  {
                    label: t('const.literature'),
                    value: 'literature',
                  },
                  {
                    label: t('const.articles'),
                    value: 'articles',
                  },
                  {
                    label: t('const.dissertations'),
                    value: 'dissertations',
                  },
                  {
                    label: t('const.monographs'),
                    value: 'monographs',
                  },
                  {
                    label: t('const.journals'),
                    value: 'journals',
                  },
                ]}
              />
              <Search
                placeholder={t('const.search')}
                onSearch={handleSearch}
                style={{ width: 200 }}
                allowClear
                enterButton
                defaultValue={
                  (
                    getSessionStorage(
                      sessionStorageNames.e_library
                    ) as ILibrarySessionData
                  )?.searchValue || ''
                }
              />
            </Flex>
            <Divider style={{ margin: 0 }} />
            <Flex vertical className="library__resources-wrapper">
              <ResourceReducer resourceType={resourceType} />
            </Flex>
          </Flex>
        </div>
      </section>
    </LibraryContext.Provider>
  );
};

export default LibraryPage;
