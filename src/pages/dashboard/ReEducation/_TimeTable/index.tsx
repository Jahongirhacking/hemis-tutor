import makeTimeTable from '@/components/TimeTable/makeTimeTable';
import { useMemo } from 'react';

const TimeTable = () => {
  const TimeTableComponent = useMemo(() => {
    return makeTimeTable({
      pixelsForOneCellHeight: 90,
      hasTitle: false,
      optionName: 'reeducation-time-table-option',
    });
  }, []);

  return (
    <TimeTableComponent
      getSchedules={() => {}}
      schedules={[]}
      isLoading={false}
    />
  );
};

export default TimeTable;
