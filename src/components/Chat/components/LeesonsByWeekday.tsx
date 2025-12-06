import { dayNames, getTranslatedName, LangType } from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Flex, Image, Progress, Typography } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_SCHEDULE_TIME_INTERVAL,
  defaultIcons,
} from '../AnalyzeResult/constants';

const LeesonsByWeekday = ({ data }: { data: any[] }) => {
  const { i18n, t } = useTranslation();
  const transformed: { day: string; hours: number }[] = data
    .reduce(
      (acc, curr) => {
        const dayIndex = moment.unix(curr?.lesson_date).day();
        const dayName = getTranslatedName(
          dayNames,
          dayIndex,
          'long',
          i18n.language as LangType
        );

        const existing = acc.find(d => d.day === dayName);
        if (existing) {
          existing.hours += DEFAULT_SCHEDULE_TIME_INTERVAL;
        } else {
          acc.push({ day: dayName, hours: DEFAULT_SCHEDULE_TIME_INTERVAL });
        }

        return acc;
      },
      [] as { day: string; hours: number }[]
    )
    // precision qo‘yib olish
    .map(d => ({ ...d, hours: Number.parseFloat(d.hours.toFixed(2)) }));

  const maxScore = useMemo(
    () => Math.max(...transformed?.map(t => t?.hours)),
    [transformed]
  );

  return (
    <Flex vertical gap={6} className="progress-card schedule-by-week">
      {transformed?.map((subject, index) => {
        const defaultIcon = defaultIcons?.[index % defaultIcons?.length];
        return (
          <Flex
            gap={8}
            justify="space-between"
            align="center"
            wrap
            className="progress-container"
            key={subject?.day}
          >
            <Flex align="center" gap={8}>
              <Button
                shape="circle"
                style={{ border: '1px solid #acacac4b', cursor: 'auto' }}
              >
                <Image src={defaultIcon?.icon} width={14} preview={false} />
              </Button>
              <Typography.Text style={{ color: defaultIcon?.primaryColor }}>
                {toFirstCapitalLetter(subject?.day)}
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

export default LeesonsByWeekday;
