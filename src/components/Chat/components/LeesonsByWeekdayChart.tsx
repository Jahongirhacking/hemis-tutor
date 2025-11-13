import { ISchedule } from '@/services/dashboard/type';
import moment from 'moment';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const weekDays = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

const LessonsByWeekdayChart = ({ data }: { data: ISchedule[] }) => {
  const transformed = data
    .reduce(
      (acc, curr) => {
        const dayIndex = moment.unix(curr?.lesson_date).day();
        const dayName = weekDays[dayIndex];

        const start = moment(curr?.lessonPair?.start_time, 'HH:mm');
        const end = moment(curr?.lessonPair?.end_time, 'HH:mm');
        const duration = end.diff(start, 'minute') / 60;

        const existing = acc.find(d => d.day === dayName);
        if (existing) {
          existing.hours += duration;
        } else {
          acc.push({ day: dayName, hours: duration });
        }

        return acc;
      },
      [] as { day: string; hours: number }[]
    )
    // precision qo‘yib olish
    .map(d => ({ ...d, hours: Number.parseFloat(d.hours.toFixed(2)) }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transformed}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip
          formatter={value => [`${Number(value).toFixed(2)} soat`, 'Jami soat']}
        />
        <Legend />
        <Bar dataKey="hours" fill="#1890ff" name="Jami soat" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LessonsByWeekdayChart;
