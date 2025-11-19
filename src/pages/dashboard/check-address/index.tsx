import { Flex, Tabs, Typography } from 'antd';
import CheckAddress from './tabs/CheckAddress';

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
              children: <CheckAddress />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default CheckAddressPage;
