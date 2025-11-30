import { Flex } from 'antd';
import Dashboard from './components/Dashboard';

const DashboardPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page main-dashboard-page">
      <Dashboard />
    </Flex>
  );
};

export default DashboardPage;
