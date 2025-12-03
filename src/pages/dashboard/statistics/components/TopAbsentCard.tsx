import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { toFirstLowerLetter } from '@/utils/stringFunc';
import { Card, Skeleton, Typography } from 'antd';
import { BarChartHorizontalBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const TopAbsentCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.ABSENTEEISM]?.join(',')}`,
  });
  const { t } = useTranslation();

  // Absenteeism data
  const absenteeismData = [
    {
      range: '24%+',
      count: data?.result?.absenteeism?.range_24_plus?.count ?? 0,
      percent: data?.result?.absenteeism?.range_24_plus?.percent ?? 0,
    },
    {
      range: '48%+',
      count: data?.result?.absenteeism?.range_48_plus?.count ?? 0,
      percent: data?.result?.absenteeism?.range_48_plus?.percent ?? 0,
    },
    {
      range: '72%+',
      count: data?.result?.absenteeism?.range_72_plus?.count ?? 0,
      percent: data?.result?.absenteeism?.range_72_plus?.percent ?? 0,
    },
  ];

  return (
    <Card
      {...props}
      className={`w-full h-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Davomat ko'rsatkichi
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {isFetching ? (
        <Skeleton.Node
          active
          className="!m-auto !w-full !h-[180px] !overflow-hidden"
        >
          <BarChartHorizontalBig size={100} style={{ color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={absenteeismData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#ffffff20' : '#00000010'}
            />
            <XAxis type="number" stroke={isDark ? '#fff' : '#666'} />
            <YAxis
              dataKey="range"
              type="category"
              stroke={isDark ? '#fff' : '#666'}
              width={80}
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { range, count, percent } = payload?.[0]?.payload;
                  return (
                    <Card
                      style={{
                        background: isDark
                          ? 'rgba(15, 23, 42, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',
                        border: `1px solid ${PRIMARY}40`,
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    >
                      {`${range}`}:{' '}
                      <span style={{ color: PRIMARY }}>
                        {`${t('const.number_count', { number: count })} ${toFirstLowerLetter(t('const.student'))} (${percent}%)`}
                      </span>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              <Cell key={0} fill={'#ffc03aff'} />
              <Cell key={1} fill={'#ff5420ff'} />
              <Cell key={2} fill={'#e91b00ff'} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TopAbsentCard;
