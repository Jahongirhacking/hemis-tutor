import { useGetAttendanceReportQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { RootState } from '@/store/store';
import { Flex, Table } from 'antd';
import { useSelector } from 'react-redux';

const AttendanceReport = () => {
  const { currentGroup } = useSelector((store: RootState) => store?.authSlice);
  const { data: attendanceData } = useGetAttendanceReportQuery(
    { group_id: currentGroup?.id },
    { skip: !currentGroup?.id }
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
          {
            title: 'Sabab',
            key: 'reason',
            dataIndex: 'reason',
          },
        ]}
        dataSource={attendanceData?.result?.attendance}
        rowKey={'id'}
        scroll={{ x: 500 }}
      />
    </Flex>
  );
};

export default AttendanceReport;
