import Attendance from '@/components/Attendance';
import AttendanceSkeleton from '@/components/Skeletons/AttendanceSkeleton';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetScheduleListMutation } from '@/services/dashboard';
import { IAttendance, ISchedule } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { RootState } from '@/store/store';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import {
  areTimestampsInSameDay,
  convertDateToDayName,
  formatUnixTimestampToDate,
  getCorrectWeek,
  setTimeToTimestamp,
} from '@/utils/dateFunc';
import { toFirstCapitalLetter, toFirstLowerLetter } from '@/utils/stringFunc';
import { Flex, Typography } from 'antd';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './style.scss';

const AttendanceBoard = ({
  attendances,
  type,
  startDate,
  endDate,
  activeDate = moment().unix(),
  children = null,
  // inDrawer = false,
}: {
  attendances: IAttendance[];
  type: 'week' | 'month' | 'semester';
  startDate: number;
  endDate: number;
  activeDate?: number;
  children?: ReactElement | null;
  inDrawer?: boolean;
}) => {
  const dispatch = useDispatch();
  const [activeAttendances, setActiveAttendances] = useState<IAttendance[]>([]);
  const startTime = moment.unix(startDate).startOf('day').unix();
  const endTime = moment.unix(endDate).endOf('day').unix();
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [allSchedules, setAllSchedules] = useState<ISchedule[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSchedules, { data: scheduleList, isLoading }] =
    useGetScheduleListMutation();
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const { t } = useTranslation();
  const schedules =
    allSchedules && type === 'month' ? allSchedules : scheduleList?.data;

  useEffect(() => {
    setActiveAttendances(
      attendances.filter(
        attendance =>
          attendance.lesson_date >= startTime &&
          attendance.lesson_date <= endTime
      )
    );
  }, [attendances, endTime, startTime]);

  useEffect(() => {
    if (allSchedules && type === 'month') return;
    const newWeek = getCorrectWeek(startTime, currentSemester);
    if (!newWeek) return;
    if (newWeek === activeWeek) return;
    getSchedules({
      week: `${newWeek}`,
    });
    setActiveWeek(newWeek);
  }, [
    getSchedules,
    startTime,
    activeWeek,
    type,
    allSchedules,
    currentSemester,
  ]);

  useEffect(() => {
    if (type === 'month') {
      updateAllSchedulesFunc();
    }
  }, [currentSemester, type]);

  const updateAllSchedulesFunc = async () => {
    if (type === 'month') {
      const res = await getSchedules({ semester: currentSemester?.code });
      if ('data' in res && 'data' in res.data) {
        setAllSchedules(res.data.data as ISchedule[]);
      }
    }
  };

  const handleClickAttendance = (date: number, totalHours: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.Attendance);
    // newParams.set(SearchParams.DrawerProps, JSON.stringify());
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('components.attendance.attendance_board.drawer_title'),
        props: { attendances, date, totalHours },
      })
    );
  };

  const AttendanceContainer = () => {
    if (type === 'week') {
      return Array.from({ length: 6 }).map((_, index) => {
        const tempDate = moment.unix(startTime).add(index, 'days').unix();
        const absentSubjects = activeAttendances.filter(attendance =>
          areTimestampsInSameDay(attendance.lesson_date, tempDate)
        );
        const dateString = convertDateToDayName(tempDate);
        const totalHours = schedules
          ? schedules
              .filter(schedule =>
                areTimestampsInSameDay(schedule.lesson_date, tempDate)
              )
              ?.reduce(
                (acc, curr) =>
                  acc +
                  Math.ceil(
                    (setTimeToTimestamp(
                      curr?.lesson_date,
                      curr?.lessonPair?.end_time
                    ) -
                      setTimeToTimestamp(
                        curr?.lesson_date,
                        curr?.lessonPair?.start_time
                      )) /
                      3600
                  ),
                0
              )
          : 0;

        return (
          <Attendance
            key={dateString}
            totalHours={totalHours}
            absentSubjects={absentSubjects}
            dateString={dateString}
            isActive={areTimestampsInSameDay(activeDate, tempDate)}
            onClick={() => handleClickAttendance(tempDate, totalHours)}
            title={`${formatUnixTimestampToDate(tempDate, '-')}, ${moment.unix(tempDate).year()}. ${t('components.attendance.attendance_board.absent_text')}: ${absentSubjects?.reduce((acc, curr) => acc + curr?.absent_off + curr?.absent_on, 0)}/${totalHours}`}
          />
        );
      });
    }
    if (type === 'month') {
      return Array.from({
        length: Math.ceil(moment.unix(startTime).daysInMonth() / 7),
      }).map((_, index) => {
        const startWeek = moment
          .unix(startTime)
          .add(index, 'weeks')
          .startOf('day')
          .unix();
        const endWeek = Math.min(
          moment.unix(startWeek).add(6, 'days').endOf('day').unix(),
          endTime
        );
        const dateString = `${formatUnixTimestampToDate(startWeek, ' ', 'short')} — ${formatUnixTimestampToDate(endWeek, ' ', 'short')}`;
        const absentSubjects = activeAttendances.filter(attendance =>
          moment
            .unix(attendance.lesson_date)
            .isBetween(moment.unix(startWeek), moment.unix(endWeek))
        );
        const totalHours = schedules
          ? schedules
              .filter(schedule =>
                moment
                  .unix(schedule.lesson_date)
                  .isBetween(moment.unix(startWeek), moment.unix(endWeek))
              )
              ?.reduce(
                (acc, curr) =>
                  acc +
                  Math.ceil(
                    (setTimeToTimestamp(
                      curr?.lesson_date,
                      curr?.lessonPair?.end_time
                    ) -
                      setTimeToTimestamp(
                        curr?.lesson_date,
                        curr?.lessonPair?.start_time
                      )) /
                      3600
                  ),
                0
              )
          : 0;

        return (
          <Attendance
            key={dateString}
            totalHours={totalHours}
            absentSubjects={absentSubjects}
            dateString={dateString}
            isActive={moment
              .unix(activeDate)
              .isBetween(moment.unix(startWeek), moment.unix(endWeek))}
            onClick={() => handleClickAttendance(startWeek, totalHours)}
            title={`${dateString}, ${moment.unix(startWeek).year()}. ${t('components.attendance.attendance_board.absent_text')}: ${absentSubjects?.reduce((acc, curr) => acc + curr?.absent_off + curr?.absent_on, 0)}/${totalHours}`}
          />
        );
      });
    }
    return null;
  };

  if (isLoading)
    return (
      <GenerateSkeleton>
        <AttendanceSkeleton />
      </GenerateSkeleton>
    );

  const explicableAttendanceHours = activeAttendances?.reduce(
    (acc, curr) => acc + curr?.absent_on,
    0
  );
  const notExplicableAttendanceHours = activeAttendances?.reduce(
    (acc, curr) => acc + curr?.absent_off,
    0
  );

  return (
    <Flex vertical className="attendance-board">
      <Flex gap={16}>
        <AttendanceContainer />
      </Flex>

      {children && React.cloneElement(children, {})}

      <Flex className="dashboard__details-list attendance-details" wrap>
        <Flex
          vertical
          className="attendances__total-absent attendances__absent-info"
        >
          <Flex align="flex-end" gap={6}>
            <Typography.Title level={1}>
              {explicableAttendanceHours + notExplicableAttendanceHours}
            </Typography.Title>
            <Typography.Title level={4}>
              {explicableAttendanceHours + notExplicableAttendanceHours > 1
                ? t('const.hours_plural')
                : t('const.hours_singular')}
            </Typography.Title>
          </Flex>
          <Typography.Text>
            {t('components.attendance.attendance_board.overall_info', {
              time:
                type === 'month'
                  ? toFirstLowerLetter(t('const.month'))
                  : type === 'week'
                    ? toFirstLowerLetter(t('const.week'))
                    : 'semestr',
            })}
          </Typography.Text>
        </Flex>

        {explicableAttendanceHours > 0 && (
          <Flex
            vertical
            className="attendances__explicable-absent attendances__absent-info"
          >
            <Flex align="flex-end" gap={6}>
              <Typography.Title level={1}>
                {explicableAttendanceHours}
              </Typography.Title>
              <Typography.Title level={4}>
                {t('const.hours_plural')}
              </Typography.Title>
            </Flex>
            <Typography.Text>
              {toFirstCapitalLetter(t('const.explicable'))}
            </Typography.Text>
          </Flex>
        )}

        {notExplicableAttendanceHours > 0 && (
          <Flex
            vertical
            className="attendances__not-explicable-absent attendances__absent-info"
          >
            <Flex align="flex-end" gap={6}>
              <Typography.Title level={1}>
                {notExplicableAttendanceHours}
              </Typography.Title>
              <Typography.Title level={4}>
                {t('const.hours_plural')}
              </Typography.Title>
            </Flex>
            <Typography.Text>
              {toFirstCapitalLetter(t('const.not_explicable'))}
            </Typography.Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default AttendanceBoard;
