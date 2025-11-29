import { Flex, Typography } from 'antd';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomTabs from '../components/CustomTabs';
import Debtors from './tabs/Debtors';
import GPA from './tabs/GPA';
import Rating from './tabs/Rating';
import SummaryRating from './tabs/SummaryRating';

const PerformancePage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={24} className="dashboard__page performance-page">
      <Flex align="center" gap={12}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
          }}
        >
          <TrendingUp size={24} color="white" />
        </div>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('const.appropriation')}
        </Typography.Title>
      </Flex>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'rating',
              label: <span style={{ fontWeight: 500 }}>Reyting qaydnoma</span>,
              children: <Rating />,
            },
            {
              key: 'collected',
              label: <span style={{ fontWeight: 500 }}>Jamlanma qaydnoma</span>,
              children: <SummaryRating />,
            },
            {
              key: 'gpa',
              label: <span style={{ fontWeight: 500 }}>GPA ballar</span>,
              children: <GPA />,
            },
            {
              key: 'debt',
              label: <span style={{ fontWeight: 500 }}>Akademik qarzdor</span>,
              children: <Debtors />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default PerformancePage;
