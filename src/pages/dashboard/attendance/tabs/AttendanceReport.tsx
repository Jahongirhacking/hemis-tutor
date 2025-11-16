import DashedList from '@/components/DashedList';
import { useGetAttendanceReportQuery } from '@/services/student';
import { IAttendance, IStudent } from '@/services/student/type';
import { RootState } from '@/store/store';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Empty, Flex, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomDrawer from '../../components/CustomDrawer';

const AttendanceReport = () => {
  const { currentGroup, currentSemester } = useSelector(
    (store: RootState) => store?.authSlice
  );
  const { data: attendanceData, isFetching } = useGetAttendanceReportQuery(
    { group_id: currentGroup?.id, semester: currentSemester?.code },
    { skip: !currentGroup?.id || !currentSemester?.code }
  );
  const { t } = useTranslation();
  const [openDetails, setOpenDetails] =
    useState<IStudent['student_id_number']>(null);

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
          ?.values() || []
      ),
    [attendanceData]
  );

  return (
    <Flex vertical gap={12}>
      <Table
        columns={[
          {
            title: 'Talaba',
            key: 'student',
            dataIndex: 'student',
            render: (student: IStudent) => student?.full_name,
          },
          {
            title: 'Sababli (soat)',
            key: 'absent_on',
            dataIndex: 'absent_on',
            render: value => (
              <Tag color="orange">{`${value} ${t('const.hours_plural')}`}</Tag>
            ),
          },
          {
            title: 'Sababsiz (soat)',
            key: 'absent_off',
            dataIndex: 'absent_off',
            render: value => (
              <Tag color="red">{`${value} ${t('const.hours_plural')}`}</Tag>
            ),
          },
          {
            title: 'Jami',
            render: (_, record) => (
              <Tag color="magenta">
                {`${record?.absent_off + record?.absent_on} ${t('const.hours_plural')}`}
              </Tag>
            ),
          },
          {
            title: t('const.actions'),
            render: (_, record) => (
              <Button
                type="link"
                onClick={() =>
                  setOpenDetails(record?.student?.student_id_number)
                }
              >
                {t('const.in_detail')}
              </Button>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={attendanceReport || []}
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 700 }}
      />

      <CustomDrawer
        open={!!openDetails}
        onClose={() => setOpenDetails(null)}
        children={(() => {
          const studentAttendance = attendanceReport?.find(
            r => r?.student?.student_id_number === openDetails
          );
          return (
            <Flex vertical gap={18}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {studentAttendance?.student?.full_name}
              </Typography.Title>
              <Flex gap={4} wrap>
                <Tag color="error">{`${toFirstCapitalLetter(t('const.not_explicable'))}: ${studentAttendance?.absent_off} ${t('const.hours_plural')}`}</Tag>
                <Tag color="orange">{`${toFirstCapitalLetter(t('const.explicable'))}: ${studentAttendance?.absent_on} ${t('const.hours_plural')}`}</Tag>
              </Flex>
              <Flex
                vertical
                gap={8}
                style={{ maxHeight: '100dvh - 190px', overflowY: 'auto' }}
              >
                {attendanceData?.result?.attendance?.length ? (
                  <DashedList
                    list={attendanceData?.result?.attendance
                      ?.filter(d => d?.student?.student_id_number)
                      ?.map(d => ({
                        label: moment(d?.lesson_date, 'YYYY-MM-DD').format(
                          'DD.MM.YYYY'
                        ),
                        value: (
                          <Tag
                            color={d?.absent_off ? 'error' : 'orange'}
                          >{`${d?.attendance_type}: ${d?.absent_off || d?.absent_on} ${t('const.hours_plural')}`}</Tag>
                        ),
                      }))}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={`${t('const.info')} ${t('const.not_found')}`}
                  />
                )}
              </Flex>
            </Flex>
          );
        })()}
      />
    </Flex>
  );
};

export default AttendanceReport;
