import DashedList from '@/components/DashedList';
import { ISubjectList } from '@/services/dashboard/type';
import { formatUnixTimestampToDate } from '@/utils/dateFunc';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Divider, Empty, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const AppropriationInDrawer = ({ subject }: { subject?: ISubjectList }) => {
  const { t } = useTranslation();

  if (!subject)
    return <Empty description={`${t('const.info')} ${t('const.not_found')}`} />;

  return (
    <Flex
      vertical
      gap={12}
      className="appropriation-in-drawer eduplan__drawer-content"
    >
      <Typography.Title level={4} style={{ margin: 0 }}>
        {subject?.curriculumSubject?.subject?.name}
      </Typography.Title>

      <DashedList
        list={[
          {
            label: `${t('const.subject_type')}:`,
            value: subject?.curriculumSubject?.subjectType?.name,
          },
          {
            label: `${toFirstCapitalLetter(t('const.credit_plural'))}:`,
            value: `${subject?.curriculumSubject?.credit} ${t('const.credit_plural')}`,
          },
          {
            label: `${t('const.acload')}:`,
            value: `${subject?.curriculumSubject?.total_acload} ${t('const.hours_plural')}`,
          },
        ]}
      />

      <Divider orientation="left" style={{ margin: 0 }}>
        <Typography.Text strong>{t('const.appropriation')}</Typography.Text>
      </Divider>
      <DashedList
        list={[
          ...subject?.gradesByExam.map(exam => ({
            label: exam?.examType?.name,
            value: getExamMark(exam, subject?.curriculumSubject?.subject?.name),
          })),
          {
            label: `${t('const.rating_score')}:`,
            value: (
              <Tag style={{ margin: 0 }} color="cyan">
                {subject?.overallScore?.label ?? t('const.not_calculated')}
              </Tag>
            ),
          },
        ]}
      />

      <Divider orientation="left" style={{ margin: 0 }}>
        <Typography.Text strong>{t('const.marks')}</Typography.Text>
      </Divider>

      <DashedList
        emptyElement={
          <Empty
            description={`${t('const.daily_grades')} ${t('const.not_found')}`}
          />
        }
        list={subject?.grades.map(sub => ({
          label: `${sub?.trainingType?.name} (${formatUnixTimestampToDate(sub?.lesson_date, '-')})`,
          value: sub?.grade.toFixed(1),
        }))}
      />
    </Flex>
  );
};

export default AppropriationInDrawer;
