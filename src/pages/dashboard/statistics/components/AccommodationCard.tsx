import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Empty, Flex, Skeleton, Typography } from 'antd';
import { PieChartIcon, UserCheck } from 'lucide-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const COLORS = [
  '#4F46E5', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#22C55E', // Green
  '#FACC15', // Yellow
  '#f147b9ff', // Red
  '#A855F7', // Purple
  '#06B6D4', // Cyan
  '#F43F5E', // Pink
  '#8B5CF6', // Violet
];

const AccommodationCard = ({
  CustomTooltip,
  isDark,
  PRIMARY,
  ...props
}: IStatisticsCardProps) => {
  const { educationYear, groupId, semester } = useContext(StatisticsContext);
  const { data, isFetching } = useGetDashboardStatisticsQuery(
    {
      education_year: educationYear,
      group_id: groupId,
      semester,
      expand: [ExpandItem.ACCOMODATION_STATISTICS].join(','),
    },
    { skip: !educationYear }
  );
  const { t } = useTranslation();

  // Map data to pie chart format
  const socialData =
    data?.result?.accommodation_statistics?.map(item => ({
      name: item?.accommodation_name,
      value: item?.count,
      percent: item?.percent,
    })) ?? [];

  if (data && !data?.result?.accommodation_statistics) return null;

  const chartIcon = <PieChartIcon size={100} style={{ color: '#bfbfbf' }} />;

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
            Turar joy statistikasi
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
      {isFetching || socialData?.length ? (
        <>
          {isFetching ? (
            <Skeleton.Node
              active
              className="!m-auto !w-full !h-[180px] !overflow-hidden"
            >
              {chartIcon}
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
                    innerRadius={40}
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
        </>
      ) : (
        <Empty
          image={chartIcon}
          description={`${t('const.info')} ${t('const.not_found')}`}
        />
      )}
    </Card>
  );
};

export default AccommodationCard;
