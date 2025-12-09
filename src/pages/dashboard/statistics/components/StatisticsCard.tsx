import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { SettingOutlined } from '@ant-design/icons';
import { Card, Col, Flex, Row, Skeleton, Tag, Typography } from 'antd';
import { BookOpen, CalendarIcon, TrendingUp, Users } from 'lucide-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const StatisticsCard = ({ isDark, PRIMARY }: IStatisticsCardProps) => {
  const { educationYear, groupId, semester } = useContext(StatisticsContext);
  const { data: statistics, isFetching } = useGetDashboardStatisticsQuery({
    education_year: educationYear,
    group_id: groupId,
    semester,
    expand: `${[ExpandItem.STUDENTS, ExpandItem.GROUPS, ExpandItem.ATTENDANCE, ExpandItem.PERFORMANCE, ExpandItem.EDUCATION_YEAR]?.join(',')}`,
  });
  const { t } = useTranslation();

  // Stat cards data
  const statCards = [
    {
      title: 'Jami talabalar',
      value: statistics?.result?.students?.total_students
        ? `${t('const.number_count', { number: statistics?.result?.students?.total_students })}`
        : 0,
      icon: <Users size={24} style={{ color: PRIMARY }} />,
      color: `linear-gradient(135deg, ${PRIMARY} 0%, #0d9488 100%)`,
      subtext: `Faol: ${statistics?.result?.students?.active_students ?? 0}`,
      trend:
        (statistics?.result?.students?.active_students ?? 0) >
        (statistics?.result?.students?.inactive_students ?? 0)
          ? 'up'
          : 'down',
      trendValue: `${
        (
          ((statistics?.result?.students?.active_students ?? 0) /
            (statistics?.result?.students?.total_students ?? 1)) *
            100 || 0
        ).toFixed(1) || 0
      }%`,
    },
    {
      title: 'Guruhlar',
      value: statistics?.result?.groups?.total_groups
        ? `${t('const.number_count', { number: statistics?.result?.groups?.total_groups })}`
        : 0,
      icon: <BookOpen size={24} style={{ color: '#06b6d4' }} />,
      color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      subtext: statistics?.result?.education_year ?? '',
    },
    {
      title: "Davomat ko'rsatkichi",
      value: `${(statistics?.result?.attendance?.attendance_rate ?? 0).toFixed(1)}%`,
      icon: <CalendarIcon size={24} style={{ color: '#10b981' }} />,
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      subtext: `${statistics?.result?.attendance?.present_count ?? 0} qatnashgan`,
      trend:
        (statistics?.result?.attendance?.attendance_rate ?? 0) > 80
          ? 'up'
          : 'down',
    },
    {
      title: "O'rtacha ball",
      value: (statistics?.result?.performance?.average_grade ?? 0).toFixed(2),
      icon: <TrendingUp size={24} style={{ color: '#3b82f6' }} />,
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      subtext: `${statistics?.result?.performance?.excellent_count ?? 0} a'lo`,
      trend:
        (statistics?.result?.performance?.average_grade ?? 0) >= 4
          ? 'up'
          : 'down',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statCards?.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card
            className="stat-card h-full"
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
              boxShadow: `0 4px 24px ${PRIMARY}10`,
              transition: 'all 0.3s ease',
            }}
            hoverable
          >
            <Flex justify="space-between" align="flex-start" wrap gap={8}>
              <div style={{ flex: 1 }} className="min-w-[min(100px,100%)]">
                <Typography.Text
                  style={{
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                    fontSize: '14px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {stat?.title || ''}
                </Typography.Text>
                {isFetching ? (
                  <Skeleton.Button active />
                ) : (
                  <Typography.Title
                    level={2}
                    style={{
                      margin: 0,
                      background: stat.color,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat?.value || ''}
                  </Typography.Title>
                )}
                <Flex
                  gap={8}
                  align="center"
                  style={{ marginTop: '4px' }}
                  className="dashboard__details-list"
                >
                  <Typography.Text
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#888',
                      fontSize: '12px',
                    }}
                  >
                    {stat?.subtext || ''}
                  </Typography.Text>
                  {stat?.trend && (
                    <Flex align="center" gap={2}>
                      {stat.trendValue && (
                        <Typography.Text
                          style={{
                            fontSize: '11px',
                            color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                          }}
                        >
                          {stat?.trendValue || ''}
                        </Typography.Text>
                      )}
                    </Flex>
                  )}
                </Flex>
              </div>
              <Flex align="flex-end" vertical gap={8} className="ml-auto">
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: `${PRIMARY}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </div>
                {(stat?.title === statCards?.[2]?.title ||
                  stat?.title === statCards?.[3]?.title) && (
                  <Tag icon={<SettingOutlined spin />} color={'orange'}>
                    Ishlanmoqda
                  </Tag>
                )}
              </Flex>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsCard;
