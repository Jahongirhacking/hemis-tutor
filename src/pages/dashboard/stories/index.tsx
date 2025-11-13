import StoryViewer from '@/components/Story/StoryViewer';
import useParentSize from '@/hooks/useParentSize';
import { STORY_BASE_URL } from '@/services/api/const';
import { useGetStoriesQuery } from '@/services/stories';

const MIN_SIZE = 110;
const MEDIUM_SIZE = 140;
const MAX_SIZE = 180;
const PREFIX_URL = `${STORY_BASE_URL}/storage`;

const Stories = () => {
  const { data: stories } = useGetStoriesQuery();
  const { width, ref } = useParentSize();

  return (
    <div ref={ref} style={{ maxWidth: '100%' }}>
      <StoryViewer
        stories={stories?.map(s => ({
          img: `${PREFIX_URL}/${s?.content_preview}`,
          type: s?.content_type,
          content: `${PREFIX_URL}/${s?.content}`,
          description: s?.caption,
          title: s?.title,
          link: s?.link,
          buttonText: s?.button_text,
        }))}
        previewSlidesPerView={Math.max(
          1,
          width /
            (width < 420 ? MIN_SIZE : width < 840 ? MEDIUM_SIZE : MAX_SIZE)
        )}
        storySlidesPerView={Math.max(1, width / 500)}
        shape="rectangle"
        delay={7000}
      />
    </div>
  );
};

export default Stories;
