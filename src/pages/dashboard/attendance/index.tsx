import { Flex, Tabs, Typography } from 'antd';
import AttendanceBySubject from './tabs/AttendanceBySubject';
import AttendanceReport from './tabs/AttendanceReport';
import AttendanceStatistics from './tabs/AttendanceStatistics';

const AttendancePage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page attendance-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Davomat
      </Typography.Title>
      <Flex className="main-container">
        <Tabs
          type="card"
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
