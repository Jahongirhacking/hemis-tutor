import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';

const CheckAddressPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page check-address-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Manzil tekshiruvi
      </Typography.Title>
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
