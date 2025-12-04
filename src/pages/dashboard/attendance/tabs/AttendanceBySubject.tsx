import { useGetAttendanceBySubjectQuery } from '@/services/student';
import {
  IAttendanceBySubjectRecord,
  IGroup,
  IStudent,
} from '@/services/student/type';
import { CORRECT_DATE_FORMAT, CURRENT_DATE_FORMAT } from '@/utils/dateFunc';
import { toFirstCapitalLetter, toFirstLowerLetter } from '@/utils/stringFunc';
import { Divider, Flex, Tag } from 'antd';
import { ChartNoAxesCombined } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const encodeSubjectName = (name: string) => `__${name}__`;
const decodeSubjectName = (name: string) =>
  toFirstCapitalLetter(name?.replace(/__/g, ''));

interface IAttendanceByStudent {
  id: number;
  student_id: IStudent['id'];
  student_name: string;
  group_id: IGroup['id'];
  attendance: Record<string, IAttendanceBySubjectRecord[]>;
}

const AttendanceBySubject = () => {
  const { values, form } = useCustomFilter();
  const { data: attendanceData, isFetching } = useGetAttendanceBySubjectQuery({
    ...values,
  });
  const { t } = useTranslation();

  const attendanceByStudent = useMemo(() => {
    const sortedByStudent: IAttendanceBySubjectRecord[][] = Array.from(
      (attendanceData?.result?.attendance_records || [])
        .reduce<Map<IStudent['id'], IAttendanceBySubjectRecord[]>>(
          (acc, curr) => {
            const list = acc.get(curr.student_id) ?? [];
            acc.set(curr.student_id, [...list, curr]);
            return acc;
          },
          new Map()
        )
        ?.values()
    );

    const sortBySubject = sortedByStudent?.map(student => {
      const temp: IAttendanceByStudent = {
        id: student?.[0]?.student_id,
        student_id: student?.[0]?.student_id,
        student_name: student?.[0]?.student_name,
        group_id: student?.[0]?.group_id,
        attendance: {},
      };
      student?.forEach(s => {
        if (encodeSubjectName(s?.subject_name) in temp?.attendance) {
          temp.attendance[encodeSubjectName(s?.subject_name)] = [
            ...temp?.attendance?.[encodeSubjectName(s?.subject_name)],
            { ...s },
          ];
        } else {
          temp.attendance[encodeSubjectName(s?.subject_name)] = [{ ...s }];
        }
      });
      return temp;
    });

    return sortBySubject;
  }, [attendanceData]);

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
            title: '#',
            key: 'index',
            dataIndex: 'index',
            width: 60,
          },
          {
            title: t('const.student'),
            key: 'student_name',
            dataIndex: 'student_name',
            render: (student, record) => (
              <CustomLink.Student
                student={{ full_name: student, id: record?.student_id }}
              />
            ),
            width: 250,
          },
          ...(values?.[FilterKey.GroupId]
            ? [
                {
                  title: (
                    <Flex align="center" gap={8}>
                      <ChartNoAxesCombined color="#14b8a6" size={14} />{' '}
                      <span>{`${t('const.total')} ${toFirstLowerLetter(t('const.attendance'))}`}</span>
                    </Flex>
                  ),
                  key: 'total_attendance',
                  width: 160,
                  render: (_: any, record: IAttendanceByStudent) => (
                    <Flex gap={8} vertical>
                      <Flex gap={6} wrap>
                        {(() => {
                          const attendances = Array.from(
                            Object.values(record?.attendance)
                          );
                          const absentOff = attendances?.reduce(
                            (acc, curr) =>
                              acc +
                              curr?.reduce(
                                (acc, curr) => acc + curr?.absent_off,
                                0
                              ),
                            0
                          );
                          const absentOn = attendances?.reduce(
                            (acc, curr) =>
                              acc +
                              curr?.reduce(
                                (acc, curr) => acc + curr?.absent_on,
                                0
                              ),
                            0
                          );
                          return absentOff || absentOn ? (
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
                          ) : (
                            <Tag>-</Tag>
                          );
                        })()}
                      </Flex>
                    </Flex>
                  ),
                },
                ...Object.keys(attendanceByStudent?.[0]?.attendance || {})?.map(
                  key => ({
                    title: decodeSubjectName(key),
                    key: key,
                    render: (_: any, record: IAttendanceByStudent) => (
                      <Flex gap={8} vertical>
                        <Flex gap={6} wrap>
                          {(() => {
                            const absentOff = record?.attendance?.[key]?.reduce(
                              (acc, curr) => acc + curr?.absent_off,
                              0
                            );
                            const absentOn = record?.attendance?.[key]?.reduce(
                              (acc, curr) => acc + curr?.absent_on,
                              0
                            );
                            return absentOff || absentOn ? (
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
                            ) : (
                              <Tag>-</Tag>
                            );
                          })()}
                        </Flex>
                      </Flex>
                    ),
                    width: 160,
                  })
                ),
              ]
            : [
                {
                  title: t('const.lesson_date'),
                  key: 'lesson_date',
                  dataIndex: 'lesson_date',
                  render: date =>
                    moment(date, CURRENT_DATE_FORMAT).format(
                      CORRECT_DATE_FORMAT
                    ),
                  width: 120,
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
                  render: (_: any, record: IAttendanceBySubjectRecord) => (
                    <Tag
                      color={record?.absent_on ? 'orange' : 'red'}
                    >{`${toFirstCapitalLetter(record?.absent_on ? t('const.explicable') : t('const.not_explicable'))}: ${record?.absent_on || record?.absent_off} ${t('const.hours_plural')}`}</Tag>
                  ),
                },
              ]),
        ]}
        dataSource={
          (values?.[FilterKey.GroupId]
            ? attendanceByStudent
            : attendanceData?.result?.attendance_records) || []
        }
        loading={isFetching}
      />
    </Flex>
  );
};

export default AttendanceBySubject;
