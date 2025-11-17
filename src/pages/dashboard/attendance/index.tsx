import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTabs from '../components/CustomTabs';
import AttendanceBySubject from './tabs/AttendanceBySubject';
import AttendanceReport from './tabs/AttendanceReport';
import AttendanceStatistics from './tabs/AttendanceStatistics';

const AttendancePage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18} className="dashboard__page attendance-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t('const.attendance')}
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'report',
              label: 'Davomat hisoboti',
              children: <AttendanceReport />,
            },
            {
              key: 'statistics',
              label: 'Statistik davomat',
              children: <AttendanceStatistics />,
            },
            {
              key: 'subjects',
              label: 'Fanlar davomati',
              children: <AttendanceBySubject />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default AttendancePage;
