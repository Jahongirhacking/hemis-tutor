import { IDashboardStatisticsRes } from '@/services/profile/type';
import { RootState } from '@/store/store';
import {
  Card,
  Col,
  Flex,
  Progress,
  Row,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  DollarSign,
  Home,
  MapPin,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ResponsiveMasonryFixed = ResponsiveMasonry as unknown as React.FC<any>;
const MasonryFixed = Masonry as unknown as React.FC<any>;

const Dashboard = ({ data }: { data: IDashboardStatisticsRes }) => {
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
          bodyStyle={{ padding: 0 }}
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

  // Stat cards data
  const statCards = [
    {
      title: 'Jami talabalar',
      value: data.students.total_students,
      icon: <Users size={24} style={{ color: PRIMARY }} />,
      color: `linear-gradient(135deg, ${PRIMARY} 0%, #0d9488 100%)`,
      subtext: `Faol: ${data.students.active_students}`,
      trend:
        data.students.active_students > data.students.inactive_students
          ? 'up'
          : 'down',
      trendValue: `${((data.students.active_students / data.students.total_students) * 100).toFixed(1)}%`,
    },
    {
      title: 'Guruhlar',
      value: data.groups.total_groups,
      icon: <BookOpen size={24} style={{ color: '#06b6d4' }} />,
      color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      subtext: data.education_year,
    },
    {
      title: "Davomat ko'rsatkichi",
      value: `${data.attendance.attendance_rate.toFixed(1)}%`,
      icon: <Calendar size={24} style={{ color: '#10b981' }} />,
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      subtext: `${data.attendance.present_count} qatnashgan`,
      trend: data.attendance.attendance_rate > 80 ? 'up' : 'down',
    },
    {
      title: "O'rtacha ball",
      value: data.performance.average_grade.toFixed(2),
      icon: <TrendingUp size={24} style={{ color: '#3b82f6' }} />,
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      subtext: `${data.performance.excellent_count} a'lo`,
      trend: data.performance.average_grade >= 4 ? 'up' : 'down',
    },
  ];

  // Education form data for chart
  const educationFormData = data.education_form_statistics.map(item => ({
    name: item.education_form_name,
    value: item.count,
    percent: item.percent,
  }));

  // Course statistics for chart
  const courseData = data.course_statistics.map(item => ({
    name: item.course_name,
    value: item.count,
    percent: item.percent,
  }));

  // Gender distribution
  const genderData = [
    {
      name: 'Erkak',
      value: data.gender_statistics.male_count,
      percent: data.gender_statistics.male_percent,
    },
    {
      name: 'Ayol',
      value: data.gender_statistics.female_count,
      percent: data.gender_statistics.female_percent,
    },
  ];

  // Absenteeism data
  const absenteeismData = [
    {
      range: '30-36%',
      count: data.absenteeism.range_30_36.count,
      percent: data.absenteeism.range_30_36.percent,
    },
    {
      range: '40-70%',
      count: data.absenteeism.range_40_70.count,
      percent: data.absenteeism.range_40_70.percent,
    },
    {
      range: '72%+',
      count: data.absenteeism.range_72_plus.count,
      percent: data.absenteeism.range_72_plus.percent,
    },
  ];

  // Social statistics radar chart
  const socialRadarData = data.social_statistics.map(item => ({
    category:
      item.category_name.length > 15
        ? item.category_name.substring(0, 15) + '...'
        : item.category_name,
    value: item.count,
  }));

  // Terrain statistics
  const terrainData = data.terrain_statistics.slice(0, 8).map(item => ({
    name:
      item.terrain_name.length > 20
        ? item.terrain_name.substring(0, 20) + '...'
        : item.terrain_name,
    count: item.count,
    percent: item.percent,
  }));

  return (
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
            {data.education_year} {data.semester ? `— ${data.semester}` : ''}
          </Typography.Text>
        </div>
      </Flex>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        {statCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="stat-card"
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${PRIMARY}20`,
                borderRadius: '16px',
                boxShadow: `0 4px 24px ${PRIMARY}10`,
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: '20px' }}
              hoverable
            >
              <Flex justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Typography.Text
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                      fontSize: '14px',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.title}
                  </Typography.Text>
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
                    {stat.value}
                  </Typography.Title>
                  <Flex gap={8} align="center" style={{ marginTop: '4px' }}>
                    <Typography.Text
                      style={{
                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#888',
                        fontSize: '12px',
                      }}
                    >
                      {stat.subtext}
                    </Typography.Text>
                    {stat.trend && (
                      <Flex align="center" gap={2}>
                        {stat.trend === 'up' ? (
                          <TrendingUp size={12} style={{ color: '#10b981' }} />
                        ) : (
                          <TrendingDown
                            size={12}
                            style={{ color: '#ef4444' }}
                          />
                        )}
                        {stat.trendValue && (
                          <Typography.Text
                            style={{
                              fontSize: '11px',
                              color:
                                stat.trend === 'up' ? '#10b981' : '#ef4444',
                            }}
                          >
                            {stat.trendValue}
                          </Typography.Text>
                        )}
                      </Flex>
                    )}
                  </Flex>
                </div>
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
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Charts Row */}
      <Row gutter={[16, 16]}>
        {/* Education Forms Pie Chart */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Typography.Title
                level={4}
                style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
              >
                Ta'lim shakli
              </Typography.Title>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
              height: '100%',
            }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={educationFormData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.percent.toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {educationFormData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <Flex vertical gap={8} style={{ marginTop: '16px' }}>
              {educationFormData.map((item, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Flex gap={8} align="center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: COLORS[index % COLORS.length],
                      }}
                    />
                    <Typography.Text
                      style={{
                        color: isDark ? '#fff' : '#1a1a1a',
                        fontSize: '13px',
                      }}
                    >
                      {item.name}
                    </Typography.Text>
                  </Flex>
                  <Typography.Text strong style={{ color: PRIMARY }}>
                    {item.value}
                  </Typography.Text>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Col>

        {/* Course Distribution Bar Chart */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Typography.Title
                level={4}
                style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
              >
                Kurslar bo'yicha
              </Typography.Title>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
              height: '100%',
            }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courseData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff20' : '#00000010'}
                />
                <XAxis
                  dataKey="name"
                  stroke={isDark ? '#fff' : '#666'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#fff' : '#666'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={PRIMARY} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Gender Distribution */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Typography.Title
                level={4}
                style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
              >
                Jins bo'yicha
              </Typography.Title>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
              height: '100%',
            }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry: any) => `${entry.percent.toFixed(1)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <Flex vertical gap={12} style={{ marginTop: '16px' }}>
              {genderData.map((item, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Flex gap={8} align="center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: index === 0 ? '#3b82f6' : '#ec4899',
                      }}
                    />
                    <Typography.Text
                      style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                    >
                      {item.name}
                    </Typography.Text>
                  </Flex>
                  <Typography.Text strong style={{ color: PRIMARY }}>
                    {item.value}
                  </Typography.Text>
                </Flex>
              ))}
            </Flex>
          </Card>
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
          {/* Social Statistics & Absenteeism */}
          {/* Social Statistics Radar */}
          <Card
            className="w-full"
            title={
              <Flex justify="space-between" align="center">
                <Typography.Title
                  level={4}
                  style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
                >
                  Ijtimoiy toifalar
                </Typography.Title>
                <UserCheck size={20} style={{ color: PRIMARY }} />
              </Flex>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
            }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={socialRadarData}>
                <PolarGrid stroke={isDark ? '#ffffff30' : '#00000020'} />
                <PolarAngleAxis
                  dataKey="category"
                  stroke={isDark ? '#fff' : '#666'}
                  style={{ fontSize: '11px' }}
                />
                <PolarRadiusAxis stroke={isDark ? '#fff' : '#666'} />
                <Radar
                  name="Talabalar"
                  dataKey="value"
                  stroke={PRIMARY}
                  fill={PRIMARY}
                  fillOpacity={0.6}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Absenteeism Statistics */}
          <Card
            className="w-full"
            title={
              <Typography.Title
                level={4}
                style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
              >
                Davomat ko'rsatkichi (foizda)
              </Typography.Title>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={absenteeismData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff20' : '#00000010'}
                />
                <XAxis type="number" stroke={isDark ? '#fff' : '#666'} />
                <YAxis
                  dataKey="range"
                  type="category"
                  stroke={isDark ? '#fff' : '#666'}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Flex vertical gap={8} style={{ marginTop: '16px' }}>
              <Typography.Text
                strong
                style={{ color: isDark ? '#fff' : '#1a1a1a' }}
              >
                Eng ko'p dars qoldirganlar (TOP 10)
              </Typography.Text>
              {data.absenteeism.top_10_absentees
                .slice(0, 5)
                .map((student, index) => (
                  <Flex key={index} justify="space-between" align="center">
                    <Typography.Text
                      style={{
                        color: isDark ? '#fff' : '#666',
                        fontSize: '13px',
                      }}
                    >
                      {student.full_name}
                    </Typography.Text>
                    <Tag color="orange">{student.absent_count} dars</Tag>
                  </Flex>
                ))}
            </Flex>
          </Card>

          {/* Terrain & District Statistics */}
          {/* Terrain Distribution */}
          <Card
            className="w-full"
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
          </Card>

          {/* District Statistics */}
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
            <Flex
              vertical
              gap={12}
              style={{ maxHeight: '300px', overflowY: 'auto' }}
            >
              {data.district_statistics.slice(0, 10).map((stat, index) => (
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
            </Flex>
          </Card>

          {/* Performance & Contracts */}
          {/* Performance Stats */}
          <Card
            className="w-full"
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
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={8}>
                  <CheckCircle size={20} className="text-green-400" />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    A'lo
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={12}>
                  <Progress
                    percent={
                      (data.performance.excellent_count /
                        data.performance.total_grades) *
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
                    {data.performance.excellent_count}
                  </Typography.Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={8}>
                  <CheckCircle size={20} className="text-blue-400" />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    Yaxshi
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={12}>
                  <Progress
                    percent={
                      (data.performance.good_count /
                        data.performance.total_grades) *
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
                    {data.performance.good_count}
                  </Typography.Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={8}>
                  <CheckCircle size={20} className="text-yellow-400" />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    Qoniqarli
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={12}>
                  <Progress
                    percent={
                      (data.performance.satisfactory_count /
                        data.performance.total_grades) *
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
                    {data.performance.satisfactory_count}
                  </Typography.Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={8}>
                  <XCircle size={20} className="text-red-400" />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    Qoniqarsiz
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={12}>
                  <Progress
                    percent={
                      (data.performance.poor_count /
                        data.performance.total_grades) *
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
                    {data.performance.poor_count}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          {/* Contract Stats */}
          <Card
            className="w-full"
            title={
              <Typography.Title
                level={4}
                style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
              >
                Shartnoma statistikasi
              </Typography.Title>
            }
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${PRIMARY}20`,
              borderRadius: '16px',
            }}
          >
            <Flex vertical gap={20}>
              <Statistic
                title={
                  <Typography.Text
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                    }}
                  >
                    Jami shartnoma summasi
                  </Typography.Text>
                }
                value={data.contracts.total_summa.toLocaleString()}
                prefix={<DollarSign size={16} />}
                valueStyle={{ color: PRIMARY }}
                suffix="so'm"
              />
              <Flex gap={16}>
                <Flex vertical flex={1}>
                  <Typography.Text
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                      marginBottom: '8px',
                    }}
                  >
                    To'langan
                  </Typography.Text>
                  <Progress
                    percent={Math.round(
                      (data.contracts.paid_summa / data.contracts.total_summa) *
                        100
                    )}
                    strokeColor={PRIMARY}
                    trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  />
                  <Typography.Text
                    style={{
                      color: PRIMARY,
                      fontSize: '12px',
                      marginTop: '4px',
                    }}
                  >
                    {data.contracts.paid_summa.toLocaleString()} so'm
                  </Typography.Text>
                </Flex>
                <Flex vertical flex={1}>
                  <Typography.Text
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                      marginBottom: '8px',
                    }}
                  >
                    Qarzdorlik
                  </Typography.Text>
                  <Progress
                    percent={Math.round(
                      (data.contracts.debt_summa / data.contracts.total_summa) *
                        100
                    )}
                    strokeColor="#f59e0b"
                    trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                  />
                  <Typography.Text
                    style={{
                      color: '#f59e0b',
                      fontSize: '12px',
                      marginTop: '4px',
                    }}
                  >
                    {data.contracts.debt_summa.toLocaleString()} so'm
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          {/* Living Status & Geo Location */}
          <Card
            className="w-full"
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
              {data.living_status_statistics.map((stat, index) => (
                <Flex key={index} justify="space-between" align="center">
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    {stat.living_status_name}
                  </Typography.Text>
                  <Flex align="center" gap={12}>
                    <Progress
                      percent={stat.percent}
                      strokeColor={COLORS[index % COLORS.length]}
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
            </Flex>
          </Card>

          <Card
            className="w-full"
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
                  <Typography.Title
                    level={2}
                    style={{ margin: 0, color: PRIMARY }}
                  >
                    {data.geo_location_statistics.with_location}
                  </Typography.Title>
                  <Typography.Text style={{ color: PRIMARY, fontSize: '12px' }}>
                    {data.geo_location_statistics.with_location_percent.toFixed(
                      1
                    )}
                    %
                  </Typography.Text>
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
                  <Typography.Title
                    level={2}
                    style={{ margin: 0, color: '#f59e0b' }}
                  >
                    {data.geo_location_statistics.without_location}
                  </Typography.Title>
                  <Typography.Text
                    style={{ color: '#f59e0b', fontSize: '12px' }}
                  >
                    {data.geo_location_statistics.without_location_percent.toFixed(
                      1
                    )}
                    %
                  </Typography.Text>
                </Flex>
              </Flex>
              <Progress
                percent={data.geo_location_statistics.with_location_percent}
                strokeColor={PRIMARY}
                trailColor="#f59e0b"
              />
            </Flex>
          </Card>
        </MasonryFixed>
      </ResponsiveMasonryFixed>
    </Flex>
  );
};

export default Dashboard;
