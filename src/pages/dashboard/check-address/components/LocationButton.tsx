import { Button, Space, Typography } from 'antd';
import { MapPin } from 'lucide-react';

const LocationButton = ({
  geolocation,
  current_address,
}: {
  geolocation?: string;
  current_address?: string;
}) => {
  const hasGeolocation = (() => {
    if (!geolocation) return false;
    const [lat, lng] = geolocation?.split?.(',');
    return !!(lng && lat);
  })();

  const href = (() => {
    if (!geolocation) return undefined;
    const [lat, lng] = geolocation?.split?.(',');
    if (!lng || !lat) return undefined;
    return `https://yandex.com/maps/?ll=${lng}%2C${lat}&z=15&pt=${lng},${lat}`;
  })();

  return (
    <Button
      type={hasGeolocation ? 'link' : 'text'}
      {...(hasGeolocation && href
        ? {
            href,
            target: '_blank',
          }
        : {})}
      className="!p-0 !h-auto hover:bg-transparent"
      style={{
        whiteSpace: 'normal',
        textAlign: 'left',
      }}
    >
      <Space
        size={6}
        align="start"
        className={hasGeolocation ? 'hover:opacity-80 transition-opacity' : ''}
      >
        <MapPin
          size={16}
          className={
            hasGeolocation ? 'text-blue-600 mt-0.5' : 'text-gray-400 mt-0.5'
          }
          style={{ flexShrink: 0 }}
        />
        <Typography.Text
          style={{
            color: hasGeolocation ? '#1890ff' : '#8c8c8c',
            fontSize: '13px',
            lineHeight: '1.4',
          }}
        >
          {current_address || "Manzil ko'rsatilmagan"}
        </Typography.Text>
      </Space>
    </Button>
  );
};

export default LocationButton;
