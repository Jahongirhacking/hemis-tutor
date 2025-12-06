import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Flex, Image, Progress, Tooltip, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultIcons } from '../AnalyzeResult/constants';

const SemesterAttendance = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const attendance: (Pick<any, 'absent_off' | 'absent_on'> & {
    semester: string;
  })[] = [...data]
    ?.sort(
      (a, b) =>
        Number.parseInt(a?.semester?.code) - Number.parseInt(b?.semester?.code)
    )
    .reduce((acc, item) => {
      const semesterName = item.semester?.name ?? "Noma'lum";

      const existing = acc.find(d => d.semester === semesterName);
      if (existing) {
        existing.absent_on += item.absent_on;
        existing.absent_off += item.absent_off;
      } else {
        acc.push({
          semester: semesterName,
          absent_on: item.absent_on,
          absent_off: item.absent_off,
        });
      }
      return acc;
    }, []);

  const maxScore = useMemo(
    () => Math.max(...attendance?.map(a => a?.absent_off + a?.absent_on)),
    [attendance]
  );

  return (
    <Flex vertical gap={6} className="progress-card appropriation-progress">
      {attendance?.map((subject, index) => {
        const defaultIcon = defaultIcons?.[index % defaultIcons?.length];
        return (
          <Flex
            gap={8}
            justify="space-between"
            align="center"
            wrap
            className="progress-container"
            key={subject?.semester}
          >
            <Flex align="center" gap={8}>
              <Button
                shape="circle"
                style={{ border: '1px solid #acacac4b', cursor: 'auto' }}
              >
                <Image src={defaultIcon?.icon} width={14} preview={false} />
              </Button>
              <Typography.Text style={{ color: defaultIcon?.primaryColor }}>
                {toFirstCapitalLetter(subject?.semester)}
              </Typography.Text>
            </Flex>
            <Tooltip
              title={`${toFirstCapitalLetter(t('const.explicable'))}: ${subject?.absent_on} ${t('const.hours_plural')} | ${toFirstCapitalLetter(t('const.not_explicable'))}: ${subject?.absent_off} ${t('const.hours_plural')}`}
            >
              <Progress
                percent={Math.round(
                  ((subject?.absent_off + subject?.absent_on) / maxScore) * 100
                )}
                percentPosition={{ align: 'end', type: 'inner' }}
                size={[300, 22]}
                strokeColor="#f02c8bff"
                success={{
                  percent: (subject?.absent_on / maxScore) * 100,
                  strokeColor: '#3fc556ff',
                }}
                format={() =>
                  `${subject?.absent_off + subject?.absent_on} ${t('const.hours_plural')}`
                }
              />
            </Tooltip>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default SemesterAttendance;
