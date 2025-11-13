import { ILessonPair } from '@/services/dashboard/type';
import { formatUnixTimestampToDate } from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Card, Flex, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import style from '../Schedule.module.scss';
import '../style.scss';

interface ScheduleWithMarkProps {
  subjectName?: string;
  lessonPair: ILessonPair;
  lessonDate: number;
  trainingType: string;
  employee: string;
  grade: number;
}

const ScheduleWithMark: FC<ScheduleWithMarkProps> = ({
  subjectName,
  lessonDate,
  lessonPair,
  trainingType,
  employee,
  grade,
}) => {
  const { t } = useTranslation();
  const timeRange = `${lessonPair?.start_time} - ${lessonPair?.end_time}`;

  return (
    <Card
      className={`schedule-card schedule-with-mark-card ${style['schedule-card']} ${style['green-bg-card']}`}
    >
      <Flex
        vertical
        className={style['schedule-wrapper']}
        style={{
          overflowY: 'auto',
          scrollbarColor: `#0958d930 transparent`,
        }}
        justify="space-between"
        gap={10}
      >
        <Flex vertical justify="space-between" gap={10}>
          {subjectName && (
            <Typography.Text strong>{subjectName}</Typography.Text>
          )}
          <Flex gap={8} wrap>
            <Typography.Text>{trainingType}</Typography.Text>
            <Typography.Text>{`(${employee})`}</Typography.Text>
          </Flex>
        </Flex>
        <Flex gap={5} wrap align="center">
          <Typography.Text>{`${formatUnixTimestampToDate(lessonDate, '-', 'short')}, ${timeRange}`}</Typography.Text>
        </Flex>
        <Flex>
          <Typography.Text strong>
            {`${toFirstCapitalLetter(t('const.mark'))}: ${grade}`}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ScheduleWithMark;
