import { LoadingOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { Fullscreen, Play, Volume2, VolumeX } from 'lucide-react';
import type { VideoHTMLAttributes } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoryContext } from '../../StorySlider';

interface StoryVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  active?: boolean;
  onAutoplayTimeLeft: (value: number) => void;
}

const INTERVAL = 30;
const MAX_PERCENT = 100;

const StoryVideo = ({
  active,
  onAutoplayTimeLeft,
  ...props
}: StoryVideoProps) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const storyContext = useContext(StoryContext);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef?.current?.paused) {
        videoRef?.current?.play();
        setIsPaused(false);
      } else {
        videoRef?.current?.pause();
        setIsPaused(true);
      }
    }
  };

  const handleVideoEnd = () => {
    if (storyContext) {
      storyContext?.navigateToNextStory?.();
    }
  };

  const handleFullScreen = () => {
    if (videoRef?.current) {
      videoRef?.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    if (active && !isPaused) {
      const tick = () => {
        onAutoplayTimeLeft(
          (videoRef?.current?.currentTime / videoRef?.current?.duration) *
            MAX_PERCENT
        );
      };

      intervalId.current = setInterval(tick, INTERVAL);
    } else {
      if (intervalId?.current) {
        clearInterval(intervalId?.current);
      }
    }

    return () => {
      clearInterval(intervalId?.current);
    };
  }, [active, isPaused]);

  useEffect(() => {
    if (videoRef.current && active) {
      videoRef.current.currentTime = 0; // reset
      videoRef.current.play(); // play when active
    } else {
      videoRef.current?.pause(); // pause when not active
    }
  }, [active]);

  return (
    <Flex vertical align="center" justify="center" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        autoPlay={active}
        onEnded={handleVideoEnd}
        playsInline
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        muted={storyContext?.isMuted || false}
        onLoadStart={() => setLoading(true)}
        onLoadedData={() => setLoading(false)}
        {...props}
      />
      {isPaused && (
        <Button
          className={`video-control-btn`}
          shape="circle"
          style={{ pointerEvents: 'none' }}
          icon={<Play />}
        />
      )}
      {loading && (
        <Button
          className="video-loading"
          icon={<LoadingOutlined size={28} />}
          title="Yuklanmoqda"
          shape="circle"
          style={{ pointerEvents: 'none' }}
        />
      )}
      <Button
        className="video-mute-btn"
        shape="circle"
        icon={storyContext?.isMuted ? <VolumeX /> : <Volume2 />}
        title="Ovoz"
        onClick={e => {
          e.stopPropagation();
          storyContext?.setIsMuted?.(prev => !prev);
        }}
      />
      <Button
        className={`video-fullscreen-btn`}
        shape="circle"
        icon={<Fullscreen />}
        title="To'liq ekran formati"
        onClick={e => {
          e.stopPropagation();
          handleFullScreen();
        }}
      />
    </Flex>
  );
};

export default StoryVideo;
