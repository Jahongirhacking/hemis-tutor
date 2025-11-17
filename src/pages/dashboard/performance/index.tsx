import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';
import Debtors from './tabs/Debtors';
import Rating from './tabs/Rating';

const PerformancePage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page performance-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        O‘zlashtirish
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'rating',
              label: 'Reyting qaydnoma',
              children: <Rating />,
            },
            {
              key: 'collected',
              label: 'Jamlanma qaydnoma',
              children: <SoonCard />,
            },
            { key: 'gpa', label: 'GPA ballar', children: <SoonCard /> },
            { key: 'debt', label: 'Akademik qarzdor', children: <Debtors /> },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default PerformancePage;
