import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Tabs, TabsProps } from 'antd';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Commands, References, StudentDocument } from './';
import './Documents.scss';
import CertificateId from './_CertificateId';
import Certificates from './_Certificates';

export const DocumentsPage = () => {
  const TAB_NAME = 'document-tab';
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      'studentDocument'
    )
  );

  const items: TabsProps['items'] = [
    {
      key: 'studentDocument',
      label: (
        t('dashboard.documents_page.tabs', { returnObjects: true }) as string[]
      )[2],
      children: <StudentDocument />,
    },
    {
      key: 'references',
      label: (
        t('dashboard.documents_page.tabs', { returnObjects: true }) as string[]
      )[1],
      children: <References />,
    },
    {
      key: 'certificateId',
      label: t('const.certificate_id'),
      children: <CertificateId />,
    },
    {
      key: 'commands',
      label: (
        t('dashboard.documents_page.tabs', { returnObjects: true }) as string[]
      )[0],
      children: <Commands />,
    },
    {
      key: 'certificates',
      label: t('const.certificates'),
      children: <Certificates />,
    },
  ];

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  return (
    <section className="section dashboard__outlet documents__outlet">
      <h2 className="section_title">
        {
          (
            t('dashboard.navbar.navbarList', {
              returnObjects: true,
            }) as string[]
          )[7]
        }
      </h2>
      <div className="dashboard__outlet--content">
        <Tabs
          items={items}
          activeKey={activeTab}
          onChange={key => setActiveTab(key)}
        />
      </div>
    </section>
  );
};
