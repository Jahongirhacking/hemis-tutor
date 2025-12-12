import { Flex } from 'antd';
import { useMemo } from 'react';
import StudentFullInfo from '../../components/StudentFullInfo';

const StudentDetails = ({ props: id }: { props?: string }) => {
  const studentId = useMemo(() => Number(id), []);

  return (
    <Flex vertical gap={18}>
      <StudentFullInfo studentId={studentId} />
    </Flex>
  );
};

export default StudentDetails;
