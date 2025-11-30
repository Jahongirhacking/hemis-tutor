import { useGetAttendanceReportQuery } from '@/services/student';
import { IAttendance, IStudent } from '@/services/student/type';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Divider, Flex, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDrawer from '../../components/CustomDrawer';
import { default as CustomTable } from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';
import AttendanceDetails from '../components/AttendanceDetails';

const AttendanceReport = () => {
  const { values, form } = useCustomFilter();
  const { data: attendanceData, isFetching } = useGetAttendanceReportQuery({
    ...values,
  });
  const { t } = useTranslation();
  const [openDetails, setOpenDetails] = useState<IStudent>(null);

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
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        columns={[
          {
            title: t('const.student'),
            key: 'student',
            dataIndex: 'student',
            render: (_, record) => (
              <CustomLink.Student student={record?.student} />
            ),
          },
          {
            title: `${toFirstCapitalLetter(t('const.explicable'))} (${t('const.hours_plural')})`,
            key: 'absent_on',
            dataIndex: 'absent_on',
            sorter: (a, b) => (a?.absent_on || 0) - (b?.absent_on || 0),
            render: value => (
              <Tag color="orange">{`${value} ${t('const.hours_plural')}`}</Tag>
            ),
          },
          {
            title: `${toFirstCapitalLetter(t('const.not_explicable'))} (${t('const.hours_plural')})`,
            key: 'absent_off',
            dataIndex: 'absent_off',
            sorter: (a, b) => (a?.absent_off || 0) - (b?.absent_off || 0),
            render: value => (
              <Tag color="red">{`${value} ${t('const.hours_plural')}`}</Tag>
            ),
          },
          {
            title: t('const.total'),
            sorter: (a, b) => (a?.total || 0) - (b?.total || 0),
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
                onClick={() => setOpenDetails(record?.student)}
              >
                {t('const.in_detail')}
              </Button>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={attendanceReport || []}
        loading={isFetching}
      />

      <CustomDrawer
        open={!!openDetails}
        onClose={() => setOpenDetails(null)}
        children={
          <AttendanceDetails
            attendanceData={attendanceData?.result}
            student={openDetails}
          />
        }
      />
    </Flex>
  );
};

export default AttendanceReport;
