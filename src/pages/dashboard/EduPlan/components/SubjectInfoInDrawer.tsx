import DashedList from '@/components/DashedList';
import { useGetSubjectIDMutation } from '@/services/dashboard';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Empty, Flex, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SubjectInfoInDrawer = ({
  semesterCode,
  subjectId,
}: {
  semesterCode?: string;
  subjectId?: number;
}) => {
  const [getSubject, { data: subjectInfo, isLoading }] =
    useGetSubjectIDMutation();
  const { t } = useTranslation();
  const subject = subjectInfo?.data;

  useEffect(() => {
    getSubject({ semestr: semesterCode, subject: `${subjectId}` });
  }, [getSubject]);

  if (isLoading) return <Skeleton active />;
  if (!subject)
    return (
      <Empty description={`${t('const.subject')} ${t('const.not_found')}`} />
    );
  return (
    <Flex
      vertical
      className="subject-info-in-drawer eduplan__drawer-content"
      gap={12}
    >
      <Typography.Title level={4} style={{ margin: 0 }}>
        {subject.subject.name}
      </Typography.Title>
      <DashedList
        className="drawer__dashed-list"
        list={[
          {
            label: `${t('const.subject_type')}:`,
            value: subject?.subjectType?.name,
          },
          {
            label: `${t('components.task.task_in_drawer.max_score_text')}:`,
            value: `${subject?.max_ball ?? 5} ${t('const.score')}`,
          },
          {
            label: `${t('const.acload')}:`,
            value: `${subject?.total_acload} ${t('const.hours_plural')}`,
          },
          {
            label: `${t('const.number_of', { name: t('const.pairs_left') })}:`,
            value: t('const.number_count', { number: subject?.absent_count }),
          },
          {
            label: `${toFirstCapitalLetter(t('const.credit_plural'))}:`,
            value: `${subject?.credit} ${t('const.credit_plural')}`,
          },
          {
            label: `${t('const.number_of', { name: t('const.resources') })}:`,
            value: t('const.number_count', {
              number: subject?.resources_count,
            }),
          },
          {
            label: `${t('const.number_of', { name: t('const.tasks') })}:`,
            value: t('const.number_count', { number: subject?.tasks_count }),
          },
          {
            label: (
              t('dashboard.subjects_page.subject_detail.task_types', {
                returnObjects: true,
              }) as string[]
            )[2],
            value: t('const.number_count', { number: subject?.submits_count }),
          },
          {
            label: (
              t('dashboard.subjects_page.subject_detail.task_types', {
                returnObjects: true,
              }) as string[]
            )[3],
            value: t('const.number_count', { number: subject?.marked_count }),
          },
        ]}
      />
    </Flex>
  );
};

export default SubjectInfoInDrawer;
