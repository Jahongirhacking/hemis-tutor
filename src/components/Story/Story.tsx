import useParentSize from '@/hooks/useParentSize';
import { IStoryData } from '@/services/stories/type';
import { RootState } from '@/store/store';
import { Flex, FlexProps, Image, Typography } from 'antd';
import { memo, ReactElement, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import StoryImage from './components/media/StoryImage';
import StoryVideo from './components/media/StoryVideo';
import StoryContent, { StoryContentHandle } from './components/StoryContent';

export interface StoryProps {
  img?: string;
  title?: string;
  type: IStoryData['content_type'];
  buttonText?: string;
  content: string;
  description?: string;
  link?: string;
  active?: boolean;
  renderLoading?: () => ReactElement;
}

const FALLBACK_DARK_URL = '/images/fallback-dark.svg';
const FALLBACK_LIGHT_URL = '/images/fallback-light.svg';
const MAX_WIDTH = 430;

const Story = (props: StoryProps) => {
  const { ref: storyRef, width: storyWidth } = useParentSize();
  const progressBar = useRef<HTMLDivElement | null>(null);
  const storyContentRef = useRef<StoryContentHandle | null>(null);

  const onAutoplayTimeLeft = useCallback(
    (percent: number) => {
      if (progressBar?.current) {
        progressBar?.current?.style?.setProperty('--progress', `${percent}%`);
      }
    },
    [props?.active]
  );

  return (
    <Flex
      vertical
      className="story-item-container"
      style={{ width: '100%', height: '100%', margin: 'auto' }}
      ref={storyRef}
      onClick={e => e?.stopPropagation()}
    >
      <Flex
        vertical
        gap={10}
        className={`story-item ${props?.active ? 'active' : 'inactive'}`}
        onClick={() => {
          if (storyContentRef?.current) {
            storyContentRef?.current?.setIsTextCollapsed(true);
          }
        }}
        style={{
          height: (Math.min(storyWidth, MAX_WIDTH) / 9) * 16 + 100,
        }}
      >
        {props?.active && (
          <div className="autoplay-progress">
            <div className="progress-bar" ref={progressBar}></div>
          </div>
        )}
        <div className="media-content">
          {props?.type === 'photo' && (
            <StoryImage
              active={props?.active}
              preview={false}
              loading={props?.active ? 'eager' : 'lazy'}
              src={props?.img || FALLBACK_DARK_URL}
              fallback={FALLBACK_DARK_URL}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
            />
          )}
          {props?.type === 'video' && (
            <StoryVideo
              active={props?.active}
              src={props?.content}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
            />
          )}
        </div>

        <StoryContent
          title={props?.title}
          link={props?.link}
          buttonText={props?.buttonText}
          description={props?.description}
          ref={storyContentRef}
        />
      </Flex>
    </Flex>
  );
};

const StoryPreview = memo(
  (props: Pick<StoryProps, 'img' | 'title'> & Omit<FlexProps, 'children'>) => {
    const themeColor = useSelector(
      (store: RootState) => store.themeSlice?.color
    );
    const fallback = useMemo(
      () => (themeColor === 'dark' ? FALLBACK_DARK_URL : FALLBACK_LIGHT_URL),
      [themeColor]
    );
    return (
      <Flex
        vertical
        gap={10}
        className="story-preview"
        onClick={props?.onClick}
      >
        <Image
          preview={false}
          loading="lazy"
          src={props?.img || fallback}
          fallback={fallback}
        />
        <Flex gap={12} vertical>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {props?.title}
          </Typography.Title>
        </Flex>
      </Flex>
    );
  }
);

Story.Preview = StoryPreview;

export default Story;
