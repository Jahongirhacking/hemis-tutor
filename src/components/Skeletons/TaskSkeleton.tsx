import { Card, Flex, Skeleton } from 'antd';
import style from 'antd/es/affix/style';

const TaskSkeleton = ({ status }: { status: 'new' | 'sent' }) => {
  return (
    <Card className={`task-card-skeleton`} hoverable style={{ width: '100%' }}>
      <Flex
        vertical
        justify="space-between"
        align="center"
        gap={3}
        style={{ padding: 12 }}
      >
        <Flex
          className={style['task__header']}
          justify="space-between"
          style={{ width: '100%' }}
        >
          <Flex vertical gap={2}>
            <Skeleton.Input active size="large" style={{ height: 22 }} />
            <Skeleton.Input active size="small" style={{ height: 16 }} />
          </Flex>
          <Skeleton.Button size="small" shape="circle" active />
        </Flex>
        <Flex
          justify="space-between"
          align="flex-end"
          gap={10}
          wrap
          style={{ width: '100%' }}
        >
          <Skeleton.Button
            active
            style={{
              backgroundColor: status === 'new' ? '#008fff4d' : '#9900ff4d',
              height: 20,
            }}
          />
          <Flex vertical gap={4} align="flex-end">
            <Skeleton.Input size="small" style={{ height: 16 }} />
            <Skeleton.Input size="large" style={{ height: 16 }} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TaskSkeleton;
