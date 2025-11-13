import DashedList from '@/components/DashedList';
import { IAttendance, IBaseCode, ISchedule } from '@/services/dashboard/type';
import {
  formatUnixTimestampToDate,
  setTimeToTimestamp,
} from '@/utils/dateFunc';
import { InfoCircleFilled } from '@ant-design/icons';
import { Divider, Empty, Flex, Spin, Tag, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import AttendanceDetailsList from '../AttendanceDetailsList';
import './style.scss';

const AttendanceDetailInDrawer = ({
  subject,
  attendance,
  schedules,
  isScheduleLoading,
}: {
  subject?: IBaseCode;
  attendance?: IAttendance[];
  isScheduleLoading?: boolean;
  schedules?: ISchedule[];
}) => {
  const { t } = useTranslation();

  if (!subject)
    return <Empty description={`${t('const.info')} ${t('const.not_found')}`} />;

  const activeAttendance = attendance?.filter(
    item => item?.subject?.id === subject?.id
  );

  const attendanceMap = new Map<string, IAttendance[]>();
  activeAttendance.forEach(item => {
    if (attendanceMap.has(item?.trainingType?.name)) {
      attendanceMap.set(item?.trainingType?.name, [
        ...attendanceMap.get(item?.trainingType?.name),
        item,
      ]);
    } else {
      attendanceMap.set(item?.trainingType?.name, [item]);
    }
  });

  const activeLessons =
    schedules &&
    schedules?.length &&
    schedules?.filter(schedule => schedule?.subject?.id === subject?.id);
  const absentOffAttendance = activeAttendance?.filter(
    attendance => !attendance.explicable
  );

  const lessonsMap = new Map<number, ISchedule>();
  activeLessons &&
    activeLessons?.forEach(lesson =>
      lessonsMap.set(
        setTimeToTimestamp(lesson?.lesson_date, lesson?.lessonPair?.start_time),
        lesson
      )
    );

  const totalHours = Array.from(lessonsMap).reduce(
    (acc, curr) =>
      acc +
      Math.ceil(
        (setTimeToTimestamp(
          curr[1]?.lesson_date,
          curr[1]?.lessonPair?.end_time
        ) -
          setTimeToTimestamp(
            curr[1]?.lesson_date,
            curr[1]?.lessonPair?.start_time
          )) /
          3600
      ),
    0
  );

  const attendancePercent =
    activeLessons?.length &&
    totalHours &&
    (absentOffAttendance?.reduce((acc, curr) => acc + curr?.absent_off, 0) /
      totalHours) *
      100;

  return (
    <Flex vertical gap={20} className="attendance-detail-in-drawer">
      <Flex vertical gap={3}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {subject?.name}
        </Typography.Title>
        <Typography.Text strong>
          {!isScheduleLoading ? (
            activeLessons ? (
              <Flex gap={8}>
                <span>{`${absentOffAttendance?.reduce((acc, curr) => acc + curr?.absent_off + curr?.absent_on, 0)} ${t('const.hours_plural')} / ${totalHours} ${t('const.hours_plural')}`}</span>
                <span>≈</span>
                <span
                  style={{
                    color:
                      attendancePercent < 12
                        ? '#52c41a'
                        : attendancePercent < 25
                          ? 'orange'
                          : '#eb2f96',
                  }}
                >
                  {attendancePercent?.toFixed(1)}%
                </span>
                <Tooltip
                  placement="bottom"
                  title={t(
                    'components.attendance.attendance_in_drawer.percentage_info'
                  )}
                  trigger={['click']}
                >
                  <InfoCircleFilled style={{ color: '#1677ff' }} />
                </Tooltip>
              </Flex>
            ) : (
              `${t('const.time_table')} ${t('const.not_found')}`
            )
          ) : (
            <Spin />
          )}
        </Typography.Text>
      </Flex>

      <AttendanceDetailsList attendance={activeAttendance} />

      <Divider orientation="left" style={{ margin: 0 }}>
        Mashg’ulot bo’yicha
      </Divider>

      <Flex vertical gap={12} className="subject-type">
        {Array.from(attendanceMap.keys()).map(key => (
          <Flex key={key} wrap align="center" justify="space-between">
            <Typography.Text strong>{key}</Typography.Text>
            <AttendanceDetailsList attendance={attendanceMap.get(key)} />
          </Flex>
        ))}
      </Flex>

      <Divider orientation="left" style={{ margin: 0 }}>
        Sana bo’yicha
      </Divider>

      <DashedList
        list={activeAttendance.map(item => ({
          label: `
                    ${formatUnixTimestampToDate(item?.lesson_date, '-')}, 
                    ${moment.unix(item?.lesson_date).year()}`,
          value: (
            <Tag color={item?.explicable ? 'green' : 'pink'}>
              {item?.trainingType?.name}
            </Tag>
          ),
        }))}
      />
    </Flex>
  );
};

export default AttendanceDetailInDrawer;
