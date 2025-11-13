import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Appropriations from './_Appropriation';
import ControlTable from './_ControlTable';
import DailyGrades from './_DailyGrades';
import EduPlanSubjects from './_EduPlan';
import GpaScore from './_GpaScore';
import Grades from './_Grades';

const InnerEduPlanPage = () => {
  const TAB_NAME = 'eduplan-tab';
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      '1'
    )
  );
  const { t } = useTranslation();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('const.curriculum'),
      children: <EduPlanSubjects />,
    },
    {
      key: '2',
      label: t('const.appropriation'),
      children: <Appropriations />,
    },
    {
      key: '3',
      label: t('const.daily_grades'),
      children: <DailyGrades />,
    },
    {
      key: '4',
      label: 'GPA',
      children: <GpaScore />,
    },
    {
      key: '5',
      label: t('const.control_table'),
      children: <ControlTable />,
    },
    {
      key: '6',
      label: t('const.gradebook'),
      children: <Grades />,
    },
    // {
    //   key: '6',
    //   label: t('const.exams'),
    //   children: <Exams />,
    // },
    // {
    //   key: '7',
    //   label: 'Bituruv ishi',
    //   children: <SoonCard />,
    // },
  ];

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  return (
    <section className="eduplan">
      <h2 className="section_title">{t('const.academic_parameters')}</h2>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={key => setActiveTab(key)}
        style={{ marginTop: 16 }}
      />
    </section>
  );
};

export default InnerEduPlanPage;
