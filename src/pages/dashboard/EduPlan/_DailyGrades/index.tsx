import CustomCollapse from '@/components/CustomCollapse';
import ScheduleWithMark from '@/components/Schedule/ScheduleWithMark';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { RootState } from '@/store/store';
import { truncateString } from '@/utils/stringFunc';
import { InfoCircleFilled } from '@ant-design/icons';
import { Flex, Skeleton, Tooltip, Typography } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EduPlanContext } from '../EduPlan';

const DailyGrades = () => {
  const { sortedSemesterSubjects, isSemestersLoading, isSubjectsLoading } =
    useContext(EduPlanContext);
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice.currentSemester
  );
  const { t } = useTranslation();
  const isMobile = useSelector((store: RootState) => store.authSlice.isMobile);

  if (isSemestersLoading || isSubjectsLoading) <Skeleton active />;

  const currentSemesterSubjects = sortedSemesterSubjects?.find(
    semesterSubject => semesterSubject?.code === currentSemester?.code
  );
  if (
    !currentSemesterSubjects ||
    currentSemesterSubjects?.subjects?.length === 0
  )
    return (
      <NotFoundAnimation.Card
        description={`${t('const.info')} ${t('const.not_found')}`}
      />
    );

  return (
    <Flex vertical gap={8} className="daily-grades">
      {currentSemesterSubjects?.subjects?.map(subject => {
        const gradesSum = subject?.grades?.reduce(
          (acc, curr) => acc + curr?.grade,
          0
        );

        return (
          <CustomCollapse
            key={subject.id}
            items={[
              {
                key: 1,
                label: (
                  <Flex wrap align="center" gap={8} justify="space-between">
                    <Typography.Title
                      level={5}
                      style={{
                        marginBottom: 0,
                        maxWidth: '100%',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {truncateString(
                        subject.curriculumSubject?.subject?.name,
                        isMobile ? 30 : 100
                      )}
                    </Typography.Title>
                    <Flex gap={8}>
                      <Typography.Text
                        strong
                        style={{
                          color: gradesSum === 0 ? '#eb2f96' : '#3ca310',
                        }}
                      >
                        {subject?.grades?.length === 0
                          ? 0
                          : (gradesSum / subject?.grades?.length).toFixed(1)}
                      </Typography.Text>
                      <Tooltip
                        title={`${t('const.average_daily_grade')}: `.concat(
                          gradesSum === 0
                            ? '0'
                            : `(${subject?.grades?.map(schedule => schedule?.grade)?.join(' + ')}) / ${subject?.grades?.length} = ${(gradesSum / subject?.grades?.length).toFixed(1)}. ${t('dashboard.eduplan.daily_average_grade_warning')}`
                        )}
                        trigger={['click']}
                      >
                        <InfoCircleFilled
                          style={{ color: '#1677ff' }}
                          onClick={e => e.stopPropagation()}
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>
                ),
                children: (
                  <Flex gap={10} wrap justify="center">
                    {subject?.grades && subject?.grades?.length > 0 ? (
                      <>
                        {subject?.grades?.map(schedule => (
                          <ScheduleWithMark
                            key={schedule?.id}
                            trainingType={schedule?.trainingType?.name}
                            employee={schedule?.employee?.name}
                            lessonDate={schedule?.lesson_date}
                            lessonPair={schedule?.lessonPair}
                            grade={schedule?.grade}
                          />
                        ))}
                      </>
                    ) : (
                      <NotFoundAnimation.Card
                        description={`${t('const.daily_grades')} ${t('const.not_found')}`}
                      />
                    )}
                  </Flex>
                ),
              },
            ]}
          />
        );
      })}
    </Flex>
  );
};

export default DailyGrades;
