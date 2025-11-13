import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IGpaData {
  year: string;
  gpa: number;
}

export default function GpaChart({ gpaData = [] }: { gpaData: IGpaData[] }) {
  const firstGpa = gpaData[0]?.gpa || 0;
  const lastGpa = gpaData[(gpaData?.length || 1) - 1]?.gpa || 0;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={gpaData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[0, 4]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="gpa"
          stroke={
            firstGpa > lastGpa
              ? '#d80e0eff'
              : firstGpa === lastGpa
                ? '#389fffff'
                : '#1eb810ff'
          }
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
