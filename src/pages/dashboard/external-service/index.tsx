import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';
import DashboardHeader from '../components/DashboardHeader';

const ExternalServicePage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page external-service-page">
      <DashboardHeader>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Tashqi xizmatlar
        </Typography.Title>
      </DashboardHeader>
      <Flex className="main-container">
        <Tabs
          type="card"
          items={[
            {
              key: 'synch',
              label: "Ma'lumotlarni sinxronlash",
              children: <SoonCard />,
            },
            {
              key: 'defense',
              label: 'Ijtimoiy himoya reestri',
              children: <SoonCard />,
            },
            { key: 'women', label: 'Ayollar daftari', children: <SoonCard /> },
            {
              key: 'poor',
              label: "Kambag'allik reestri",
              children: <SoonCard />,
            },
            {
              key: 'disabled',
              label: 'Nogironlik reestri',
              children: <SoonCard />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default ExternalServicePage;
