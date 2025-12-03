import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Progress, Skeleton, Typography } from 'antd';
import { CheckCircle, XCircle } from 'lucide-react';
import { ExpandItem, IStatisticsCardProps } from './interface';

const PerformanceCard = ({
  isDark,
  PRIMARY,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.PERFORMANCE}`,
  });

  if (data && !data?.result?.performance) return null;

  return (
    <Card
      {...props}
      className={`w-full h-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Akademik natijalar
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      <Flex vertical gap={16}>
        <Flex justify="space-between" align="center" wrap>
          <Flex align="center" gap={8}>
            <CheckCircle size={20} className="text-green-400" />
            <Typography.Text style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
              A'lo
            </Typography.Text>
          </Flex>
          <Flex align="center" gap={12}>
            {isFetching ? (
              <Skeleton.Input active className="!w-full !h-[10px]" />
            ) : (
              <>
                <Progress
                  percent={
                    ((data?.result?.performance?.excellent_count ?? 0) /
                      (data?.result?.performance?.total_grades ?? 1)) *
                    100
                  }
                  strokeColor="#10b981"
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  style={{ width: '120px' }}
                  size="small"
                  showInfo={false}
                />
                <Typography.Text
                  strong
                  style={{ color: '#10b981', minWidth: '50px' }}
                >
                  {data?.result?.performance?.excellent_count ?? 0}
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" wrap>
          <Flex align="center" gap={8}>
            <CheckCircle size={20} className="text-blue-400" />
            <Typography.Text style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
              Yaxshi
            </Typography.Text>
          </Flex>
          <Flex align="center" gap={12}>
            {isFetching ? (
              <Skeleton.Input active className="!w-full !h-[10px]" />
            ) : (
              <>
                <Progress
                  percent={
                    ((data?.result?.performance?.good_count ?? 0) /
                      (data?.result?.performance?.total_grades ?? 1)) *
                    100
                  }
                  strokeColor="#3b82f6"
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  style={{ width: '120px' }}
                  size="small"
                  showInfo={false}
                />
                <Typography.Text
                  strong
                  style={{ color: '#3b82f6', minWidth: '50px' }}
                >
                  {data?.result?.performance?.good_count ?? 0}
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" wrap>
          <Flex align="center" gap={8}>
            <CheckCircle size={20} className="text-yellow-400" />
            <Typography.Text style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
              Qoniqarli
            </Typography.Text>
          </Flex>
          <Flex align="center" gap={12}>
            {isFetching ? (
              <Skeleton.Input active className="!w-full !h-[10px]" />
            ) : (
              <>
                <Progress
                  percent={
                    ((data?.result?.performance?.satisfactory_count ?? 0) /
                      (data?.result?.performance?.total_grades ?? 1)) *
                    100
                  }
                  strokeColor="#f59e0b"
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  style={{ width: '120px' }}
                  size="small"
                  showInfo={false}
                />
                <Typography.Text
                  strong
                  style={{ color: '#f59e0b', minWidth: '50px' }}
                >
                  {data?.result?.performance?.satisfactory_count ?? 0}
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" wrap>
          <Flex align="center" gap={8}>
            <XCircle size={20} className="text-red-400" />
            <Typography.Text style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
              Qoniqarsiz
            </Typography.Text>
          </Flex>
          <Flex align="center" gap={12}>
            {' '}
            {isFetching ? (
              <Skeleton.Input active className="!w-full !h-[10px]" />
            ) : (
              <>
                <Progress
                  percent={
                    ((data?.result?.performance?.poor_count ?? 0) /
                      (data?.result?.performance?.total_grades ?? 1)) *
                    100
                  }
                  strokeColor="#ef4444"
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  style={{ width: '120px' }}
                  size="small"
                  showInfo={false}
                />
                <Typography.Text
                  strong
                  style={{ color: '#ef4444', minWidth: '50px' }}
                >
                  {data?.result?.performance?.poor_count ?? 0}
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default PerformanceCard;
