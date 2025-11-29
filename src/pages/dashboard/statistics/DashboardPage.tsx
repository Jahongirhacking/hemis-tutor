import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Skeleton } from 'antd';
import Dashboard from './components/Dashboard';

const DashboardPage = () => {
  const { data: statsData, isFetching } = useGetDashboardStatisticsQuery({});

  return (
    <Flex vertical gap={18} className="dashboard__page main-dashboard-page">
      {isFetching ? (
        <Flex vertical gap={24}>
          <Card>
            <GenerateSkeleton numberOfRepetition={2}>
              <Skeleton.Button active style={{ width: 200, height: 40 }} />
            </GenerateSkeleton>
          </Card>
          <Card>
            <Flex gap={16}>
              <GenerateSkeleton numberOfRepetition={4}>
                <Skeleton.Button
                  active
                  className="flex-1"
                  style={{ width: '100%', height: 100 }}
                />
              </GenerateSkeleton>
            </Flex>
          </Card>
          <GenerateSkeleton numberOfRepetition={1} vertical>
            <Card>
              <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
          </GenerateSkeleton>
        </Flex>
      ) : statsData?.result ? (
        <Dashboard data={statsData.result} />
      ) : (
        <NotFoundAnimation.Card />
      )}
    </Flex>
  );
};

export default DashboardPage;
