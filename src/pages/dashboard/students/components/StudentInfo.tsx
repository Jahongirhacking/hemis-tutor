import { Tabs } from 'antd';
import StudentDetails from './StudentDetails';
import StudentHistory from './StudentHistory';
import StudentPassport from './StudentPassport';

const StudentInfo = (props: any) => {
  return (
    <Tabs
      defaultActiveKey="passport"
      items={[
        {
          key: 'passport',
          label: 'Talaba pasporti',
          children: <StudentPassport {...props} />,
        },
        {
          key: 'details',
          label: "Talaba ma'lumoti",
          children: <StudentDetails {...props} />,
        },
        {
          key: 'history',
          label: 'Talaba tarixi',
          children: <StudentHistory {...props} />,
        },
      ]}
    />
  );
};

export default StudentInfo;
