import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTabs from '../components/CustomTabs';
import Debtors from './tabs/Debtors';
import GPA from './tabs/GPA';
import Rating from './tabs/Rating';
import SummaryRating from './tabs/SummaryRating';

const PerformancePage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18} className="dashboard__page performance-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t('const.appropriation')}
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
              children: <SummaryRating />,
            },
            { key: 'gpa', label: 'GPA ballar', children: <GPA /> },
            { key: 'debt', label: 'Akademik qarzdor', children: <Debtors /> },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default PerformancePage;
