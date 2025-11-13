import CustomCollapse from '@/components/CustomCollapse';
import EduPlanCollapseSkeleton from '@/components/Skeletons/EduPlanCollapseSkeleton';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { ISubjectList } from '@/services/dashboard/type';
import { formatUnixTimestampToDate } from '@/utils/dateFunc';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex, Table, TableColumnsType, Typography } from 'antd';
import moment from 'moment';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { EduPlanContext } from '../EduPlan';

const Grades = () => {
  const { sortedSemesterSubjects, isSemestersLoading, isSubjectsLoading } =
    useContext(EduPlanContext);
  const { t } = useTranslation();

  if (isSemestersLoading || isSubjectsLoading)
    return (
      <GenerateSkeleton numberOfRepetition={4}>
        <EduPlanCollapseSkeleton />
      </GenerateSkeleton>
    );
  if (!sortedSemesterSubjects || !sortedSemesterSubjects.length)
    return (
      <NotFoundAnimation.Card
        description={`${t('const.subject_info')} ${t('const.not_found')}`}
      />
    );

  return (
    <Flex vertical className="eduplan__subjects" gap={8}>
      {[...sortedSemesterSubjects]
        ?.sort((a, b) => Number.parseInt(b?.code) - Number.parseInt(a?.code))
        ?.map(semester => {
          const columns: TableColumnsType<any> = [
            {
              title: t('const.subjects') as string,
              key: 'subjectName',
              dataIndex: 'subjectName',
              render: (_, record: ISubjectList) =>
                record?.curriculumSubject?.subject?.name,
              sorter: (a: ISubjectList, b: ISubjectList) => {
                return a.curriculumSubject.subject.name.localeCompare(
                  b.curriculumSubject.subject.name
                );
              },
              showSorterTooltip: {
                title: t('components.sorting.subject_name'),
              },
            },
            {
              title: t('const.subject_type') as string,
              key: 'subjectType',
              dataIndex: 'subjectType',
              render: (_, record: ISubjectList) =>
                record?.curriculumSubject?.subjectType?.name,
              className: 'grades-type-column',
            },
            {
              title: t('const.acload') as string,
              key: 'acload',
              dataIndex: 'acload',
              render: (_, record: ISubjectList) =>
                `${record.curriculumSubject?.total_acload} ${t('const.hours_plural')}`,
              className: 'grades-acload-column',
            },
            {
              title: toFirstCapitalLetter(t('const.credit_plural')),
              key: 'credit',
              dataIndex: 'credit',
              render: (_, record: ISubjectList) =>
                record?.curriculumSubject?.credit.toFixed(1),
              className: 'grades-credit-column',
            },
            {
              title: t('const.rating_score') as string,
              key: 'rating',
              dataIndex: 'rating',
              render: (_, record: ISubjectList) => (
                <Typography.Text strong>
                  {record?.overallScore?.label ?? t('const.not_calculated')}
                </Typography.Text>
              ),
            },
            {
              title: t('const.mark') as string,
              key: 'mark',
              dataIndex: 'mark',
              render: (_, record: ISubjectList) =>
                getExamMark(
                  record?.overallScore,
                  record?.curriculumSubject?.subject?.name
                ),
              className: 'grades-mark-column',
            },
          ];

          return (
            <CustomCollapse
              key={semester.code}
              items={[
                {
                  key: semester.code,
                  label: (
                    <Flex wrap align="center" gap={4}>
                      <Typography.Title level={4} style={{ marginBottom: 0 }}>
                        {semester.name}
                      </Typography.Title>
                      <Typography.Text>
                        {semester?.weeks?.length > 0 &&
                          `
                (${formatUnixTimestampToDate(semester?.weeks[0]?.start_date, '-', 'short')}, ${moment.unix(semester?.weeks[0]?.start_date).year()} > 
                          ${formatUnixTimestampToDate(semester?.weeks[semester.weeks.length - 1]?.end_date, '-', 'short')}, ${moment.unix(semester?.weeks[semester.weeks.length - 1]?.end_date).year()})
                          `}
                      </Typography.Text>
                    </Flex>
                  ),
                  children: (
                    <Table
                      key={semester.code}
                      columns={columns}
                      dataSource={semester.subjects}
                      rowKey={record => `${record.id}-${Math.random()}`}
                      pagination={false}
                    />
                  ),
                },
              ]}
            />
          );
        })}
    </Flex>
  );
};

export default Grades;
