import { useGetAttendanceBySubjectQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { RootState } from '@/store/store';
import { Flex, Table } from 'antd';
import { useSelector } from 'react-redux';

const AttendanceBySubject = () => {
  const { currentGroup, currentSemester } = useSelector(
    (store: RootState) => store?.authSlice
  );
  const { data: attendanceData, isFetching } = useGetAttendanceBySubjectQuery(
    { group_id: currentGroup?.id, semester: currentSemester?.code },
    { skip: !currentGroup?.id || !currentSemester?.code }
  );

  return (
    <Flex vertical gap={12}>
      <Table
        columns={[
          {
            title: 'F.I.O',
            key: 'student',
            dataIndex: 'student',
            render: (student: IStudent) => student?.full_name,
          },
          {
            title: 'Sana',
            key: 'lesson_date',
            dataIndex: 'lesson_date',
          },
          {
            title: 'Davomat',
            key: 'attendance_type',
            dataIndex: 'attendance_type',
          },
        ]}
        dataSource={attendanceData?.result?.subjects}
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 500 }}
      />
    </Flex>
  );
};

export default AttendanceBySubject;
