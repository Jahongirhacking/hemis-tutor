import makeExamTable from '@/components/ExamTable/makeExamTable';
import { useMemo } from 'react';

const ExamTable = () => {
  const ExamTableComponent = useMemo(() => {
    return makeExamTable();
  }, []);

  return (
    <ExamTableComponent getExams={() => {}} exams={[]} isLoading={false} />
  );
};

export default ExamTable;
