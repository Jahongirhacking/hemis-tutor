import { useGetAttendanceBySubjectQuery } from '@/services/student';
import { IAttendanceBySubjectRecord } from '@/services/student/type';
import { CORRECT_DATE_FORMAT, CURRENT_DATE_FORMAT } from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Divider, Flex, Tag } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const AttendanceBySubject = () => {
  const { values, form } = useCustomFilter();
  const { data: attendanceData, isFetching } = useGetAttendanceBySubjectQuery({
    ...values,
  });
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        columns={[
          {
            title: "#",
            key: 'index',
            dataIndex: 'index',
            width: 60
          },
          {
            title: t('const.student'),
            key: 'student_name',
            dataIndex: 'student_name',
            render: (student, record) => (
              <CustomLink.Student student={{ full_name: student, id: record?.student_id }} />
            ),
            width: 250
          },
          {
            title: t('const.lesson_date'),
            key: 'lesson_date',
            dataIndex: 'lesson_date',
            render: (date) => moment(date, CURRENT_DATE_FORMAT).format(CORRECT_DATE_FORMAT)
          },
          {
            title: t('const.subject'),
            key: 'subject_name',
            dataIndex: 'subject_name',
          },
          {
            title: t('const.training'),
            key: 'training_type',
            dataIndex: 'training_type',
          },
          {
            title: t('const.attendance'),
            key: 'attendance',
            render: (_, record: IAttendanceBySubjectRecord) => (
              <Tag color={record?.absent_on ? "orange" : "red"}>{`${toFirstCapitalLetter(record?.absent_on ? t('const.explicable') : t('const.not_explicable'))}: ${record?.absent_on || record?.absent_off} ${t('const.hours_plural')}`}</Tag>
            )
          },
        ]}
        dataSource={attendanceData?.result?.attendance_records?.map((el, index) => ({ ...el, index: index + 1 }))}
        loading={isFetching}
      />
    </Flex>
  );
};

export default AttendanceBySubject;
