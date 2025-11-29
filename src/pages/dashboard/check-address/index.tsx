import { Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CheckAddress from './tabs/CheckAddress';

const CheckAddressPage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18} className="dashboard__page check-address-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t('const.visit')}
      </Typography.Title>
      <Flex className="main-container w-full">
        <Card className='w-full'>
          <CheckAddress />
        </Card>
      </Flex>
    </Flex>
  );
};

export default CheckAddressPage;
