import { Flex, FlexProps } from 'antd';
import { useEffect, useRef } from 'react';

export default function YandexMap({
  lat,
  lng,
  ...props
}: FlexProps & { lat: number; lng: number }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.com/2.1/?lang=en_US';
    script.onload = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [lat, lng],
          zoom: 17,
          controls: [], // ❌ No default controls
        });

        const placemark = new window.ymaps.Placemark(
          [lat, lng],
          {},
          {
            preset: 'islands#redIcon',
          }
        );

        map.geoObjects.add(placemark);
      });
    };

    document.body.appendChild(script);
  }, [lat, lng]);

  return (
    <Flex
      vertical
      ref={mapRef}
      style={{ width: '100%', height: '300px' }}
      {...props}
    />
  );
}
