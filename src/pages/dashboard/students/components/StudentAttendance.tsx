import {
  useGetAttendanceReportQuery,
  useGetStudentDetailsQuery,
} from '@/services/student';
import { IAttendance } from '@/services/student/type';
import { CORRECT_DATE_FORMAT, CURRENT_DATE_FORMAT } from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex, Table, Tag } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import StudentFullInfo from '../../components/StudentFullInfo';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const StudentAttendance = ({ props: studentId }: { props: string }) => {
  const { form, values } = useCustomFilter();
  const { data: studentData } = useGetStudentDetailsQuery(
    { id: Number(studentId) },
    { skip: !studentId }
  );
  const { data: attendanceData, isFetching } = useGetAttendanceReportQuery({
    student_id: Number(studentId),
    ...values,
  });
  const [semesterCode, setSemesterCode] = useState<string>();
  const { t } = useTranslation();
  console.log(semesterCode);

  return (
    <Flex vertical gap={18}>
      <StudentFullInfo studentId={Number(studentId)} infoTypes={[]} />
      {!!attendanceData?.result?.attendance?.length && (
        <Flex gap={8} wrap justify="center">
          {(() => {
            const absentOff = attendanceData?.result?.attendance?.reduce(
              (acc, curr) => acc + curr?.absent_off,
              0
            );
            const absentOn = attendanceData?.result?.attendance?.reduce(
              (acc, curr) => acc + curr?.absent_on,
              0
            );
            return (
              <>
                {!!absentOff && (
                  <Tag
                    color={'red'}
                  >{`${toFirstCapitalLetter(t('const.not_explicable'))}: ${absentOff} ${t('const.hours_plural')}`}</Tag>
                )}
                {!!absentOn && (
                  <Tag
                    color={'orange'}
                  >{`${toFirstCapitalLetter(t('const.explicable'))}: ${absentOn} ${t('const.hours_plural')}`}</Tag>
                )}
              </>
            );
          })()}
        </Flex>
      )}
      <CustomTable
        columns={[
          {
            title: '#',
            key: 'index',
            dataIndex: 'index',
            width: 60,
          },
          {
            title: t('const.subject'),
            key: 'subject',
            dataIndex: 'subject',
            render: subject => toFirstCapitalLetter(subject),
          },
          {
            title: t('const.lesson_date'),
            key: 'lesson_date',
            dataIndex: 'lesson_date',
            render: date =>
              moment(date, CURRENT_DATE_FORMAT).format(CORRECT_DATE_FORMAT),
          },
          {
            title: t('const.status'),
            key: 'absent',
            render: (_, record: IAttendance) => (
              <Tag
                color={record?.absent_off ? 'red' : 'orange'}
              >{`${toFirstCapitalLetter(record?.absent_off ? t('const.not_explicable') : t('const.explicable'))}: ${record?.absent_off || record?.absent_on} ${t('const.hours_plural')}`}</Tag>
            ),
            fixed: 'right',
            width: 160,
          },
        ]}
        loading={isFetching}
        dataSource={attendanceData?.result?.attendance}
        summary={() => (
          <Table.Summary fixed={'bottom'}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4}>
                <CustomFilter form={form}>
                  <CustomFilter.BySemester
                    onChange={(_, option) => {
                      setSemesterCode(
                        'year' in option
                          ? `${option?.year}-${option?.value}`
                          : undefined
                      );
                      form.setFieldsValue({
                        [FilterKey.SubjectId]: undefined,
                      });
                    }}
                    group_id={studentData?.result?.meta?.group?.id}
                  />
                  <CustomFilter.BySubject
                    group_id={studentData?.result?.meta?.group?.id}
                    year_semester={semesterCode}
                  />
                </CustomFilter>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Flex>
  );
};

export default StudentAttendance;
