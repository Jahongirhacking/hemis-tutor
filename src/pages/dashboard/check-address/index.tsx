import { Flex, Space, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CheckAddress from './tabs/CheckAddress';

const CheckAddressPage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={20} className="dashboard__page check-address-page">
      {/* Page Header */}
      <div>
        <Space align="center" size={12}>
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
            <MapPin size={24} color="white" />
          </div>
          <div>
            <Typography.Title
              level={2}
              style={{ margin: 0, marginBottom: '4px' }}
            >
              {t('const.visit')}
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
              Talabalar manzilini tekshirish va tashriflarni boshqarish
            </Typography.Text>
          </div>
        </Space>
      </div>

      {/* Main Content */}
      <CheckAddress />
    </Flex>
  );
};

export default CheckAddressPage;
