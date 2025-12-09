import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { PieChartOutlined } from '@ant-design/icons';
import { Card, Empty, Flex, Skeleton, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const GenderCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { educationYear, groupId, semester } = useContext(StatisticsContext);
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    education_year: educationYear,
    group_id: groupId,
    semester,
    expand: `${ExpandItem.GENDER_STATISTICS}`,
  });
  const { t } = useTranslation();

  // Gender distribution
  const genderData = [
    {
      name: 'Erkak',
      value: data?.result?.gender_statistics?.male_count ?? 0,
      percent: data?.result?.gender_statistics?.male_percent ?? 0,
    },
    {
      name: 'Ayol',
      value: data?.result?.gender_statistics?.female_count ?? 0,
      percent: data?.result?.gender_statistics?.female_percent ?? 0,
    },
  ];

  if (data && !data?.result?.gender_statistics) return null;

  const chartIcon = useMemo(
    () => <PieChartOutlined style={{ fontSize: 100, color: '#bfbfbf' }} />,
    []
  );

  return (
    <Card
      {...props}
      className={`w-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Jins bo'yicha
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {isFetching || genderData?.find(d => !!d?.value) ? (
        <>
          {isFetching ? (
            <Skeleton.Node
              active
              className="!m-auto !w-full !h-[140px] !overflow-hidden"
            >
              {chartIcon}
            </Skeleton.Node>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry: any) => `${entry?.percent?.toFixed(1)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <Flex vertical gap={12} style={{ marginTop: '16px' }}>
            {isFetching ? (
              <GenerateSkeleton vertical numberOfRepetition={2}>
                <Skeleton.Input className="!w-full" active />
              </GenerateSkeleton>
            ) : (
              <>
                {genderData.map((item, index) => (
                  <Flex key={index} justify="space-between" align="center">
                    <Flex gap={8} align="center">
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: index === 0 ? '#3b82f6' : '#ec4899',
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
      ) : (
        <Empty
          image={chartIcon}
          description={`${t('const.info')} ${t('const.not_found')}`}
        />
      )}
    </Card>
  );
};

export default GenderCard;
