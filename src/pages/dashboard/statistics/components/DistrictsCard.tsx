import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Progress, Skeleton, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { ExpandItem, IStatisticsCardProps } from './interface';

const DistrictsCard = ({ isDark, PRIMARY }: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.DISTRICT_STATISTICS}`,
  });

  return (
    <Card
      className="w-full"
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
      <Flex vertical gap={12} style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {isFetching ? (
          <GenerateSkeleton vertical numberOfRepetition={3}>
            <Skeleton.Input className="!w-full" active />
          </GenerateSkeleton>
        ) : (
          <>
            {data?.result?.district_statistics
              ?.slice(0, 10)
              ?.map((stat, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a', flex: 1 }}
                  >
                    {stat.district_name}
                  </Typography.Text>
                  <Flex align="center" gap={12}>
                    <Progress
                      percent={stat.percent}
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
    </Card>
  );
};

export default DistrictsCard;
