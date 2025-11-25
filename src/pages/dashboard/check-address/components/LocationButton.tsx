import { Button } from 'antd';
import { MapPin } from 'lucide-react';

const LocationButton = ({
  geolocation,
  current_address,
}: {
  geolocation?: string;
  current_address?: string;
}) => {
  return (
    <Button
      type="text"
      {...(() => {
        if (!geolocation) return {};
        const [lat, lng] = geolocation?.split?.(',');
        if (!lng || !lat) return {};
        return {
          type: 'link',
          href: `https://yandex.com/maps/?ll=${lng}%2C${lat}&z=15&pt=${lng},${lat}`,
          target: '_blank',
        };
      })()}
      icon={<MapPin size={16} />}
      style={{
        whiteSpace: 'normal',
        height: 'auto',
        padding: 0,
        textAlign: 'left',
      }}
    >
      {current_address}
    </Button>
  );
};

export default LocationButton;
