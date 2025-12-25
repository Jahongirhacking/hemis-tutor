import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Empty, Flex, Skeleton, Typography } from 'antd';
import { BarChartBig, Home } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const TerrainsCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  ...props
}: IStatisticsCardProps) => {
  const { educationYear } = useContext(StatisticsContext);
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    education_year: educationYear,
    expand: `${ExpandItem.TERRAIN_STATISTICS}`,
  }, { skip: !educationYear });
  const { t } = useTranslation();

  // Terrain statistics
  const terrainData =
    data?.result?.terrain_statistics?.slice(0, 8).map(item => ({
      name:
        item?.terrain_name?.length > 20
          ? item?.terrain_name.substring(0, 20) + '...'
          : item.terrain_name,
      count: item.count,
      percent: item.percent,
    })) ?? [];

  if (data && !data?.result?.terrain_statistics) return null;

  const chartIcon = useMemo(
    () => <BarChartBig size={100} style={{ color: '#bfbfbf' }} />,
    []
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
            Mahallalar bo'yicha
          </Typography.Title>
          <Home size={20} style={{ color: PRIMARY }} />
        </Flex>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {isFetching || terrainData?.length ? (
        <>
          {isFetching ? (
            <Skeleton.Node
              active
              className="!m-auto !w-full !h-[180px] !overflow-hidden"
            >
              {chartIcon}
            </Skeleton.Node>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={terrainData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff20' : '#00000010'}
                />
                <XAxis
                  dataKey="name"
                  stroke={isDark ? '#fff' : '#666'}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: '11px' }}
                />
                <YAxis stroke={isDark ? '#fff' : '#666'} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={PRIMARY} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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

export default TerrainsCard;
