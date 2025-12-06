import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const SemesterAttendanceChart = ({ data }: { data: any[] }) => {
  const transformed = [...data]
    ?.sort(
      (a, b) =>
        Number.parseInt(a?.semester?.code) - Number.parseInt(b?.semester?.code)
    )
    .reduce((acc, item) => {
      const semesterName = item.semester?.name ?? "Noma'lum";

      const existing = acc.find(d => d.semester === semesterName);
      if (existing) {
        existing.absent_on += item.absent_on;
        existing.absent_off += item.absent_off;
      } else {
        acc.push({
          semester: semesterName,
          absent_on: item.absent_on,
          absent_off: item.absent_off,
        });
      }
      return acc;
    }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transformed}>
        <XAxis dataKey="semester" />
        <YAxis />
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
  );
};

export default SemesterAttendanceChart;
