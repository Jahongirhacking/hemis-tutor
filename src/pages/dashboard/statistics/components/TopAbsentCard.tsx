import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Tag, Typography } from 'antd';
import { BarChartHorizontalBig } from 'lucide-react';
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

const TopAbsentCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.ABSENTEEISM]?.join(',')}`,
  });

  // Absenteeism data
  const absenteeismData = [
    {
      range: '30-36%',
      count: data?.result?.absenteeism?.range_30_36?.count ?? 0,
      percent: data?.result?.absenteeism?.range_30_36?.percent ?? 0,
    },
    {
      range: '40-70%',
      count: data?.result?.absenteeism?.range_40_70?.count ?? 0,
      percent: data?.result?.absenteeism?.range_40_70?.percent ?? 0,
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
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
      <Flex vertical gap={8} style={{ marginTop: '16px' }}>
        <Typography.Text strong style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
          Eng ko'p dars qoldirganlar (TOP 10)
        </Typography.Text>
        {isFetching ? (
          <GenerateSkeleton vertical numberOfRepetition={2}>
            <Skeleton.Input active className="!w-full" />
          </GenerateSkeleton>
        ) : (
          <>
            {data?.result?.absenteeism?.top_10_absentees
              ?.slice(0, 5)
              ?.map((student, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Typography.Text
                    style={{
                      color: isDark ? '#fff' : '#666',
                      fontSize: '13px',
                    }}
                  >
                    {student.full_name}
                  </Typography.Text>
                  <Tag color="orange">{student.absent_count} dars</Tag>
                </Flex>
              ))}
          </>
        )}
      </Flex>
    </Card>
  );
};

export default TopAbsentCard;
