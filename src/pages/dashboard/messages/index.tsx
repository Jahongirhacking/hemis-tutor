import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';

const MessagesPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page external-service-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Xabarlar
      </Typography.Title>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'synch',
              label: 'Mening xabarlarim',
              children: <SoonCard />,
            },
            { key: 'defense', label: 'Xabar yaratish', children: <SoonCard /> },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default MessagesPage;
