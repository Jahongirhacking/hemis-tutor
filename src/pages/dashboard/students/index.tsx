import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';
import StudentAction from './tabs/StudentAction';
import StudentList from './tabs/StudentList';

const StudentsPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page students-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Talabalar
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'list',
              label: "Talabalar ro'yxati",
              children: <StudentList />,
            },
            {
              key: 'action',
              label: 'Talabalar harakati',
              children: <StudentAction />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default StudentsPage;
