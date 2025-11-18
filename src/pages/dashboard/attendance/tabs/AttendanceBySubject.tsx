import { useGetAttendanceBySubjectQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const AttendanceBySubject = () => {
  const { values, form } = useCustomFilter();
  const { data: attendanceData, isFetching } = useGetAttendanceBySubjectQuery(
    { ...values }
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <CustomTable
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
        loading={isFetching}
      />
    </Flex>
  );
};

export default AttendanceBySubject;
