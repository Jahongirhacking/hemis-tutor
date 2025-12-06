import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Flex, Image, Typography } from 'antd';
import { t } from 'i18next';
import { useMemo } from 'react';
import { defaultIcons } from '../AnalyzeResult/constants';

const SubjectAttendance = ({ attendance }: { attendance: any[] }) => {
  const attendanceBySubject = useMemo(() => {
    if (!attendance) return [];

    const map = attendance.reduce((acc, curr) => {
      const key = curr.subject.id;

      if (acc.has(key)) {
        const prev = acc.get(key);

        // create a new object instead of mutating
        acc.set(key, {
          ...prev,
          absent_on: prev.absent_on + curr.absent_on,
          absent_off: prev.absent_off + curr.absent_off,
        });
      } else {
        // also clone curr to avoid storing readonly objects
        acc.set(key, { ...curr });
      }

      return acc;
    }, new Map<number, any>());

    return Array.from(map.values());
  }, [attendance]);

  return (
    <Flex vertical gap={6} className="progress-card attendance-by-subject">
      {Array.from(attendanceBySubject || ([] as any[]))?.map(
        (subject, index) => {
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
              key={subject?.subject?.id}
            >
              <Flex align="center" gap={8}>
                <Button
                  shape="circle"
                  style={{ border: '1px solid #acacac4b', cursor: 'auto' }}
                >
                  <Image src={defaultIcon?.icon} width={14} preview={false} />
                </Button>
                <Typography.Text style={{ color: defaultIcon?.primaryColor }}>
                  {toFirstCapitalLetter(subject?.subject?.name)}
                </Typography.Text>
              </Flex>
              <Flex className="dashboard__details-list">
                {!!subject?.absent_off && (
                  <Typography.Text className="absent-off-text">
                    {`${toFirstCapitalLetter(t('const.not_explicable'))}: ${subject?.absent_off} ${t('const.hours_plural')}`}
                  </Typography.Text>
                )}
                {!!subject?.absent_on && (
                  <Typography.Text className="absent-on-text">
                    {`${toFirstCapitalLetter(t('const.explicable'))}: ${subject?.absent_on} ${t('const.hours_plural')}`}
                  </Typography.Text>
                )}
              </Flex>
            </Flex>
          );
        }
      )}
    </Flex>
  );
};

export default SubjectAttendance;
