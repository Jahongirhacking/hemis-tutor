import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const MessagesPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page external-service-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Xabarlar
        </Typography.Title>
      </DashboardHeader>
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
