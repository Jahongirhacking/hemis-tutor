
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Flex, Skeleton, Typography } from 'antd';
import Dashboard from './components/Dashboard';

const DashboardPage = () => {
    const { data: statsData, isFetching } = useGetDashboardStatisticsQuery({});

    return (
        <Flex vertical gap={18} className="dashboard__page main-dashboard-page">
            {isFetching ? (
                <Flex vertical gap={24}>
                    <Skeleton.Button active style={{ width: 200, height: 40 }} />
                    <Flex gap={16}>
                        <Skeleton.Button active style={{ width: '100%', height: 100 }} />
                        <Skeleton.Button active style={{ width: '100%', height: 100 }} />
                        <Skeleton.Button active style={{ width: '100%', height: 100 }} />
                        <Skeleton.Button active style={{ width: '100%', height: 100 }} />
                    </Flex>
                    <Skeleton active paragraph={{ rows: 6 }} />
                    <Skeleton active paragraph={{ rows: 6 }} />
                </Flex>
            ) : statsData?.result ? (
                <Dashboard data={statsData.result} />
            ) : (
                <Flex vertical gap={12} align="center" justify="center" style={{ minHeight: '60vh' }}>
                    <Typography.Title level={3} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Ma'lumot topilmadi
                    </Typography.Title>
                </Flex>
            )}
        </Flex>
    );
};

export default DashboardPage;