import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { PieChartFilled } from '@ant-design/icons';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const EducationFormCard = ({
  isDark,
  PRIMARY,
  COLORS,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.EDUCATION_FORM_STATISTICS]?.join(',')}`,
  });

  // Education form data for chart
  const educationFormData =
    data?.result?.education_form_statistics?.map(item => ({
      name: item.education_form_name,
      value: item.count,
      percent: item.percent,
    })) ?? [];

  return (
    <Card
      {...props}
      className={`w-full h-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Ta'lim shakli
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
          className="!m-auto !w-full !h-[140px] !overflow-hidden"
        >
          <PieChartFilled style={{ fontSize: 100, color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={educationFormData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: any) => `${entry.percent.toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {educationFormData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
      <Flex vertical gap={8} style={{ marginTop: '16px' }}>
        {isFetching ? (
          <GenerateSkeleton vertical numberOfRepetition={2}>
            <Skeleton.Input className="!w-full" active />
          </GenerateSkeleton>
        ) : (
          <>
            {educationFormData?.map((item, index) => (
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
                    style={{
                      color: isDark ? '#fff' : '#1a1a1a',
                      fontSize: '13px',
                    }}
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

export default EducationFormCard;
