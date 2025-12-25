import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Progress, Skeleton, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useContext } from 'react';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const GeoLocationCard = ({
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
      expand: `${ExpandItem.GEO_LOCATION_STATISTICS}`,
    },
    { skip: !educationYear }
  );

  if (data && !data?.result?.geo_location_statistics) return null;

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
            Geolokatsiya
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
      <Flex vertical gap={20}>
        <Flex gap={16}>
          <Flex vertical flex={1} align="center">
            <Typography.Text
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                marginBottom: '12px',
              }}
            >
              Geolokatsiya bilan
            </Typography.Text>
            {isFetching ? (
              <Skeleton.Button active />
            ) : (
              <>
                <Typography.Title
                  level={2}
                  style={{ margin: 0, color: PRIMARY }}
                >
                  {data?.result?.geo_location_statistics?.with_location ?? 0}
                </Typography.Title>
                <Typography.Text style={{ color: PRIMARY, fontSize: '12px' }}>
                  {(
                    data?.result?.geo_location_statistics
                      ?.with_location_percent ?? 0
                  ).toFixed(1)}
                  %
                </Typography.Text>
              </>
            )}
          </Flex>
          <Flex vertical flex={1} align="center">
            <Typography.Text
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                marginBottom: '12px',
              }}
            >
              Geolokatsiyasiz
            </Typography.Text>
            {isFetching ? (
              <Skeleton.Button active />
            ) : (
              <>
                <Typography.Title
                  level={2}
                  style={{ margin: 0, color: '#f59e0b' }}
                >
                  {data?.result?.geo_location_statistics?.without_location ?? 0}
                </Typography.Title>
                <Typography.Text style={{ color: '#f59e0b', fontSize: '12px' }}>
                  {(
                    data?.result?.geo_location_statistics
                      ?.without_location_percent ?? 0
                  ).toFixed(1)}
                  %
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
        {isFetching ? (
          <Skeleton.Input active className="!w-full !h-[10px]" />
        ) : (
          <Progress
            percent={
              data?.result?.geo_location_statistics?.with_location_percent ?? 0
            }
            strokeColor={PRIMARY}
            trailColor="#f59e0b"
          />
        )}
      </Flex>
    </Card>
  );
};

export default GeoLocationCard;
