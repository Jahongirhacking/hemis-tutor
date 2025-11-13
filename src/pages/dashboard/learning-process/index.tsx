import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const LearningProcessPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page learning-process-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          O‘quv jarayoni
        </Typography.Title>
      </DashboardHeader>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'timetable',
              label: "Dars jadvalini ko'rish",
              children: <SoonCard />,
            },
            {
              key: 'exam-table',
              label: "Nazorat jadvalini ko'rish",
              children: <SoonCard />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default LearningProcessPage;
