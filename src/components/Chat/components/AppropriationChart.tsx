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
import { ISubjectScore } from './types';

export default function AppropriationChart({
  subjectScores = [],
}: {
  subjectScores: ISubjectScore[];
}) {
  return (
    // 🔹 Make a scrollable wrapper
    <div style={{ width: '100%', height: 400, overflowY: 'auto' }}>
      <ResponsiveContainer width="100%" height={subjectScores.length * 50}>
        <BarChart
          data={subjectScores}
          layout="vertical" // horizontal bars
          margin={{ left: 20, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, subjectScores?.[0]?.max || 5]} />
          <YAxis
            dataKey="subject"
            width={150}
            type="category"
            interval={0} // 🔹 show all labels
          />
          <Tooltip
            formatter={(value, name) => [
              `${value} ball`,
              name === 'score' ? 'Baho' : 'Max',
            ]}
            labelFormatter={label => `Fan: ${label}`}
          />
          <Legend formatter={value => (value === 'score' ? 'Baho' : value)} />
          <Bar dataKey="score" fill="#2bc265ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
