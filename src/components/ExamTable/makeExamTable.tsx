import { IExamList } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { areTimestampsInSameDay } from '@/utils/dateFunc';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ExamTable from '.';
import ExamTableSkeleton from '../Skeletons/ExamTableSkeleton';
import GenerateSkeleton from '../Skeletons/GenerateSkeleton';
import NotFoundAnimation from '../SpecialComponents/NotFoundAnimation';

const makeExamTable = () => {
  return ({
    getExams,
    exams,
    isLoading,
  }: {
    getExams: (arg: { semester: string }) => void;
    exams: IExamList[];
    isLoading: boolean;
  }) => {
    const currentSemester = useSelector(
      (store: RootState) => store.authSlice?.currentSemester
    );
    const { t } = useTranslation();

    useEffect(() => {
      if (currentSemester) {
        getExams({
          semester: currentSemester?.code,
        });
      }
    }, [getExams, currentSemester]);

    const sortedExams: IExamList[][] = exams
      ? [
          ...[...exams]
            .sort((exam1, exam2) => exam1?.examDate - exam2?.examDate)
            .reduce((acc: IExamList[][], curr: IExamList) => {
              if (!acc.length) {
                acc.push([curr]);
              } else {
                if (
                  areTimestampsInSameDay(
                    acc[acc.length - 1][0].examDate,
                    curr.examDate
                  )
                ) {
                  acc[acc.length - 1].push(curr);
                } else {
                  acc.push([curr]);
                }
              }
              return acc;
            }, []),
        ]
      : [];

    if (isLoading)
      return (
        <GenerateSkeleton>
          <ExamTableSkeleton
            items={[['completed', 'processing'], ['future']]}
          />
        </GenerateSkeleton>
      );
    if (!sortedExams?.length)
      return (
        <NotFoundAnimation.Card
          description={`${t('const.control_data')} ${t('const.not_found')}`}
        />
      );

    return (
      <Flex vertical gap={16}>
        {sortedExams?.map((item, index) => (
          <ExamTable data={item} key={index} />
        ))}
      </Flex>
    );
  };
};

export default makeExamTable;
