import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton, Tag, Typography } from 'antd';
import { BarChartHorizontalBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  const { t } = useTranslation();

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
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              <Cell
                key={0}
                fill={'#ffc03aff'}
              />
              <Cell
                key={1}
                fill={'#ff5420ff'}
              />
              <Cell
                key={2}
                fill={'#e91b00ff'}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      <Flex vertical gap={16} style={{ marginTop: '16px' }}>
        <Typography.Text strong style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
          Eng ko'p dars qoldirganlar (TOP 10)
        </Typography.Text>
        {isFetching ? (
          <GenerateSkeleton vertical numberOfRepetition={2}>
            <Skeleton.Input active className="!w-full" />
          </GenerateSkeleton>
        ) : (
          <Flex vertical gap={16} className='overflow-y-auto !max-h-[200px] pr-2 scrollbar-thin' style={{ scrollbarColor: '#14b8a571 transparent' }}>
            {data?.result?.absenteeism?.top_10_absentees
              ?.slice(0, 10)
              ?.map((student, index) => (
                <Flex key={index} justify="space-between" align="center" wrap>
                  <Typography.Text
                    style={{
                      color: isDark ? '#fff' : '#666',
                      fontSize: '13px',
                    }}
                  >
                    {student?.full_name}
                  </Typography.Text>
                  <Tag color="red">{(student?.absent_count || 0) * 2} {t('const.hours_plural')}</Tag>
                </Flex>
              ))}
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default TopAbsentCard;
