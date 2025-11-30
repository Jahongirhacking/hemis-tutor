import { LeafletMap } from '@/components/LeafletMap';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import {
  getLivingStatusCode,
  StudentLivingStatus,
} from '@/services/student/type';
import { Card, Flex, Spin, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import { ExpandItem, IStatisticsCardProps } from './interface';

// Status colors matching your design
export const STATUS_COLORS = {
  [StudentLivingStatus.GREEN]: '#10b981',
  [StudentLivingStatus.YELLOW]: '#f59e0b',
  [StudentLivingStatus.RED]: '#ef4444',
};

const STATUS_LABELS = {
  [StudentLivingStatus.GREEN]: 'Yashil hudud',
  [StudentLivingStatus.YELLOW]: 'Sariq hudud',
  [StudentLivingStatus.RED]: 'Qizil hudud',
};

const UzbekistanMapCard = ({ isDark, PRIMARY }: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.GEO_LOCATION_STATISTICS}`,
  });

  // Process locations and count by status
  const { locations, statusCounts } = useMemo(() => {
    const locs = data?.result?.geo_location_statistics?.locations || [];

    // Count by status
    const counts = {
      [StudentLivingStatus.GREEN]: 0,
      [StudentLivingStatus.YELLOW]: 0,
      [StudentLivingStatus.RED]: 0,
    };

    locs.forEach(loc => {
      loc?.students?.forEach(student => {
        counts[getLivingStatusCode(student?.living_status_name)]++;
      });
    });

    return { locations: locs, statusCounts: counts };
  }, [data]);

  return (
    <Card
      className="w-full uzbekistan-map-card"
      title={
        <Flex justify="space-between" align="center">
          <Typography.Title
            level={4}
            style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
          >
            Xarita bo'yicha joylashuv
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
      {isFetching ? (
        <Flex
          justify="center"
          align="center"
          style={{ minHeight: '400px', position: 'relative' }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex vertical gap={16}>
          {/* Legend */}
          <Flex justify="space-between" align="center" wrap gap={12}>
            {Object.entries(STATUS_LABELS).map(([status, label]) => (
              <Flex key={status} align="center" gap={8}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: STATUS_COLORS[status as StudentLivingStatus],
                    boxShadow: `0 0 8px ${STATUS_COLORS[status as StudentLivingStatus]}80`,
                  }}
                />
                <Typography.Text
                  style={{
                    color: isDark ? '#fff' : '#1a1a1a',
                    fontSize: '13px',
                  }}
                >
                  {label}
                </Typography.Text>
                <Typography.Text
                  strong
                  style={{
                    color: PRIMARY,
                    fontSize: '14px',
                  }}
                >
                  {statusCounts[status as StudentLivingStatus] || 0}
                </Typography.Text>
              </Flex>
            ))}
          </Flex>

          {/* Map Container */}
          <LeafletMap
            locations={data?.result?.geo_location_statistics?.locations}
            onLocationSelect={() => {}}
            selectedLocation={null}
          />

          {/* Statistics Summary */}
          <Flex justify="space-between" align="center" wrap gap={12}>
            <Flex vertical>
              <Typography.Text
                style={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                  fontSize: '12px',
                }}
              >
                Jami lokatsiyalar
              </Typography.Text>
              <Typography.Text
                strong
                style={{ color: PRIMARY, fontSize: '18px' }}
              >
                {locations.length}
              </Typography.Text>
            </Flex>
            <Flex vertical>
              <Typography.Text
                style={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                  fontSize: '12px',
                }}
              >
                Geolokatsiya bilan
              </Typography.Text>
              <Typography.Text
                strong
                style={{ color: PRIMARY, fontSize: '18px' }}
              >
                {data?.result?.geo_location_statistics?.with_location ?? 0}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default UzbekistanMapCard;
