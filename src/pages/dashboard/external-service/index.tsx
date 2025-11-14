import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Tabs, Typography } from 'antd';

const ExternalServicePage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page external-service-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Tashqi xizmatlar
      </Typography.Title>
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
