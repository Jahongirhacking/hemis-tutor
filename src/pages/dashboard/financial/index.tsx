import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const FinancialPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page financial-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Moliyaviy holat
        </Typography.Title>
      </DashboardHeader>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'rating',
              label: "Kontraktlar ro'yxati",
              children: <SoonCard />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default FinancialPage;
