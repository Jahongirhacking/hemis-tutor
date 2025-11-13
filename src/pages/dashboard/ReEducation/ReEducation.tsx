import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Application from './_Application';
import Appropriation from './_Appropriation';
import ExamTable from './_ExamTable';
import TimeTable from './_TimeTable';
import './ReEducation.scss';

export const ReEducationPage = () => {
  const TAB_NAME = 'reeducation-tab';
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      'timetable'
    )
  );
  const { t } = useTranslation();

  const items: TabsProps['items'] = [
    {
      key: 'timetable',
      label: t('const.time_table'),
      children: <TimeTable />,
    },
    {
      key: 'application',
      label: t('const.application'),
      children: <Application />,
    },
    {
      key: 'examTable',
      label: t('const.control_table'),
      children: <ExamTable />,
    },
    {
      key: 'appropriation',
      label: t('const.appropriation'),
      children: <Appropriation />,
    },
  ];

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  return (
    <section className="reeducation">
      <div className="test-page">{t('components.soon_card.text')}</div>

      <h2 className="section_title">
        {
          (
            t('dashboard.navbar.navbarList', {
              returnObjects: true,
            }) as string[]
          )[6]
        }
      </h2>

      <Tabs
        items={items}
        activeKey={activeTab}
        onChange={key => setActiveTab(key)}
      />
    </section>
  );
};
