import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { RootState } from '@/store/store';
import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
  ContractCard,
  CourseCard,
  DistrictsCard,
  ExpandItem,
  GenderCard,
  GeoLocationCard,
  LivingStatusCard,
  PerformanceCard,
  SocialCard,
  StatisticsCard,
  TopAbsentCard,
} from './components';
import GeoLocationMapCard from './components/GeoLocationMapCard';

const ResponsiveMasonryFixed = ResponsiveMasonry as unknown as React.FC<any>;
const MasonryFixed = Masonry as unknown as React.FC<any>;

const Dashboard = () => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${[ExpandItem.EDUCATION_YEAR, ExpandItem.SEMESTER, ExpandItem.GROUPS]}`,
  });
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);
  const isDark = useMemo(() => themeColor === 'dark', [themeColor]);

  const PRIMARY = '#14b8a6';
  const COLORS = [
    '#14b8a6',
    '#0d9488',
    '#5eead4',
    '#2dd4bf',
    '#99f6e4',
    '#06b6d4',
    '#0891b2',
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card
          style={{
            background: isDark
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${PRIMARY}40`,
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        >
          <Typography.Text strong style={{ color: isDark ? '#fff' : '#000' }}>
            {payload[0].name}
          </Typography.Text>
          <br />
          <Typography.Text style={{ color: PRIMARY }}>
            {payload[0].value}
          </Typography.Text>
        </Card>
      );
    }
    return null;
  };

  return (
    <Flex vertical gap={18} className="dashboard__page main-dashboard-page">
      <Flex vertical gap={24} className="dashboard-stats">
        {/* Header */}
        <Flex justify="space-between" align="center" wrap gap={16}>
          <div>
            <Typography.Title
              level={2}
              style={{
                margin: 0,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1a1a1a',
              }}
            >
              Dashboard
            </Typography.Title>
            <Typography.Text
              style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666' }}
            >
              {isFetching ? (
                <Skeleton.Input active />
              ) : (
                <span>
                  {data?.result?.education_year}{' '}
                  {data?.result?.semester ? `— ${data?.result?.semester}` : ''}
                </span>
              )}
            </Typography.Text>
          </div>
        </Flex>

        {/* Stat Cards */}
        <StatisticsCard {...{ isDark, PRIMARY }} />

        {/* Main Charts Row */}
        <Row gutter={[16, 16]}>
          {/* Living Status & Geo Location */}
          <Col xs={24} lg={8}>
            <LivingStatusCard {...{ isDark, PRIMARY, COLORS }} />
          </Col>

          {/* Course Distribution Bar Chart */}
          <Col xs={24} lg={8}>
            <CourseCard {...{ CustomTooltip, COLORS, PRIMARY, isDark }} />
          </Col>

          {/* Gender Distribution */}
          <Col xs={24} lg={8}>
            <GenderCard {...{ isDark, PRIMARY, CustomTooltip }} />
          </Col>
        </Row>

        <ResponsiveMasonryFixed
          columnsCountBreakPoints={{
            300: 1,
            800: 2,
          }}
          className="dashboard-masonry"
        >
          <MasonryFixed gutter="1.5rem">
            {/* Absenteeism Statistics */}
            <TopAbsentCard {...{ isDark, PRIMARY, CustomTooltip }} />

            {/* District Statistics */}
            <DistrictsCard {...{ isDark, PRIMARY }} />

            {/* Performance Stats */}
            <PerformanceCard {...{ isDark, PRIMARY }} />

            {/* Contract Stats */}
            <ContractCard {...{ isDark, PRIMARY }} />

            {/* Geo */}
            <GeoLocationCard {...{ isDark, PRIMARY }} />

            {/* Social Statistics Radar */}
            <SocialCard {...{ isDark, PRIMARY, CustomTooltip, COLORS }} />
          </MasonryFixed>
        </ResponsiveMasonryFixed>

        <GeoLocationMapCard {...{ isDark, PRIMARY }} />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
