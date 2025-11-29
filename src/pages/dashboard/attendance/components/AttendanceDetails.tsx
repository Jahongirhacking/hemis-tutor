import i18n from '@/i18n';
import {
  IAttendance,
  IAttendanceReportRes,
  IStudent,
} from '@/services/student/type';
import { RootState } from '@/store/store';
import {
  CURRENT_DATE_FORMAT,
  formatUnixTimestampToDate,
  LangType,
} from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import {
  Badge,
  Card,
  Divider,
  Empty,
  Flex,
  Switch,
  Tag,
  Typography,
} from 'antd';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// Fix TS for react-responsive-masonry
const ResponsiveMasonryFixed = ResponsiveMasonry as unknown as React.FC<any>;
const MasonryFixed = Masonry as unknown as React.FC<any>;

const AttendanceDetails = ({
  attendanceData,
  student,
}: {
  attendanceData: IAttendanceReportRes;
  student: IStudent;
}) => {
  const studentAttendance = useMemo(
    () =>
      attendanceData?.attendance?.filter(
        a => a?.student?.student_id_number === student?.student_id_number
      ),
    [attendanceData, student]
  );
  const attendanceByDate = useMemo(
    () =>
      Array.from(
        studentAttendance
          ?.reduce<Map<IAttendance['lesson_date'], IAttendance[]>>(
            (acc, curr) => {
              if (acc.has(curr?.lesson_date)) {
                acc.set(curr?.lesson_date, [
                  ...acc.get(curr?.lesson_date),
                  curr,
                ]);
              } else {
                acc.set(curr?.lesson_date, [curr]);
              }
              return acc;
            },
            new Map()
          )
          ?.entries() || []
      ),
    [studentAttendance]
  );
  const [inDetail, setInDetail] = useState(false);
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);

  return (
    <Flex vertical gap={18} className="attendance-details">
      <Flex
        gap={12}
        align="center"
        className="w-full flex-wrap"
        justify="space-between"
        wrap
      >
        <Flex vertical gap={6}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {student?.full_name}
          </Typography.Title>

          <Flex gap={4} wrap>
            <Tag color="error">{`${toFirstCapitalLetter(t('const.not_explicable'))}: ${studentAttendance?.reduce((acc, curr) => acc + curr?.absent_off, 0)} ${t('const.hours_plural')}`}</Tag>
            <Tag color="orange">{`${toFirstCapitalLetter(t('const.explicable'))}: ${studentAttendance?.reduce((acc, curr) => acc + curr?.absent_on, 0)} ${t('const.hours_plural')}`}</Tag>
          </Flex>
        </Flex>

        <Flex gap={8} className="ml-auto">
          <Typography.Text>{t('const.by_science')}</Typography.Text>
          <Switch onChange={value => setInDetail(value)} />
        </Flex>
      </Flex>

      <Divider className="m-0" />

      <Flex vertical gap={8}>
        {attendanceByDate?.length ? (
          <ResponsiveMasonryFixed
            columnsCountBreakPoints={{
              150: 1,
              380: 2,
            }}
          >
            <MasonryFixed gutter="20px">
              {attendanceByDate?.map(attendance => (
                <Card
                  hoverable
                  className={`w-full bg-zinc-${themeColor === 'dark' ? 900 : 100}`}
                >
                  <Flex vertical gap={8}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {`${formatUnixTimestampToDate(
                        moment(attendance?.[0], CURRENT_DATE_FORMAT).unix(),
                        '-',
                        'long',
                        i18n?.language as LangType
                      )}, ${moment(attendance?.[0], CURRENT_DATE_FORMAT)?.year()}`}
                    </Typography.Title>

                    {inDetail ? (
                      <Flex gap={6} wrap>
                        {attendance?.[1]?.map(a => (
                          <Tag className="w-fit flex gap-2">
                            <Badge
                              status={a?.absent_on ? 'warning' : 'error'}
                            />{' '}
                            {`${toFirstCapitalLetter(a?.subject)}: ${a?.absent_off || a?.absent_on} ${t('const.hours_plural')}`}
                          </Tag>
                        ))}
                      </Flex>
                    ) : (
                      <Flex vertical gap={6}>
                        {(() => {
                          const total = attendance?.[1]?.reduce<
                            Pick<IAttendance, 'absent_off' | 'absent_on'>
                          >(
                            (acc, curr) => {
                              acc.absent_off += curr?.absent_off;
                              acc.absent_on += curr?.absent_on;
                              return acc;
                            },
                            { absent_off: 0, absent_on: 0 }
                          );

                          return (
                            <Flex vertical gap={6}>
                              {!!total?.absent_off && (
                                <Tag className="w-fit flex gap-2 items-center">
                                  <Badge status="error" />
                                  {`${toFirstCapitalLetter(t('const.not_explicable'))}: ${total?.absent_off} ${t('const.hours_plural')}`}
                                </Tag>
                              )}
                              {!!total?.absent_on && (
                                <Tag className="w-fit flex gap-2 items-center">
                                  <Badge status="warning" />{' '}
                                  {`${toFirstCapitalLetter(t('const.explicable'))}: ${total?.absent_on} ${t('const.hours_plural')}`}
                                </Tag>
                              )}
                            </Flex>
                          );
                        })()}
                      </Flex>
                    )}
                  </Flex>
                </Card>
              ))}
            </MasonryFixed>
          </ResponsiveMasonryFixed>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`${t('const.info')} ${t('const.not_found')}`}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default AttendanceDetails;
