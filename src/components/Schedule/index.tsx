import { ISchedule } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { RootState } from '@/store/store';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import {
  getStatus,
  setTimeToTimestamp,
  timeStringToMinutes,
} from '@/utils/dateFunc';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import style from './Schedule.module.scss';
import './style.scss';

const Schedule = ({
  schedule,
  style: scheduleStyle = {},
}: {
  schedule: ISchedule;
  style?: React.CSSProperties;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const allAttendance = useSelector(
    (store: RootState) => store?.authSlice?.attendance
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState(
    getStatus(
      setTimeToTimestamp(schedule.lesson_date, schedule.lessonPair?.start_time),
      setTimeToTimestamp(schedule.lesson_date, schedule.lessonPair?.end_time)
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatus(
        getStatus(
          setTimeToTimestamp(
            schedule.lesson_date,
            schedule.lessonPair?.start_time
          ),
          setTimeToTimestamp(
            schedule.lesson_date,
            schedule.lessonPair?.end_time
          )
        )
      );
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    schedule.lessonPair.start_time,
    schedule.lessonPair.end_time,
    schedule.lesson_date,
  ]);

  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);

  const colors = {
    completed: themeColor === 'dark' ? '#291321' : '#fff0f6',
    processing: themeColor === 'dark' ? '#162312' : '#f6ffed',
    future: themeColor === 'dark' ? '#111A2C' : '#e6f4ff',
  };

  const scheduleStatus = `${
    status === 'completed'
      ? 'red'
      : status === 'processing'
        ? 'green'
        : status === 'future'
          ? 'blue'
          : ''
  }-bg-card`;

  const timeRange = `${schedule?.lessonPair?.start_time} - ${schedule?.lessonPair?.end_time}`;

  const handleScheduleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.Schedule);
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.in_detail'),
        props: {
          schedule,
          attendanceStatus,
        },
      })
    );
  };

  const getAttendanceStatus = () => {
    if (status === 'future') return 'waiting';
    if (status === 'processing') return 'in_process';
    const info = allAttendance?.data?.find(
      attendance =>
        attendance?.lesson_date === schedule?.lesson_date &&
        attendance?.subject?.code === schedule?.subject?.code &&
        attendance?.trainingType?.code === schedule?.trainingType?.code &&
        Math.abs(
          timeStringToMinutes(attendance?.lessonPair?.start_time) -
            timeStringToMinutes(schedule?.lessonPair?.start_time)
        ) < 80
    );
    if (
      !allAttendance ||
      !allAttendance?.data ||
      allAttendance?.data?.length === 0 ||
      !info
    )
      return 'attended';
    if (info?.explicable) return 'absent_on';
    return 'absent_off';
  };

  const attendanceStatus:
    | 'waiting'
    | 'absent_on'
    | 'absent_off'
    | 'attended'
    | 'in_process' = getAttendanceStatus();

  return (
    <Card
      className={`schedule-card ${style['schedule-card']} ${style[scheduleStatus]}`}
      style={{
        ...scheduleStyle,
        backgroundColor:
          status === 'completed'
            ? colors.completed
            : status === 'processing'
              ? colors.processing
              : colors.future,
      }}
      hoverable
      onClick={handleScheduleClick}
    >
      <Flex
        vertical
        className={style['schedule-wrapper']}
        style={{
          minHeight: `calc(${scheduleStyle.height} - 8px)`,
          maxHeight: `calc(${scheduleStyle.height} - 8px)`,
          overflowY: 'auto',
          scrollbarColor: `${status === 'completed' ? '#c41d7e30' : status === 'future' ? '#0958d930' : '#389e0d30'} transparent`,
        }}
        justify="space-between"
        gap={10}
      >
        <Flex vertical justify="space-between" gap={10}>
          <Typography.Text strong>{schedule?.subject?.name}</Typography.Text>
          <Flex gap={8} wrap>
            <Typography.Text>{schedule?.trainingType?.name}</Typography.Text>
            <Typography.Text>{`(${schedule?.employee?.name})`}</Typography.Text>
          </Flex>
        </Flex>
        <Flex gap={5} wrap align="center">
          <Typography.Text>{timeRange}</Typography.Text>
          <Typography.Text strong>{schedule?.auditorium?.name}</Typography.Text>
        </Flex>
      </Flex>
      <div className="attendance-status">
        {attendanceStatus === 'attended' ? (
          <CheckCircleOutlined />
        ) : attendanceStatus === 'absent_off' ? (
          <CloseCircleOutlined />
        ) : attendanceStatus === 'absent_on' ? (
          <WarningOutlined />
        ) : null}
      </div>
    </Card>
  );
};

export default Schedule;
