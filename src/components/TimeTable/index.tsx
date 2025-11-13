import { ISchedule } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import {
  areTimestampsInSameDay,
  convertDateToDayName,
  convertDateToTimeString,
  timeStringToMinutes,
} from '@/utils/dateFunc';
import { Empty, Flex, Spin, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Schedule from '../Schedule';
import './style.scss';

const TimeTable = ({
  pixelsForOneCellHeight,
  activeOption,
  activeDate,
  isLoading = false,
  schedules,
}: {
  pixelsForOneCellHeight: number;
  activeOption: 'week' | 'day';
  activeDate: number;
  isLoading?: boolean;
  schedules?: ISchedule[];
}) => {
  const DEFAULT_BEGINNING_HOUR = 8;
  const DEFAULT_MAX_HOURS = 5;
  const { t } = useTranslation();
  const now = useSelector((store: RootState) => store.currentTimeSlice);
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const numberOfDays = activeOption === 'week' ? 6 : 1;
  const currentTimeInMinutes =
    moment.unix(now).toDate().getHours() * 60 +
    moment.unix(now).toDate().getMinutes();

  const makeRound = (num: number, roundType: 'floor' | 'ceil') => {
    if (roundType === 'floor') {
      if (Math.floor(num) === num) return num - 1;
      return Math.floor(num);
    } else {
      if (Math.ceil(num) === num) return num + 1;
      return Math.ceil(num);
    }
  };

  const getBeginningHour = (option: 'week' | 'day'): number | null => {
    if (!schedules || !schedules.length) return null;
    const callbackFn = (acc: number, curr: ISchedule) =>
      Math.min(acc, timeStringToMinutes(curr?.lessonPair?.start_time));
    if (option === 'week') {
      const value = makeRound(
        schedules.reduce(callbackFn, Infinity) / 60,
        'floor'
      );
      return value !== Infinity ? value : null;
    } else if (option === 'day') {
      const value = makeRound(
        schedules
          .filter(schedule =>
            areTimestampsInSameDay(activeDate, schedule?.lesson_date)
          )
          .reduce(callbackFn, Infinity) / 60,
        'floor'
      );
      return value !== Infinity ? value : null;
    }
    return null;
  };

  const getMaxHours = (option: 'week' | 'day'): number | null => {
    const defaultValue = 13;
    const callbackFn = (acc: number, curr: ISchedule) =>
      Math.max(acc, timeStringToMinutes(curr?.lessonPair?.end_time));
    if (!schedules || !schedules.length) return defaultValue;
    if (option === 'week') {
      const value = makeRound(schedules.reduce(callbackFn, -1) / 60, 'ceil');
      return value !== 0 ? value : defaultValue;
    } else if (option === 'day') {
      const value = makeRound(
        schedules
          .filter(schedule =>
            areTimestampsInSameDay(activeDate, schedule?.lesson_date)
          )
          .reduce(callbackFn, -1) / 60,
        'ceil'
      );
      return value !== 0 ? value : defaultValue;
    }
    return defaultValue;
  };

  const beginningHour = getBeginningHour(activeOption);

  const maxHours =
    getMaxHours(activeOption) - (beginningHour ?? DEFAULT_BEGINNING_HOUR);

  return (
    <div className="time-table-wrapper">
      <Flex className="time-table">
        {isLoading && (
          <Spin
            style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 5 }}
          />
        )}
        {!isLoading && !beginningHour && (
          <Empty
            description={`${t('dashboard.dashboard_page.schedules.empty_text')}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              zIndex: 5,
              transform: 'translate(-65px, -92px)',
            }}
          />
        )}
        <Flex vertical className="time-column table-column">
          <div className="table-header table-cell">
            {currentSemester ? (
              <span
                style={
                  moment.unix(activeDate).isSame(moment(), 'week')
                    ? { color: '#389e0d' }
                    : {}
                }
              >
                #
                {currentSemester?.weeks?.findIndex(week =>
                  moment
                    .unix(activeDate)
                    .startOf('day')
                    .add(1, 'hour')
                    .isBetween(
                      moment.unix(week?.start_date).startOf('day'),
                      moment.unix(week?.end_date).endOf('day')
                    )
                ) + 1}
              </span>
            ) : (
              <Spin />
            )}
          </div>
          <Flex vertical className="table-body">
            {Array.from({ length: maxHours }).map((_, index) => (
              <div
                key={index}
                className="table-cell"
                style={{
                  maxHeight: `${pixelsForOneCellHeight}px`,
                  minHeight: `${pixelsForOneCellHeight}px`,
                  borderBottom: '1px solid #f0f0f0',
                  borderTop: '1px solid #f0f0f0',
                }}
              >
                {String(
                  (beginningHour ?? DEFAULT_BEGINNING_HOUR) + index
                ).padStart(2, '0')}
                :00
              </div>
            ))}
            <span
              className="current-time"
              style={{
                position: 'absolute',
                display:
                  (beginningHour ?? DEFAULT_BEGINNING_HOUR) * 60 <=
                    currentTimeInMinutes &&
                  ((beginningHour ?? DEFAULT_BEGINNING_HOUR) +
                    (maxHours ?? DEFAULT_MAX_HOURS)) *
                    60 >=
                    currentTimeInMinutes
                    ? 'block'
                    : 'none',
                right: '3px',
                top: `${(currentTimeInMinutes - (beginningHour ?? DEFAULT_BEGINNING_HOUR) * 60) * (pixelsForOneCellHeight / 60) - 10}px`,
                zIndex: 2,
              }}
            >
              {convertDateToTimeString(moment.unix(now).toDate())}
            </span>
          </Flex>
        </Flex>

        <Flex className="day-column--wrapper">
          {Array.from({ length: numberOfDays }).map((_, day) => (
            <Flex
              key={day}
              vertical
              className={`day-column table-column ${activeOption}-option ${areTimestampsInSameDay(moment.unix(activeDate).add(day, 'days').unix(), moment().unix()) && 'today'}`}
            >
              <div className="table-header table-cell">
                <Tooltip
                  title={moment
                    .unix(activeDate)
                    .add(day, 'days')
                    .format('DD.MM.YYYY')}
                >
                  <Flex gap={3} align="flex-end">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                      {moment
                        .unix(activeDate)
                        .add(day, 'days')
                        .toDate()
                        .getDate()}
                    </Typography.Title>
                    <Typography.Text>
                      {convertDateToDayName(
                        moment.unix(activeDate).add(day, 'days').unix(),
                        'short'
                      )}
                    </Typography.Text>
                  </Flex>
                </Tooltip>
              </div>
              <Flex vertical className="table-body">
                {
                  // Table cells
                  Array.from({ length: maxHours }).map((_, index) => (
                    <div
                      key={index}
                      className="table-cell"
                      style={{
                        maxHeight: `${pixelsForOneCellHeight}px`,
                        minHeight: `${pixelsForOneCellHeight}px`,
                      }}
                    />
                  ))
                }
                {// Schedules
                schedules
                  ?.filter(schedule =>
                    areTimestampsInSameDay(
                      schedule.lesson_date,
                      moment.unix(activeDate).add(day, 'days').unix()
                    )
                  )
                  .map((scheduleItem, index) => {
                    if (!scheduleItem || !scheduleItem.lessonPair) return null;

                    return (
                      <Schedule
                        key={scheduleItem.id || index}
                        schedule={scheduleItem}
                        style={{
                          margin: 0,
                          padding: 0,
                          position: 'absolute',
                          left: '5px',
                          width: 'calc(100% - 10px)',
                          height: `${(timeStringToMinutes(scheduleItem.lessonPair.end_time) - timeStringToMinutes(scheduleItem.lessonPair.start_time)) * (pixelsForOneCellHeight / 60)}px`,
                          top: `${(timeStringToMinutes(scheduleItem.lessonPair.start_time) - (beginningHour ?? DEFAULT_BEGINNING_HOUR) * 60) * (pixelsForOneCellHeight / 60)}px`,
                          zIndex: 1,
                        }}
                      />
                    );
                  })}
                {
                  // Today's indicator
                  areTimestampsInSameDay(
                    moment.unix(activeDate).add(day, 'days').unix(),
                    moment().unix()
                  ) && (
                    <div
                      className="current-indicator"
                      style={{
                        position: 'absolute',
                        top: `${(currentTimeInMinutes - (beginningHour ?? DEFAULT_BEGINNING_HOUR) * 60) * (pixelsForOneCellHeight / 60)}px`,
                        left: 0,
                        right: 0,
                        borderBottom: '1px solid #237804',
                        zIndex: 2,
                      }}
                    />
                  )
                }
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default TimeTable;
