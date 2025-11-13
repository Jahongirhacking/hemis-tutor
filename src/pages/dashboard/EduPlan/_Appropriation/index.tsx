import makeAppropriationTable from '@/components/Appropriation/makeAppropriationTable';
import { useContext, useMemo } from 'react';
import { EduPlanContext } from '../EduPlan';

const Appropriation = () => {
  const { sortedSemesterSubjects, isSemestersLoading, isSubjectsLoading } =
    useContext(EduPlanContext);

  const AppropriationComponent = useMemo(() => {
    return makeAppropriationTable();
  }, []);

  return (
    <AppropriationComponent
      sortedSemesterSubjects={sortedSemesterSubjects}
      isSemestersLoading={isSemestersLoading}
      isSubjectsLoading={isSubjectsLoading}
    />
  );
};

export default Appropriation;
