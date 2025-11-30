import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { BarChart4, UserCheck } from 'lucide-react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const SocialCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.SOCIAL_STATISTICS]?.join(',')}`,
  });

  // Social statistics radar chart
  const socialRadarData =
    data?.result?.social_statistics?.map(item => ({
      category:
        item.category_name.length > 15
          ? item.category_name.substring(0, 15) + '...'
          : item.category_name,
      value: item.count,
    })) ?? [];

  return (
    <Card
      className="w-full"
      title={
        <Flex justify="space-between" align="center">
          <Typography.Title
            level={4}
            style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
          >
            Ijtimoiy toifalar
          </Typography.Title>
          <UserCheck size={20} style={{ color: PRIMARY }} />
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
          <BarChart4 size={100} style={{ color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={socialRadarData}>
            <PolarGrid stroke={isDark ? '#ffffff30' : '#00000020'} />
            <PolarAngleAxis
              dataKey="category"
              stroke={isDark ? '#fff' : '#666'}
              style={{ fontSize: '11px' }}
            />
            <PolarRadiusAxis stroke={isDark ? '#fff' : '#666'} />
            <Radar
              name="Talabalar"
              dataKey="value"
              stroke={PRIMARY}
              fill={PRIMARY}
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default SocialCard;
