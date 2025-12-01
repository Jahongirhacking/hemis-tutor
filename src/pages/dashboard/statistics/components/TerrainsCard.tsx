import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { BarChartBig, Home } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const TerrainsCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.TERRAIN_STATISTICS}`,
  });

  // Terrain statistics
  const terrainData =
    data?.result?.terrain_statistics?.slice(0, 8).map(item => ({
      name:
        item?.terrain_name?.length > 20
          ? item?.terrain_name.substring(0, 20) + '...'
          : item.terrain_name,
      count: item.count,
      percent: item.percent,
    })) ?? [];

  return (
    <Card
      {...props}
      className={`w-full h-full`}
      title={
        <Flex justify="space-between" align="center">
          <Typography.Title
            level={4}
            style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
          >
            Mahallalar bo'yicha
          </Typography.Title>
          <Home size={20} style={{ color: PRIMARY }} />
        </Flex>
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
          <BarChartBig size={100} style={{ color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={terrainData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#ffffff20' : '#00000010'}
            />
            <XAxis
              dataKey="name"
              stroke={isDark ? '#fff' : '#666'}
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: '11px' }}
            />
            <YAxis stroke={isDark ? '#fff' : '#666'} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill={PRIMARY} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TerrainsCard;
