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

const LessonsBySubjectChart = ({ data }: { data: any[] }) => {
  const transformed = data
    .reduce(
      (acc, curr) => {
        const subjectId = curr?.subject?.id;

        // 🔹 calculate duration from start/end
        const start = moment(curr?.lessonPair?.start_time, 'HH:mm');
        const end = moment(curr?.lessonPair?.end_time, 'HH:mm');
        const duration = end.diff(start, 'minute') / 60;

        const existing = acc.find(d => d?.id === subjectId);
        if (existing) {
          existing.hours += duration;
        } else {
          acc.push({
            id: subjectId,
            subject: curr?.subject?.name,
            hours: duration,
          });
        }
        return acc;
      },
      [] as { id: number; subject: string; hours: number }[]
    )
    // 🔹 round to 2 decimals
    .map(d => ({ ...d, hours: Number.parseFloat(d?.hours?.toFixed(2)) }));

  return (
    // 🔹 outer scroll container
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer
        width="100%"
        height={transformed.length * 80} // each row ≈ 50px
      >
        <BarChart data={transformed} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="subject"
            type="category"
            width={200}
            interval={0} // 🔹 show all subject labels
          />
          <Tooltip
            formatter={value => [
              `${Number(value).toFixed(1)} soat`,
              'Jami soat',
            ]}
          />
          <Legend />
          <Bar dataKey="hours" fill="#52c41a" name="Jami soat" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LessonsBySubjectChart;
