import { useCallback, useEffect, useState } from 'react';

function useUserLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number }>(null);
  const [error, setError] = useState(null);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      err => {
        setError(err.message);
      }
    );
  }, []);

  useEffect(() => {
    handleLocate();
  }, [handleLocate]);

  return { location, error, handleLocate };
}

export default useUserLocation;
