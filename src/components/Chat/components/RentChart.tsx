import { Building } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RentChartProps {
  data: {
    amount?: number; // eski nom (ixtiyoriy)
    monthName: string;
  }[];
  chartType?: 'bar' | 'line';
  direction?: 'horizontal' | 'vertical';
  height?: number;
}

const RentChart: React.FC<RentChartProps> = ({
  data,
  chartType = 'bar',
  direction = 'horizontal',
  height = 300,
}) => {
  const isVertical = direction === 'vertical';

  // Agar data eski formatda (amount) bo'lsa, uni summa ga map qilamiz
  const normalizedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((d, idx) => {
      const summa = typeof d.amount === 'number' ? d.amount : 0;
      return {
        ...d,
        summa,
        // agar monthName bo'lmasa, indexdan nom hosil qilamiz
        monthName: d.monthName ?? `#${idx + 1}`,
      };
    });
  }, [data]);

  // Styling obyektlari
  const containerStyle: React.CSSProperties = {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 16,
  };

  const scrollWrapperStyle: React.CSSProperties = {
    overflowX: isVertical ? 'auto' : 'visible',
  };

  const chartWrapperStyle: React.CSSProperties = {
    minWidth: isVertical ? 650 : '100%',
    height,
  };

  // Tooltip formatlovchi: recharts formatter(value, name, props)
  const tooltipFormatter = (value: any) => {
    if (value == null) return '';
    const num = Number(value) || 0;
    return `${num.toLocaleString('uz-UZ')} so'm`;
  };

  // Agar normalizedData bo'sh bo'lsa, konsolga xabar
  if (!normalizedData.length) {
    // eslint-disable-next-line no-console
    console.warn(
      "RentChart: data bo'sh yoki xato formatda — normalizedData:",
      normalizedData
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        <Building /> Oylik ijara summasi
      </h2>

      <div style={scrollWrapperStyle}>
        <div style={chartWrapperStyle}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart
                data={normalizedData}
                layout={isVertical ? 'vertical' : 'horizontal'}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {isVertical ? (
                  <>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="monthName" width={120} />
                  </>
                ) : (
                  <>
                    <XAxis dataKey="monthName" />
                    <YAxis />
                  </>
                )}
                <Tooltip formatter={tooltipFormatter} />
                <Legend />
                <Bar
                  dataKey="summa"
                  fill="#4F46E5"
                  radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            ) : (
              <LineChart
                data={normalizedData}
                layout={isVertical ? 'vertical' : 'horizontal'}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {isVertical ? (
                  <>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="monthName" width={120} />
                  </>
                ) : (
                  <>
                    <XAxis dataKey="monthName" />
                    <YAxis />
                  </>
                )}
                <Tooltip formatter={tooltipFormatter} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="summa"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RentChart;
