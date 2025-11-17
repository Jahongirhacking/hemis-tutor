import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';

const LearningProcessPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page learning-process-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        O‘quv jarayoni
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
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
