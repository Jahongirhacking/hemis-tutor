import { IAttendance } from '@/services/dashboard/type';
import {
  areTimestampsInSameDay,
  convertDateToDayName,
  formatUnixTimestampToDate,
  getStartingDateUnixTimeStamp,
  handleClickDateChangerBtn,
} from '@/utils/dateFunc';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Flex, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AttendanceBoard from '../AttendanceBoard';
import './style.scss';

const AttendanceInDrawer = ({
  attendances,
  date = moment().unix(),
  totalHours,
}: {
  attendances?: IAttendance[];
  date?: number;
  totalHours?: number;
}) => {
  const [startDate, setStartDate] = useState<number>(
    getStartingDateUnixTimeStamp(moment().unix(), 'week')
  );
  const { t } = useTranslation();

  const endDate = moment.unix(startDate).add(5, 'days').unix();
  const absentSubjects = attendances?.filter(attendance =>
    areTimestampsInSameDay(attendance?.lesson_date, date)
  );

  useEffect(() => {
    setStartDate(getStartingDateUnixTimeStamp(date, 'week'));
  }, [date]);

  const dateRange = `${formatUnixTimestampToDate(startDate, '-')} — ${formatUnixTimestampToDate(endDate, '-')}`;

  if (!attendances)
    return <Empty description={`${t('const.info')} ${t('const.not_found')}`} />;

  return (
    <Flex className="attendances__body card__body" vertical gap={4}>
      <Flex
        className="attendances__date-range attendances__date-range-drawer"
        gap={10}
        justify="space-between"
        align="center"
      >
        <Button
          icon={<LeftOutlined />}
          onClick={() => handleClickDateChangerBtn(-1, 'week', setStartDate)}
        />
        <Typography.Text strong>{dateRange}</Typography.Text>
        <Button
          icon={<RightOutlined />}
          onClick={() => handleClickDateChangerBtn(1, 'week', setStartDate)}
        />
      </Flex>
      <Flex gap={16}>
        <AttendanceBoard
          attendances={attendances}
          type="week"
          startDate={startDate}
          endDate={endDate}
          activeDate={date}
          children={
            <Flex className="attendances__info" align="center" gap={8} vertical>
              <Typography.Text className="attendances__active-day">
                {convertDateToDayName(date, 'long')},{' '}
                {formatUnixTimestampToDate(date, '-')}
              </Typography.Text>
              <Flex vertical gap={2} style={{ width: '100%' }}>
                {absentSubjects.length !== 0 ? (
                  absentSubjects.map((attendance, index) => (
                    <React.Fragment key={index}>
                      <Flex
                        justify="space-between"
                        align="center"
                        style={{ width: '100%' }}
                      >
                        <Flex gap={4} vertical className="subject-info">
                          <Typography.Text strong>
                            {attendance?.subject?.name}
                          </Typography.Text>
                          <Typography.Text>
                            {attendance?.employee?.name}
                          </Typography.Text>
                          <Flex className="subject-details dashboard__details-list">
                            <Typography.Text>
                              {attendance?.trainingType?.name}
                            </Typography.Text>
                            <Typography.Text>
                              {attendance?.explicable
                                ? t('const.explicable')
                                : t('const.not_explicable')}
                            </Typography.Text>
                            <Typography.Text>
                              {t(
                                'components.attendance.attendance_in_drawer.session_number',
                                { session: attendance?.lessonPair?.name }
                              )}
                            </Typography.Text>
                          </Flex>
                        </Flex>

                        <Flex
                          vertical
                          className={`subject-hour ${attendance?.explicable ? 'explicable' : 'not-explicable'}`}
                        >
                          <Typography.Title level={3}>
                            {attendance?.absent_on || attendance?.absent_off}
                          </Typography.Title>
                          <Typography.Text strong>
                            {t('const.hours_plural')}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : totalHours === 0 ? (
                  <Empty
                    description={t(
                      'components.attendance.attendance_in_drawer.no_schedule_text'
                    )}
                  />
                ) : (
                  <Empty
                    description={t(
                      'components.attendance.attendance_in_drawer.empty_text'
                    )}
                  />
                )}
              </Flex>
            </Flex>
          }
          inDrawer
        />
      </Flex>
    </Flex>
  );
};

export default AttendanceInDrawer;
