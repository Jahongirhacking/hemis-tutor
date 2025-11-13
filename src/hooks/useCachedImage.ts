import { useEffect, useState } from 'react';

const imageCache = new Map<string, boolean>();

export function useCachedImage(src?: string) {
  const [loaded, setLoaded] = useState(() => !!(src && imageCache.has(src)));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    // Already cached
    if (imageCache.has(src)) return setLoaded(true);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      imageCache.set(src, true);
      setLoaded(true);
    };

    img.onerror = () => {
      console.warn('Image failed to load:', src);
      setError(true);
    };

    return () => {
      // Optional: cleanup (not strictly necessary)
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
}
