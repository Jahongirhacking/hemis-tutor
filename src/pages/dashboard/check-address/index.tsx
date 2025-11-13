import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const CheckAddressPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page check-address-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Manzil tekshiruvi
        </Typography.Title>
      </DashboardHeader>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'check',
              label: 'Manzil tekshiruvi',
              children: <SoonCard />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default CheckAddressPage;
