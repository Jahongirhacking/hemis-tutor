import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const PerformancePage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page performance-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          O‘zlashtirish
        </Typography.Title>
      </DashboardHeader>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'rating',
              label: 'Reyting qaydnoma',
              children: <SoonCard />,
            },
            {
              key: 'collected',
              label: 'Jamlanma qaydnoma',
              children: <SoonCard />,
            },
            { key: 'gpa', label: 'GPA ballar', children: <SoonCard /> },
            { key: 'debt', label: 'Akademik qarzdor', children: <SoonCard /> },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default PerformancePage;
