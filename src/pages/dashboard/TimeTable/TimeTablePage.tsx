import makeTimeTable from '@/components/TimeTable/makeTimeTable';
import { useGetScheduleListMutation } from '@/services/dashboard';
import { useMemo } from 'react';

export const TimeTablePage = () => {
  const [getSchedulesTrigger, { data: list, isLoading }] =
    useGetScheduleListMutation();

  const TimeTableComponent = useMemo(() => {
    return makeTimeTable({
      pixelsForOneCellHeight: 90,
      hasTitle: true,
      optionName: 'time-table-option',
    });
  }, []);

  return (
    <TimeTableComponent
      getSchedules={getSchedulesTrigger}
      schedules={list?.data}
      isLoading={isLoading}
    />
  );
};
