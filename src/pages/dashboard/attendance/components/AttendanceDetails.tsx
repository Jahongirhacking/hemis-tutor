import i18n from '@/i18n';
import {
  IAttendance,
  IAttendanceReportRes,
  IStudent,
} from '@/services/student/type';
import { formatUnixTimestampToDate, LangType } from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Card, Col, Empty, Flex, Row, Switch, Tag, Typography } from 'antd';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo, useState } from 'react';

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

  return (
    <Flex vertical gap={18} className="attendance-details">
      <Flex
        gap={8}
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

        <Flex gap={8}>
          <Typography.Text>{t('const.in_detail')}</Typography.Text>
          <Switch onChange={value => setInDetail(value)} />
        </Flex>
      </Flex>

      <Flex vertical gap={8} className="mt-3">
        {attendanceByDate?.length ? (
          <Row gutter={[18, 18]}>
            {attendanceByDate?.map(attendance => (
              <Col span={24} sm={24} md={12} key={attendance?.[0]}>
                <Card hoverable>
                  <Flex vertical gap={8}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {formatUnixTimestampToDate(
                        moment(attendance?.[0], 'YYYY-MM-DD').unix(),
                        '-',
                        'long',
                        i18n?.language as LangType
                      )}
                    </Typography.Title>

                    {inDetail ? (
                      <Flex vertical gap={6}>
                        {attendance?.[1]?.map(a => (
                          <Tag
                            color={a?.absent_off ? 'red' : 'orange'}
                          >{`${toFirstCapitalLetter(a?.subject)}: ${a?.absent_off || a?.absent_on} ${t('const.hours_plural')}`}</Tag>
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
                                <Tag color="red">{`${t('const.not_explicable')}: ${total?.absent_off} ${t('const.hours_plural')}`}</Tag>
                              )}
                              {!!total?.absent_on && (
                                <Tag color="orange">{`${t('const.explicable')}: ${total?.absent_on} ${t('const.hours_plural')}`}</Tag>
                              )}
                            </Flex>
                          );
                        })()}
                      </Flex>
                    )}
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
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
