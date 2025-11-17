import { useGetAttendanceBySubjectQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { Flex, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import useCustomTable from '../../components/hooks/useCustomTable';

const AttendanceBySubject = () => {
  const { data: attendanceData, isFetching } = useGetAttendanceBySubjectQuery(
    {}
  );
  const { t } = useTranslation();
  const { emptyText } = useCustomTable({});

  return (
    <Flex vertical gap={12}>
      <Table
        columns={[
          {
            title: t('const.student'),
            key: 'student',
            dataIndex: 'student',
            render: (student: IStudent) => student?.full_name,
          },
          {
            title: t('const.lesson_date'),
            key: 'lesson_date',
            dataIndex: 'lesson_date',
          },
          {
            title: t('const.attendance'),
            key: 'attendance_type',
            dataIndex: 'attendance_type',
          },
        ]}
        dataSource={attendanceData?.result?.subjects}
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 500 }}
        locale={{ emptyText }}
      />
    </Flex>
  );
};

export default AttendanceBySubject;
