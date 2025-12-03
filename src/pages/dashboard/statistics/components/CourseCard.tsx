import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { t } from 'i18next';
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
  COLORS,
  ...props
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

  if (data && !data?.result?.course_statistics) return null;

  return (
    <Card
      {...props}
      className={`w-full h-full`}
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
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, value } = payload?.[0]?.payload;
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
                      {name}:{' '}
                      <span style={{ color: PRIMARY }}>
                        {t('const.number_count', { number: value })}
                      </span>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" fill={PRIMARY} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <Flex vertical gap={12} style={{ marginTop: '16px' }}>
        {isFetching ? (
          <Skeleton.Input active className="!w-full" />
        ) : (
          <>
            {courseData?.map((item, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Flex gap={8} align="center">
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: COLORS[index % COLORS.length],
                    }}
                  />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    {item.name}
                  </Typography.Text>
                </Flex>
                <Typography.Text strong style={{ color: PRIMARY }}>
                  {item.value}
                </Typography.Text>
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </Card>
  );
};

export default CourseCard;
