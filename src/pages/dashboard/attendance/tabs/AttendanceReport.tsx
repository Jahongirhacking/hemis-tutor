import { useGetAttendanceReportQuery } from '@/services/student';
import { IAttendance, IStudent } from '@/services/student/type';
import { RootState } from '@/store/store';
import { Flex, Table, Tag } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const AttendanceReport = () => {
  const { currentGroup, currentSemester } = useSelector(
    (store: RootState) => store?.authSlice
  );
  const { data: attendanceData } = useGetAttendanceReportQuery(
    { group_id: currentGroup?.id, semester: currentSemester?.code },
    { skip: !currentGroup?.id }
  );

  const attendanceReport: IAttendance[] = useMemo(
    () =>
      Array.from(
        attendanceData?.result?.attendance
          ?.reduce<Map<IStudent['student_id_number'], IAttendance>>(
            (acc, curr) => {
              if (acc.has(curr.student.student_id_number)) {
                const attendance = acc.get(curr.student.student_id_number)!;
                attendance.absent_off += curr.absent_off;
                attendance.absent_on += curr.absent_on;
              } else {
                acc.set(curr.student.student_id_number, { ...curr });
              }
              return acc;
            },
            new Map()
          )
          ?.values()
      ),
    [attendanceData]
  );

  console.log(attendanceReport);

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
            title: 'Sababli',
            key: 'absent_on',
            dataIndex: 'absent_on',
            render: value => <Tag color="green">{value}</Tag>,
          },
          {
            title: 'Sababsiz',
            key: 'absent_off',
            dataIndex: 'absent_off',
            render: value => <Tag color="red">{value}</Tag>,
          },
          {
            title: 'Jami',
            render: (_, record) => (
              <Tag color="magenta">
                {record?.absent_off + record?.absent_on}
              </Tag>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={attendanceReport}
        rowKey={'id'}
        scroll={{ x: 500 }}
      />
    </Flex>
  );
};

export default AttendanceReport;
