import { IExamList } from '@/services/dashboard/type';
import {
  convertDateToDayName,
  getStatus,
  getTranslatedName,
  monthNames,
  setTimeToTimestamp,
} from '@/utils/dateFunc';
import { Flex, Tag, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import './style.scss';

const ExamTable = ({ data }: { data: IExamList[] }) => {
  const { t } = useTranslation();

  const getScheduleStatus = (
    exam: IExamList
  ): 'completed' | 'processing' | 'future' => {
    const examDateStartTime = setTimeToTimestamp(
      exam?.examDate,
      exam?.lessonPair?.start_time
    );
    const examDateEndTime = setTimeToTimestamp(
      exam?.examDate,
      exam?.lessonPair?.end_time
    );
    return getStatus(examDateStartTime, examDateEndTime);
  };

  const examDate = data[0]?.examDate;

  return (
    <Flex className={`exam-table`} gap={4}>
      <Flex vertical justify="center" align="center" className="left" gap={4}>
        <Typography.Title level={2}>
          {moment.unix(examDate).get('date')}
        </Typography.Title>
        <Typography.Text className="month-name" style={{ marginBottom: '2px' }}>
          {getTranslatedName(
            monthNames,
            moment.unix(examDate).get('month'),
            'long'
          )}
        </Typography.Text>
        <Typography.Text className="year-name">
          {t('const.year_number', { year: moment.unix(examDate).get('year') })}
        </Typography.Text>
        <Typography.Text strong>
          {convertDateToDayName(examDate, 'long')}
        </Typography.Text>
      </Flex>
      <Flex vertical className="exam-day-container" gap={5} align="flex-start">
        {[...data]?.map(exam => (
          <Flex
            key={exam.id}
            align="center"
            justify="center"
            gap={16}
            className={`right ${getScheduleStatus(exam)}-card`}
          >
            <Flex className="content" vertical gap={6}>
              <Flex
                justify="space-between"
                style={{ marginBottom: 4, columnGap: '10px', rowGap: '5px' }}
                wrap
              >
                <h2>{exam?.examType?.name}</h2>
                <h2>
                  {exam?.lessonPair?.start_time} - {exam?.lessonPair?.end_time}
                </h2>
              </Flex>
              <Flex gap={4} wrap>
                <p>{t('const.subject')}:</p>
                <h3>{exam?.subject?.name}</h3>
              </Flex>
              <Flex gap={4} wrap>
                <p>{t('const.teacher')}:</p>
                <h3>{exam?.employee?.name}</h3>
              </Flex>
              <Flex gap={4} align="center" wrap>
                <p>{t('const.auditorium')}:</p>
                <Tag color="geekblue">
                  {exam?.auditorium?.name} / {exam?.auditorium?.building?.name}
                </Tag>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ExamTable;
