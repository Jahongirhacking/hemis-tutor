import { IDashboardStatisticsRes } from '@/services/profile/type';
import { RootState } from '@/store/store';
import { Card, Col, Flex, Progress, Row, Statistic, Typography } from 'antd';
import {
    BookOpen,
    Calendar,
    CheckCircle,
    DollarSign,
    TrendingUp,
    Users,
    XCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    Cell, Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const Dashboard = ({ data }: { data: IDashboardStatisticsRes }) => {
    const themeColor = useSelector((store: RootState) => store.themeSlice.color); // "dark" | "light"
    const isDark = useMemo(() => themeColor === "dark", [themeColor]);
    const COLORS = ['#14b8a6', '#0d9488', '#5eead4', '#2dd4bf', '#99f6e4'];
    console.log(isDark);

    // Stat cards data
    const statCards = [
        {
            title: 'Jami talabalar',
            value: data.students.total_students,
            icon: <Users size={24} className="text-teal-400" />,
            color: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            subtext: `Faol: ${data.students.active_students}`,
        },
        {
            title: 'Guruhlar',
            value: data.groups.total_groups,
            icon: <BookOpen size={24} className="text-cyan-400" />,
            color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            subtext: `${data.education_year}`,
        },
        {
            title: "Davomat ko'rsatkichi",
            value: `${data.attendance.attendance_rate}%`,
            icon: <Calendar size={24} className="text-emerald-400" />,
            color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            subtext: `${data.attendance.present_count} qatnashgan`,
        },
        {
            title: "O'rtacha ball",
            value: data.performance.average_grade.toFixed(2),
            icon: <TrendingUp size={24} className="text-blue-400" />,
            color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            subtext: `${data.performance.excellent_count} a'lo`,
        },
    ];

    // Education form data for chart
    const educationFormData = data.education_form_statistics.map(item => ({
        name: item.education_form_name,
        value: item.count,
    }));

    // Course statistics for chart
    const courseData = data.course_statistics.map(item => ({
        name: item.course_name,
        value: item.count,
    }));

    return (
        <Flex vertical gap={24} className="dashboard-stats">
            {/* Header */}
            <Flex justify="space-between" align="center" wrap gap={16}>
                <div>
                    <Typography.Title
                        level={2}
                        style={{ margin: 0, color: 'rgba(255, 255, 255, 0.95)' }}
                    >
                        Dashboard
                    </Typography.Title>
                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {data.education_year} — {data.semester}
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
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(20, 184, 166, 0.1)',
                                borderRadius: '16px',
                                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
                            }}
                            bodyStyle={{ padding: '20px' }}
                        >
                            <Flex justify="space-between" align="center">
                                <div>
                                    <Typography.Text
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.6)',
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
                                    <Typography.Text
                                        style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}
                                    >
                                        {stat.subtext}
                                    </Typography.Text>
                                </div>
                                <div
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '12px',
                                        background: 'rgba(20, 184, 166, 0.1)',
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

            {/* Charts Row */}
            <Row gutter={[16, 16]}>
                {/* Education Forms */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Ta'lim shakli
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={educationFormData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: any) => `${props?.name}: ${(props?.percent * 100)?.toFixed(0)}%`}
                                    outerRadius={100}
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
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(15, 23, 42, 0.95)',
                                        border: '1px solid rgba(20, 184, 166, 0.2)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* Course Distribution */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Kurslar bo'yicha
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={courseData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: any) => `${props?.name}: ${(props?.percent * 100)?.toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {courseData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(15, 23, 42, 0.95)',
                                        border: '1px solid rgba(20, 184, 166, 0.2)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Performance & Contracts */}
            <Row gutter={[16, 16]}>
                {/* Performance Stats */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Akademik natijalar
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <Flex vertical gap={16}>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap={8}>
                                    <CheckCircle size={20} className="text-green-400" />
                                    <Typography.Text style={{ color: '#fff' }}>
                                        A'lo
                                    </Typography.Text>
                                </Flex>
                                <Typography.Text strong style={{ color: '#14b8a6' }}>
                                    {data.performance.excellent_count}
                                </Typography.Text>
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap={8}>
                                    <CheckCircle size={20} className="text-blue-400" />
                                    <Typography.Text style={{ color: '#fff' }}>Yaxshi</Typography.Text>
                                </Flex>
                                <Typography.Text strong style={{ color: '#14b8a6' }}>
                                    {data.performance.good_count}
                                </Typography.Text>
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap={8}>
                                    <CheckCircle size={20} className="text-yellow-400" />
                                    <Typography.Text style={{ color: '#fff' }}>
                                        Qoniqarli
                                    </Typography.Text>
                                </Flex>
                                <Typography.Text strong style={{ color: '#14b8a6' }}>
                                    {data.performance.satisfactory_count}
                                </Typography.Text>
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap={8}>
                                    <XCircle size={20} className="text-red-400" />
                                    <Typography.Text style={{ color: '#fff' }}>
                                        Qoniqarsiz
                                    </Typography.Text>
                                </Flex>
                                <Typography.Text strong style={{ color: '#f87171' }}>
                                    {data.performance.poor_count}
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>

                {/* Contract Stats */}
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Shartnoma statistikasi
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <Flex vertical gap={20}>
                            <Statistic
                                title={
                                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        Jami shartnoma summasi
                                    </Typography.Text>
                                }
                                value={data.contracts.total_summa}
                                prefix={<DollarSign size={16} />}
                                valueStyle={{ color: '#14b8a6' }}
                                suffix="so'm"
                            />
                            <Flex gap={16}>
                                <Flex vertical flex={1}>
                                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        To'langan
                                    </Typography.Text>
                                    <Progress
                                        percent={Math.round(
                                            (data.contracts.paid_summa / data.contracts.total_summa) *
                                            100
                                        )}
                                        strokeColor="#14b8a6"
                                        trailColor="rgba(255, 255, 255, 0.1)"
                                    />
                                </Flex>
                                <Flex vertical flex={1}>
                                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        Qarzdorlik
                                    </Typography.Text>
                                    <Progress
                                        percent={Math.round(
                                            (data.contracts.debt_summa / data.contracts.total_summa) *
                                            100
                                        )}
                                        strokeColor="#f59e0b"
                                        trailColor="rgba(255, 255, 255, 0.1)"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            </Row>

            {/* Living Status & District Stats */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Yashash holati
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <Flex vertical gap={12}>
                            {data.living_status_statistics.slice(0, 5).map((stat, index) => (
                                <Flex key={index} justify="space-between" align="center">
                                    <Typography.Text style={{ color: '#fff' }}>
                                        {stat.living_status_name}
                                    </Typography.Text>
                                    <Flex align="center" gap={12}>
                                        <Progress
                                            percent={stat.percent}
                                            strokeColor="#14b8a6"
                                            trailColor="rgba(255, 255, 255, 0.1)"
                                            style={{ width: '100px' }}
                                            size="small"
                                        />
                                        <Typography.Text strong style={{ color: '#14b8a6' }}>
                                            {stat.count}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                                Tumanlar bo'yicha
                            </Typography.Title>
                        }
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(20, 184, 166, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <Flex vertical gap={12}>
                            {data.district_statistics.slice(0, 5).map((stat, index) => (
                                <Flex key={index} justify="space-between" align="center">
                                    <Typography.Text style={{ color: '#fff' }}>
                                        {stat.district_name}
                                    </Typography.Text>
                                    <Flex align="center" gap={12}>
                                        <Progress
                                            percent={stat.percent}
                                            strokeColor="#14b8a6"
                                            trailColor="rgba(255, 255, 255, 0.1)"
                                            style={{ width: '100px' }}
                                            size="small"
                                        />
                                        <Typography.Text strong style={{ color: '#14b8a6' }}>
                                            {stat.count}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Flex>
    );
};

export default Dashboard;