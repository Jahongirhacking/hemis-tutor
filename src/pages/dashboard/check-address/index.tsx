import { Flex, Space, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CheckAddress from './tabs/CheckAddress';

const CheckAddressPage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={20} className="dashboard__page check-address-page p-6">
      {/* Page Header */}
      <div>
        <Space align="center" size={12}>
          <div
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
            }}
          >
            <MapPin size={24} color="white" />
          </div>
          <div>
            <Typography.Title level={2} style={{ margin: 0, marginBottom: '4px' }}>
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