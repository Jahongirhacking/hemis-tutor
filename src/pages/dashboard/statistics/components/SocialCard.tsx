import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { UserCheck } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const SocialCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  COLORS,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.SOCIAL_STATISTICS]?.join(',')}`,
  });

  // Map data to pie chart format
  const socialData =
    data?.result?.social_statistics?.map(item => ({
      name: item?.category_name,
      value: item?.count,
      percent: item?.percent,
    })) ?? [];

  if (data && !data?.result?.social_statistics) return null;

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
          <UserCheck size={100} style={{ color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={socialData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                label={(entry: any) => `${entry.percent.toFixed(1)}%`}
              >
                {socialData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <Flex vertical gap={12} style={{ marginTop: '16px' }}>
            {isFetching ? (
              <Skeleton.Input active className="!w-full" />
            ) : (
              <>
                {socialData.map((item, index) => (
                  <Flex key={index} justify="space-between" align="center">
                    <Flex gap={8} align="center">
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: COLORS?.[index % COLORS.length],
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
        </>
      )}
    </Card>
  );
};

export default SocialCard;
