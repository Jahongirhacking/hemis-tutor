import { Card, Flex, Skeleton } from 'antd';
import { ReactElement } from 'react';

const DashboardCardSkeleton = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  return (
    <Card className="dashboard__card">
      <Flex
        className="card__header"
        justify="space-between"
        align="center"
        wrap
        gap={10}
      >
        <Skeleton.Input size="large" />
      </Flex>
      <Flex className="card__body" vertical gap={4}>
        {children ?? <Skeleton active />}
      </Flex>
    </Card>
  );
};

export default DashboardCardSkeleton;
