import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Empty, Flex, Skeleton, Typography } from 'antd';
import { BarChartBig } from 'lucide-react';
import { useContext } from 'react';
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
import { StatisticsContext } from '../DashboardPage';
import { STATUS_COLORS } from './GeoLocationMapCard';
import { ExpandItem, IStatisticsCardProps } from './interface';

const LivingStatusCard = ({
  isDark,
  PRIMARY,
  CustomTooltip,
  COLORS,
  ...props
}: IStatisticsCardProps) => {
  const { educationYear, groupId, semester } = useContext(StatisticsContext);
  const { data, isFetching } = useGetDashboardStatisticsQuery(
    {
      education_year: educationYear,
      group_id: groupId,
      semester,
      expand: `${ExpandItem.LIVING_STATUS_STATISTICS}`,
    },
    { skip: !educationYear }
  );
  const { t } = useTranslation();

  if (data && !data?.result?.living_status_statistics) return null;

  const chartIcon = <BarChartBig size={100} style={{ color: '#bfbfbf' }} />;

  return (
    <Card
      {...props}
      className={`w-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Yashash holati
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {isFetching || data?.result?.living_status_statistics?.length ? (
        <>
          {isFetching ? (
            <Skeleton.Node
              active
              className="!m-auto !w-full !h-[180px] !overflow-hidden"
            >
              {chartIcon}
            </Skeleton.Node>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data?.result?.living_status_statistics}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff20' : '#00000010'}
                />
                <XAxis
                  dataKey="living_status_name"
                  stroke={isDark ? '#fff' : '#666'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  dataKey="count"
                  stroke={isDark ? '#fff' : '#666'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    const tempPayload = { ...payload?.[0] };
                    if (tempPayload) {
                      tempPayload.name =
                        tempPayload?.payload?.living_status_name;
                      tempPayload.value = tempPayload?.value;
                    }
                    return (
                      <CustomTooltip active={active} payload={[tempPayload]} />
                    );
                  }}
                />

                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {data?.result?.living_status_statistics?.map((entry, idx) => {
                    return (
                      <Cell
                        key={idx}
                        fill={STATUS_COLORS[entry?.living_status_code]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
          <Flex vertical gap={12}>
            {isFetching ? (
              <GenerateSkeleton vertical numberOfRepetition={3}>
                <Skeleton.Input active className="!w-full" />
              </GenerateSkeleton>
            ) : (
              <>
                {data?.result?.living_status_statistics?.map((stat, index) => (
                  <Flex
                    key={index}
                    justify="space-between"
                    align="center"
                    gap={12}
                    wrap
                  >
                    <Typography.Text
                      style={{
                        color: STATUS_COLORS?.[stat?.living_status_code],
                      }}
                    >
                      {stat.living_status_name}
                    </Typography.Text>
                    <Flex align="center" gap={8} className="ml-auto">
                      <Typography.Text
                        strong
                        style={{
                          color: STATUS_COLORS?.[stat?.living_status_code],
                          minWidth: '20px',
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

export default LivingStatusCard;
