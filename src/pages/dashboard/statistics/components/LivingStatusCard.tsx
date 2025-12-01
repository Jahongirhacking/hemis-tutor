import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Progress, Skeleton, Typography } from 'antd';
import { STATUS_COLORS } from './GeoLocationMapCard';
import { ExpandItem, IStatisticsCardProps } from './interface';

const LivingStatusCard = ({ isDark, PRIMARY, ...props }: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.LIVING_STATUS_STATISTICS}`,
  });

  return (
    <Card
      {...props}
      className={`w-full h-full`}
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
      <Flex vertical gap={12}>
        {isFetching ? (
          <GenerateSkeleton vertical numberOfRepetition={3}>
            <Skeleton.Input active className="!w-full" />
          </GenerateSkeleton>
        ) : (
          <>
            {data?.result?.living_status_statistics?.map((stat, index) => (
              <Flex key={index} justify="space-between" align="center" wrap>
                <Typography.Text
                  style={{ color: STATUS_COLORS?.[stat?.living_status_code] }}
                >
                  {stat.living_status_name}
                </Typography.Text>
                <Flex align="center" gap={12}>
                  <Progress
                    percent={stat.percent}
                    strokeColor={STATUS_COLORS?.[stat?.living_status_code]}
                    trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                    style={{ width: '100px' }}
                    size="small"
                    showInfo={false}
                  />
                  <Typography.Text
                    strong
                    style={{
                      color: STATUS_COLORS?.[stat?.living_status_code],
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
    </Card>
  );
};

export default LivingStatusCard;
