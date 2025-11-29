import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Flex, Tabs, Typography } from 'antd';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfilePage from '../profile/Profile';
import './Settings.scss';
import SystemSettings from './_SystemSettings';

const SettingsPage = () => {
  const TAB_NAME = 'settings-tab';
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      '1'
    )
  );

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  return (
    <Flex vertical gap={24} className="settings-page upper-element">
      <Flex align="center" gap={12}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
          }}
        >
          <Settings size={24} color="white" />
        </div>
        <Typography.Title
          level={2}
          className="section_title"
          style={{ marginBottom: 0 }}
        >
          {t('const.settings')}
        </Typography.Title>
      </Flex>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={key => setActiveTab(key)}
        items={[
          {
            label: <span style={{ fontWeight: 500 }}>{t('const.profile')}</span>,
            key: '1',
            children: <ProfilePage hasTitle={false} />,
          },
          {
            label: <span style={{ fontWeight: 500 }}>{t('const.system_settings')}</span>,
            key: '3',
            children: <SystemSettings />,
          },
        ]}
      />
    </Flex>
  );
};

export default SettingsPage;