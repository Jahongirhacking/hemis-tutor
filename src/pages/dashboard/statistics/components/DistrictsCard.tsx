import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { PieChartFilled } from '@ant-design/icons';
import { Card, Flex, Progress, Skeleton, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const DistrictsCard = ({
  isDark,
  PRIMARY,
  COLORS,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.DISTRICT_STATISTICS}`,
  });
  const districtData = useMemo(
    () =>
      data?.result?.district_statistics?.map(stat => ({
        name: stat?.district_name,
        value: stat?.percent, // or stat.percent if you prefer
      })),
    [data]
  );

  const maxPercent = useMemo(
    () =>
      data?.result?.district_statistics?.reduce(
        (acc, curr) => Math.max(acc, curr?.percent),
        0
      ),
    [data?.result?.district_statistics]
  );

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
            Tumanlar bo'yicha
          </Typography.Title>
          <MapPin size={20} style={{ color: PRIMARY }} />
        </Flex>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      <Flex vertical gap={12}>
        {isFetching ? (
          <Skeleton.Node
            active
            className="!m-auto !w-full !h-[140px] !overflow-hidden"
          >
            <PieChartFilled style={{ fontSize: 100, color: '#bfbfbf' }} />
          </Skeleton.Node>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={districtData?.length <= 10 ? 240 : 180}
          >
            <PieChart>
              <Pie
                data={districtData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={PRIMARY}
                {...(districtData?.length <= 10
                  ? {
                      label: ({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`,
                    }
                  : {})}
              >
                {districtData?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        <Flex
          vertical
          gap={12}
          className="overflow-y-auto max-h-[250px] pr-3"
          style={{ scrollbarColor: '#14b8a571 transparent' }}
        >
          {isFetching ? (
            <GenerateSkeleton vertical numberOfRepetition={3}>
              <Skeleton.Input className="!w-full" active />
            </GenerateSkeleton>
          ) : (
            <>
              {data?.result?.district_statistics?.map((stat, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a', flex: 1 }}
                  >
                    {stat?.district_name}
                  </Typography.Text>
                  <Flex align="center" gap={12}>
                    <Progress
                      percent={(stat?.percent / (maxPercent || 100)) * 100}
                      strokeColor={PRIMARY}
                      trailColor={
                        isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'
                      }
                      style={{ width: '100px' }}
                      size="small"
                      showInfo={false}
                    />
                    <Typography.Text
                      strong
                      style={{
                        color: PRIMARY,
                        minWidth: '40px',
                        textAlign: 'right',
                      }}
                    >
                      {stat.count}
                    </Typography.Text>
                  </Flex>
                </Flex>
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default DistrictsCard;
