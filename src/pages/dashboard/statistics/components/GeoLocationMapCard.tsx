import { LeafletMap } from '@/components/LeafletMap';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import {
  getLivingStatusCode,
  StudentLivingStatus,
} from '@/services/student/type';
import { Card, Flex, Spin, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const extractLatLng = (url: string) => {
  if (!url) return null;
  // 1) Try q=lat,lng
  let match = url?.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: +match[1], lng: +match[2] };
  }

  // 2) Try @lat,lng format
  match = url?.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: +match[1], lng: +match[2] };
  }

  return null;
};

// Status colors matching your design
export const STATUS_COLORS = {
  [StudentLivingStatus.GREEN]: '#10b981',
  [StudentLivingStatus.YELLOW]: '#f59e0b',
  [StudentLivingStatus.RED]: '#ef4444',
  [StudentLivingStatus.UNKNOWN]: '#cacaca',
};

const STATUS_LABELS = {
  [StudentLivingStatus.GREEN]: 'Yashil hudud',
  [StudentLivingStatus.YELLOW]: 'Sariq hudud',
  [StudentLivingStatus.RED]: 'Qizil hudud',
  [StudentLivingStatus.UNKNOWN]: 'Belgilanmagan',
};
const UzbekistanMapCard = ({
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

  // Process locations and count by status
  const { locations, statusCounts } = useMemo(() => {
    const locs = data?.result?.geo_location_statistics?.locations || [];

    // Count by status
    const counts = {
      [StudentLivingStatus.GREEN]: 0,
      [StudentLivingStatus.YELLOW]: 0,
      [StudentLivingStatus.RED]: 0,
      [StudentLivingStatus.UNKNOWN]: 0,
    };

    const tempLocs = locs?.map(loc => {
      loc?.students?.forEach(student => {
        counts[
          getLivingStatusCode(student?.living_status_name) ||
            StudentLivingStatus.UNKNOWN
        ]++;
      });

      if (!loc?.latitude || !loc?.longitude) {
        const temp = extractLatLng(loc?.geo_location);
        if (temp) {
          return {
            ...loc,
            latitude: temp?.lat,
            longitude: temp?.lng,
          };
        }
      }
      return { ...loc };
    });

    return { locations: tempLocs, statusCounts: counts };
  }, [data]);

  if (data && !data?.result?.geo_location_statistics) return null;

  return (
    <Card
      {...props}
      className={`w-full uzbekistan-map-card mb-[20px]`}
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
            locations={locations}
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
                Jami geolokatsiya
              </Typography.Text>
              <Typography.Text
                strong
                style={{ color: PRIMARY, fontSize: '18px' }}
              >
                {data?.result?.geo_location_statistics?.with_location ?? 0}
              </Typography.Text>
            </Flex>
            <Flex vertical>
              <Typography.Text
                style={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                  fontSize: '12px',
                }}
              >
                Aniq geolokatsiya
              </Typography.Text>
              <Typography.Text
                strong
                style={{ color: PRIMARY, fontSize: '18px' }}
              >
                {locations?.filter(l => l?.latitude && l?.longitude)?.length}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default UzbekistanMapCard;
