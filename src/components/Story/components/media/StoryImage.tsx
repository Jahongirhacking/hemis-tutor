import { LoadingOutlined } from '@ant-design/icons';
import { Button, Flex, Image, ImageProps } from 'antd';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StoryContext } from '../../StorySlider';

interface StoryImageProps extends ImageProps {
  active?: boolean;
  onAutoplayTimeLeft: (percent: number) => void;
}

const MAX_LIMIT = 7 * 1000; // milliseconds = 7s
const INTERVAL = 30; // update every 30ms (~33fps)
const MAX_PERCENT = 100;

const StoryImage = ({
  active = false,
  onAutoplayTimeLeft,
  ...props
}: StoryImageProps) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const percentRef = useRef<number>(0);
  const storyContext = useContext(StoryContext);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageClick = useCallback(() => {
    setIsPaused(prev => !prev);
  }, [setIsPaused]);

  useEffect(() => {
    setLoading(true);
  }, [props?.src]);

  useEffect(() => {
    if (!isPaused && !loading && active) {
      startTimeRef.current =
        Date.now() - (percentRef?.current * MAX_LIMIT) / MAX_PERCENT;

      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current;
        percentRef.current = Math.min(
          (elapsed / MAX_LIMIT) * MAX_PERCENT,
          MAX_PERCENT
        );

        onAutoplayTimeLeft(percentRef?.current);

        if (elapsed >= MAX_LIMIT) {
          clearInterval(intervalId.current!);
          if (storyContext) {
            storyContext?.navigateToNextStory?.();
          }
        }
      };

      intervalId.current = setInterval(tick, INTERVAL);
    } else {
      if (intervalId.current) clearInterval(intervalId.current);
      if (!active) {
        percentRef.current = 0;
      }
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [active, isPaused, loading, onAutoplayTimeLeft]);

  return (
    <Flex vertical align="center" justify="center" onClick={handleImageClick}>
      <Image
        {...props}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading && (
        <Button
          className="img-loading"
          shape="circle"
          icon={<LoadingOutlined />}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </Flex>
  );
};

export default StoryImage;
