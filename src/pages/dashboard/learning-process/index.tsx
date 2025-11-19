import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';
import Exams from './tabs/Exams';
import Timetable from './tabs/Timetable';

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
              children: <Timetable />,
            },
            {
              key: 'exam-table',
              label: "Nazorat jadvalini ko'rish",
              children: <Exams />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default LearningProcessPage;
