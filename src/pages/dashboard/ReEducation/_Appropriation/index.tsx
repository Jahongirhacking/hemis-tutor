import makeAppropriationTable from '@/components/Appropriation/makeAppropriationTable';
import { useMemo } from 'react';

const Appropriation = () => {
  const AppropriationComponent = useMemo(() => {
    return makeAppropriationTable();
  }, []);

  return (
    <AppropriationComponent
      sortedSemesterSubjects={[]}
      isSemestersLoading={false}
      isSubjectsLoading={false}
    />
  );
};

export default Appropriation;
