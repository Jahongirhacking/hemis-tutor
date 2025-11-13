import { Button, Flex } from 'antd';
import { useEffect } from 'react';

import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { RootState } from '@/store/store';
import { SearchParams } from '@/utils/config';
import { CloseOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Story, { StoryProps } from './Story';
import StorySlider from './StorySlider';

const StoryViewer = ({
  stories = [],
  shape = 'rectangle',
  previewSlidesPerView = 8,
  storySlidesPerView = 1.5,
  delay,
}: {
  stories?: StoryProps[];
  shape?: 'circle' | 'rectangle';
  previewSlidesPerView?: SwiperProps['slidesPerView'];
  storySlidesPerView?: SwiperProps['slidesPerView'];
  delay?: number;
}) => {
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseStory = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(SearchParams.Story);
    setSearchParams(params);
  };

  const handleOpenStory = (index: number) => {
    searchParams.set(SearchParams.Story, String(index));
    setSearchParams(searchParams);
  };

  // 🔹 Close story when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseStory();
      }
    };

    if (searchParams.has(SearchParams.Story)) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchParams]);

  return (
    <>
      <Flex vertical gap={12} className="story-viewer">
        <Swiper
          slidesPerView={previewSlidesPerView}
          spaceBetween={30}
          className="story-items"
        >
          {stories?.map((s, index) => (
            <SwiperSlide
              key={index}
              className={`preview-slide ${shape}-shape ${themeColor}-preview`}
            >
              <Story.Preview
                img={s?.img}
                title={s?.title}
                onClick={() => handleOpenStory(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>

      {searchParams?.has(SearchParams.Story) &&
        ReactDOM.createPortal(
          <>
            <StorySlider
              stories={stories}
              initialIndex={Number(searchParams.get(SearchParams.Story)) || 0}
              onSlideEnd={handleCloseStory}
              slidesPerView={storySlidesPerView}
              delay={delay}
            />
            <Button
              shape="circle"
              className="story-close-btn"
              onClick={e => {
                e?.stopPropagation();
                handleCloseStory();
              }}
              type="primary"
            >
              <CloseOutlined />
            </Button>
          </>,
          document.getElementById('root')!
        )}
    </>
  );
};

export default StoryViewer;
