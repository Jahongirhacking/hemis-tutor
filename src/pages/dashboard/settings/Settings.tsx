import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Flex, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '../components/DashboardHeader';
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
    <Flex vertical gap={5} className="settings-page upper-element">
      <DashboardHeader>
        <Typography.Title
          level={2}
          className="section_title"
          style={{ marginBottom: 0 }}
        >
          {t('const.settings')}
        </Typography.Title>
      </DashboardHeader>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={key => setActiveTab(key)}
        items={[
          {
            label: t('const.profile'),
            key: '1',
            children: <ProfilePage hasTitle={false} />,
          },
          {
            label: t('const.system_settings'),
            key: '3',
            children: <SystemSettings />,
          },
        ]}
      />
    </Flex>
  );
};

export default SettingsPage;
