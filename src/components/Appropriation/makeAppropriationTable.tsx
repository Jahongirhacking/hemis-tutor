import { ISemesterWithSubjects } from '@/pages/dashboard/EduPlan/EduPlan';
import { ISubjectList } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { formatUnixTimestampToDate } from '@/utils/dateFunc';
import { getExamMark } from '@/utils/markFunc';
import { Button, Flex, Spin, Table, TableColumnsType, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CustomCollapse from '../CustomCollapse';
import EduPlanCollapseSkeleton from '../Skeletons/EduPlanCollapseSkeleton';
import GenerateSkeleton from '../Skeletons/GenerateSkeleton';
import NotFoundAnimation from '../SpecialComponents/NotFoundAnimation';

const makeAppropriationTable = () => {
  return ({
    sortedSemesterSubjects,
    isSemestersLoading,
    isSubjectsLoading,
  }: {
    sortedSemesterSubjects: ISemesterWithSubjects[];
    isSemestersLoading: boolean;
    isSubjectsLoading: boolean;
  }) => {
    const FINAL_EXAM_CODE = '13';
    const OVERALL_EXAM_CODE = '14';
    const CURRENT_EXAM_CODES = ['11', '15', '16'];
    const MIDTERM_EXAM_CODES = ['12', '17', '18'];
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
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

    const handleClickOverall = (subject: ISubjectList) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(SearchParams.Drawer, DrawerChildTypes.Appropriation);
      setSearchParams(newParams);
      dispatch(
        setDrawer({
          title: t('const.close'),
          props: { subject },
        })
      );
    };

    if (isSemestersLoading) return <Spin />;

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
                title: t('const.current_exam') as string,
                key: 'current',
                dataIndex: 'current',
                render: (_, record: ISubjectList) => (
                  <Flex gap={5} wrap>
                    {record?.gradesByExam
                      .filter(exam =>
                        CURRENT_EXAM_CODES.includes(exam.examType.code)
                      )
                      .map(exam =>
                        getExamMark(
                          exam,
                          record?.curriculumSubject?.subject?.name
                        )
                      )}
                  </Flex>
                ),
                className: 'appropriation-current-column',
              },
              {
                title: t('const.midterm_exam') as string,
                key: 'midterm',
                dataIndex: 'midterm',
                render: (_, record: ISubjectList) => (
                  <Flex gap={5} wrap>
                    {record?.gradesByExam
                      .filter(exam =>
                        MIDTERM_EXAM_CODES.includes(exam.examType.code)
                      )
                      .map(exam =>
                        getExamMark(
                          exam,
                          record?.curriculumSubject?.subject?.name
                        )
                      )}
                  </Flex>
                ),
                className: 'appropriation-midterm-column',
              },
              {
                title: t('const.final_exam') as string,
                key: 'final',
                dataIndex: 'final',
                render: (_, record: ISubjectList) =>
                  getExamMark(
                    record?.gradesByExam.find(
                      exam => exam.examType.code === FINAL_EXAM_CODE
                    ),
                    record?.curriculumSubject?.subject?.name
                  ),
                className: 'appropriation-final-column',
              },
              {
                title: t('const.overall') as string,
                key: 'overall',
                dataIndex: 'overall',
                render: (_, record: ISubjectList) => (
                  <Button
                    onClick={() => handleClickOverall(record)}
                    className="overall-grade"
                    type="primary"
                    style={{
                      padding: '0px 7px',
                      margin: 0,
                      height: 'auto',
                    }}
                  >
                    {`${
                      record?.gradesByExam.find(
                        exam => exam.examType.code === OVERALL_EXAM_CODE
                      )?.grade || 0
                    } / ${
                      record?.gradesByExam.find(
                        exam => exam.examType.code === OVERALL_EXAM_CODE
                      )?.max_ball || 0
                    }`}
                  </Button>
                ),
                className: 'appropriation-overall-column',
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
};

export default makeAppropriationTable;
