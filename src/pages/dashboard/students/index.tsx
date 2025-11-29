import { Card, Flex, Typography } from 'antd';
import StudentList from './tabs/StudentList';

const StudentsPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page students-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Talabalar
      </Typography.Title>
      <Flex className="main-container">
        <Card className="w-full">
          <StudentList />
        </Card>
      </Flex>
    </Flex>
  );
};

export default StudentsPage;
