import { useCallback, useEffect, useState } from 'react';

function useUserLocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>(null);
  const [error, setError] = useState(null);

  const handleLocate = useCallback(() => {
    setIsLocating(true);
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
        setIsLocating(false);
      },
      err => {
        setError(err.message);
        setIsLocating(false);
      }
    );
  }, []);

  useEffect(() => {
    handleLocate();
  }, [handleLocate]);

  return { location, error, handleLocate, isLocating };
}

export default useUserLocation;
