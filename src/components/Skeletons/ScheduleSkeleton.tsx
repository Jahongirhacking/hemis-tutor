import { RootState } from '@/store/store';
import { Card, Flex, Skeleton } from 'antd';
import { useSelector } from 'react-redux';

const ScheduleSkeleton = ({
  status,
}: {
  status: 'completed' | 'processing' | 'future';
}) => {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);

  const colors = {
    completed: themeColor === 'dark' ? '#291321' : '#fff0f6',
    processing: themeColor === 'dark' ? '#162312' : '#f6ffed',
    future: themeColor === 'dark' ? '#111A2C' : '#e6f4ff',
  };

  return (
    <Card
      className={`schedule-card schedule-card-skeleton schedule-card-skeleton-${status}`}
      style={{
        backgroundColor:
          status === 'completed'
            ? colors.completed
            : status === 'processing'
              ? colors.processing
              : colors.future,
      }}
      hoverable
    >
      <Flex
        vertical
        style={{
          minHeight: `82px`,
          maxHeight: `82px`,
          overflowY: 'auto',
          scrollbarColor: `${status === 'completed' ? '#c41d7e30' : status === 'future' ? '#0958d930' : '#389e0d30'} transparent`,
        }}
        justify="space-between"
        gap={8}
      >
        <Skeleton.Input active size="large" style={{ height: 15 }} />
        <Skeleton.Input active size="default" style={{ height: 15 }} />
        <Skeleton.Input active size="small" style={{ height: 15 }} />
      </Flex>
    </Card>
  );
};

export default ScheduleSkeleton;
