import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Skeleton, Typography } from 'antd';
import { BarChart3 } from 'lucide-react';
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

const CourseCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.COURSE_STATISTICS}`,
  });

  // Course statistics for chart
  const courseData =
    data?.result?.course_statistics?.map(item => ({
      name: item.course_name,
      value: item.count,
      percent: item.percent,
    })) ?? [];

  return (
    <Card
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Kurslar bo'yicha
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
        height: '100%',
      }}
    >
      {isFetching ? (
        <Skeleton.Node
          active
          className="!m-auto !w-full !h-[180px] !overflow-hidden"
        >
          <BarChart3 size={100} style={{ color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={courseData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#ffffff20' : '#00000010'}
            />
            <XAxis
              dataKey="name"
              stroke={isDark ? '#fff' : '#666'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={isDark ? '#fff' : '#666'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill={PRIMARY} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default CourseCard;
