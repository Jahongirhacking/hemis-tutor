import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const SubjectAttendanceChart = ({ data }: { data: any[] }) => {
  const transformed = data.reduce(
    (acc, item) => {
      const subjectName = item.subject?.name ?? "Noma'lum";

      const existing = acc.find(d => d.subject === subjectName);
      if (existing) {
        existing.absent_on += item.absent_on;
        existing.absent_off += item.absent_off;
      } else {
        acc.push({
          subject: subjectName,
          absent_on: item.absent_on,
          absent_off: item.absent_off,
        });
      }
      return acc;
    },
    [] as { subject: string; absent_on: number; absent_off: number }[]
  );

  return (
    // 🔹 scrollable container
    <div style={{ width: '100%', height: 400, overflowY: 'auto' }}>
      <ResponsiveContainer
        width="100%"
        height={transformed.length * 50} // each bar ~50px tall
      >
        <BarChart data={transformed} layout="vertical">
          <XAxis type="number" />
          <YAxis
            width={150}
            type="category"
            dataKey="subject"
            interval={0} // show all labels
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'absent_on') return [`${value}`, 'Sababli qoldi'];
              if (name === 'absent_off') return [`${value}`, 'Sababsiz qoldi'];
              return [value, name];
            }}
          />
          <Legend
            formatter={value =>
              value === 'absent_on'
                ? 'Sababli qoldi'
                : value === 'absent_off'
                  ? 'Sababsiz qoldi'
                  : value
            }
          />
          <Bar dataKey="absent_off" stackId="a" fill="#eb2f96bf" />
          <Bar dataKey="absent_on" stackId="a" fill="#52c41abf" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectAttendanceChart;
