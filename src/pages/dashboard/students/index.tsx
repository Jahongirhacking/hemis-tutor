import { Flex, Tabs, Typography } from 'antd';
import AcademicTitle from '../components/AcademicTitle';
import StudentAction from './tabs/StudentAction';
import StudentList from './tabs/StudentList';
import StudentPassport from './tabs/StudentPassport';

const StudentsPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page students-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Talabalar
      </Typography.Title>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'list',
              label: "Talabalar ro'yxati",
              children: (
                <AcademicTitle>
                  <StudentList />
                </AcademicTitle>
              ),
            },
            {
              key: 'action',
              label: 'Talabalar harakati',
              children: (
                <AcademicTitle>
                  <StudentAction />
                </AcademicTitle>
              ),
            },
            {
              key: 'passport',
              label: 'Talaba pasporti',
              children: (
                <AcademicTitle>
                  <StudentPassport />
                </AcademicTitle>
              ),
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default StudentsPage;
