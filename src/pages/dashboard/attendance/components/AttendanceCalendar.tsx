import { IAttendance } from '@/services/student/type';
import { Calendar, CalendarProps } from 'antd';
import { Dayjs } from 'dayjs';

const AttendanceCalendar = ({
  attendance,
}: {
  attendance: [IAttendance[]];
}) => {
  console.log(attendance);

  const monthCellRender = (value: Dayjs) => {
    console.log(value);
    return null;
  };

  const dateCellRender = (value: Dayjs) => {
    console.log(value);
    return null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    if (info.type === 'month') {
      return monthCellRender(current);
    }
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default AttendanceCalendar;
