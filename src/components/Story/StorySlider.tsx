import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import Story, { StoryProps } from './Story';
import './styles.scss';

interface StorySliderProps {
  stories: StoryProps[];
  initialIndex?: number; // external control,
  onSlideEnd?: () => void;
  delay?: number;
}

export const StoryContext = createContext<null | {
  navigateToNextStory: () => void;
  navigateToPrevStory: () => void;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}>(null);

export default function StorySlider({
  initialIndex = 0,
  stories,
  onSlideEnd,
  delay = 5000,
  ...props
}: StorySliderProps & SwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    swiperRef.current?.autoplay?.start();
  }, [activeIndex]);

  // 🧭 Set initial index once Swiper is ready
  const handleSwiperInit = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      setTimeout(() => {
        swiper.slideTo(initialIndex, 0); // immediately move without animation
      }, 100);
      setActiveIndex(initialIndex);
    },
    [initialIndex]
  );

  // 🪄 React to external prop changes dynamically
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== initialIndex) {
      swiperRef.current.slideTo(initialIndex);
    }
  }, [initialIndex]);

  // 🔄 Keep internal state synced with Swiper
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const current = swiper.activeIndex;
      const last = swiper.slides.length - 1;
      setActiveIndex(current);

      // When user reaches last slide and tries to go beyond
      if (current === last && delay) {
        // Wait for potential autoplay transition to finish
        setTimeout(() => {
          if (swiper.isEnd && swiper.autoplay?.running) {
            onSlideEnd?.();
          }
        }, delay + 1000);
      }
    },
    [initialIndex, delay]
  );

  const navigateToNextStory = useCallback(() => {
    if (activeIndex === stories?.length - 1) return onSlideEnd();
    const newIndex = Math.min(activeIndex + 1, stories?.length - 1);
    setActiveIndex(newIndex);
    swiperRef.current?.slideTo(newIndex);
  }, [activeIndex, stories]);

  const navigateToPrevStory = useCallback(() => {
    if (activeIndex === 0) return onSlideEnd();
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    swiperRef.current?.slideTo(newIndex);
  }, [activeIndex, stories]);

  return (
    <StoryContext.Provider
      value={{
        navigateToNextStory,
        navigateToPrevStory,
        isMuted,
        setIsMuted,
      }}
    >
      <div className="story-slider-container" onClick={() => onSlideEnd()}>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.5}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 0.6,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          className="story-view-slider"
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          {...props}
        >
          {stories?.map((story, index) => (
            <SwiperSlide key={index}>
              <Story {...story} active={index === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Example manual control buttons */}
        {activeIndex !== 0 && (
          <button
            className="prev-slide-btn slide-btn"
            style={{ cursor: 'pointer', border: '1px solid #fff' }}
            onClick={e => {
              e?.stopPropagation();
              navigateToPrevStory();
            }}
          >
            <ArrowLeft size={18} style={{ transform: 'translateY(2px)' }} />
          </button>
        )}

        {activeIndex !== stories?.length - 1 && (
          <button
            className="next-slide-btn slide-btn"
            style={{ cursor: 'pointer', border: '1px solid #fff' }}
            onClick={e => {
              e?.stopPropagation();
              navigateToNextStory();
            }}
          >
            <ArrowRight size={18} style={{ transform: 'translateY(2px)' }} />
          </button>
        )}
      </div>
    </StoryContext.Provider>
  );
}
