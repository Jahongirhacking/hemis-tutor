import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Flex, Image, Progress, Typography } from 'antd';
import { t } from 'i18next';
import { useMemo } from 'react';
import {
  DEFAULT_SCHEDULE_TIME_INTERVAL,
  defaultIcons,
} from '../AnalyzeResult/constants';

const LessonsBySubject = ({ data }: { data: any[] }) => {
  const transformed: { id: number; subject: string; hours: number }[] = data
    .reduce(
      (acc, curr) => {
        const subjectId = curr?.subject?.id;

        const existing = acc.find(d => d?.id === subjectId);
        if (existing) {
          existing.hours += DEFAULT_SCHEDULE_TIME_INTERVAL;
        } else {
          acc.push({
            id: subjectId,
            subject: curr?.subject?.name,
            hours: DEFAULT_SCHEDULE_TIME_INTERVAL,
          });
        }
        return acc;
      },
      [] as { id: number; subject: string; hours: number }[]
    )
    // 🔹 round to 2 decimals
    .map(d => ({ ...d, hours: Number.parseFloat(d?.hours?.toFixed(2)) }));

  const maxScore = useMemo(
    () => Math.max(...transformed?.map(t => t?.hours)),
    [transformed]
  );

  return (
    <Flex vertical gap={6} className="progress-card schedule-by-week">
      {transformed?.map((subject, index) => {
        const defaultIcon =
          defaultIcons?.[
          defaultIcons?.length - 1 - (index % defaultIcons?.length)
          ];
        return (
          <Flex
            gap={8}
            justify="space-between"
            align="center"
            wrap
            className="progress-container"
            key={subject?.id}
          >
            <Flex align="center" gap={8}>
              <Button
                shape="circle"
                style={{ border: '1px solid #acacac4b', cursor: 'auto' }}
              >
                <Image src={defaultIcon?.icon} width={14} preview={false} />
              </Button>
              <Typography.Text style={{ color: defaultIcon?.primaryColor }}>
                {toFirstCapitalLetter(subject?.subject)}
              </Typography.Text>
            </Flex>
            <Progress
              percent={Math.round((subject?.hours / maxScore) * 100)}
              percentPosition={{ align: 'end', type: 'inner' }}
              size={[300, 22]}
              strokeColor={defaultIcon?.primaryColor}
              format={() => `${subject?.hours} ${t('const.hours_plural')}`}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default LessonsBySubject;
