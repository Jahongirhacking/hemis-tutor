import { Flex, Typography } from 'antd';
import { BookOpen } from 'lucide-react';
import CustomTabs from '../components/CustomTabs';
import Exams from './tabs/Exams';
import Timetable from './tabs/Timetable';

const LearningProcessPage = () => {
  return (
    <Flex vertical gap={24} className="dashboard__page learning-process-page">
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
          <BookOpen size={24} color="white" />
        </div>
        <Typography.Title level={2} style={{ margin: 0 }}>
          O'quv jarayoni
        </Typography.Title>
      </Flex>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'timetable',
              label: <span style={{ fontWeight: 500 }}>Dars jadvalini ko'rish</span>,
              children: <Timetable />,
            },
            {
              key: 'exam-table',
              label: <span style={{ fontWeight: 500 }}>Nazorat jadvalini ko'rish</span>,
              children: <Exams />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default LearningProcessPage;