import { Card, Flex, Progress, Skeleton } from 'antd';

const SubjectCardSkeleton = () => {
  return (
    <a className="subject-link">
      <Card className="subjects__card" hoverable>
        <Flex
          vertical
          gap={12}
          justify="space-between"
          style={{ minHeight: '144px' }}
        >
          <Skeleton active />

          <Flex
            className="subject__task-completion"
            align="flex-end"
            wrap
            style={{ rowGap: '10px', columnGap: '20px' }}
          >
            <Skeleton.Button size="small" active />
            <Progress
              status="active"
              percent={0}
              showInfo={false}
              style={{ flex: 1, minWidth: '160px' }}
            />
          </Flex>
        </Flex>
      </Card>
    </a>
  );
};

export default SubjectCardSkeleton;
