import { Card, Flex, Typography } from 'antd';
import { Users } from 'lucide-react';
import StudentList from './tabs/StudentList';

const StudentsPage = () => {
  return (
    <Flex vertical gap={24} className="dashboard__page students-page upper-element">
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
          <Users size={24} color="white" />
        </div>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Talabalar
        </Typography.Title>
      </Flex>
      <Flex className="main-container">
        <Card
          className="w-full"
          style={{
            borderRadius: 16,
            boxShadow:
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <StudentList />
        </Card>
      </Flex>
    </Flex>
  );
};

export default StudentsPage;
