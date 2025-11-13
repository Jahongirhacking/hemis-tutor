import makeExamTable from '@/components/ExamTable/makeExamTable';
import { useGetExamTableListMutation } from '@/services/dashboard';
import { useMemo } from 'react';

const ControlTable = () => {
  const [getExamTableList, { data: list, isLoading }] =
    useGetExamTableListMutation();

  const ExamTableComponent = useMemo(() => {
    return makeExamTable();
  }, []);

  return (
    <ExamTableComponent
      getExams={getExamTableList}
      exams={list?.data}
      isLoading={isLoading}
    />
  );
};

export default ControlTable;
