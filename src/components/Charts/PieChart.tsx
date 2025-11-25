import { useTranslation } from 'react-i18next';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieProps,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null ||
    midAngle == null
  ) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.45;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize={12}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
  data,
  colors,
}: {
  isAnimationActive?: boolean;
  data: PieProps['data'];
  colors?: string[];
}) {
  const { t } = useTranslation();
  const hasData =
    Array.isArray(data) &&
    data.length > 0 &&
    data.some((d: any) => Number(d.value) > 0);
  const private_colors = colors && colors?.length ? colors : COLORS;

  if (!hasData) {
    return (
      <div
        style={{
          width: '100%',
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: 16,
        }}
      >
        {`${t('const.info')} ${t('const.not_found')}`}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive={isAnimationActive}
          >
            {data.map((_: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={private_colors?.[index % private_colors?.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
