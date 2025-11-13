import { Flex, Skeleton } from 'antd';

const BookDetailSkeleton = () => {
  return (
    <Flex vertical gap={30} style={{ width: '100%' }}>
      <Flex gap={10}>
        <Skeleton.Image active />
        <Flex vertical gap={10}>
          <Skeleton.Input active />
          <Skeleton.Input active size="small" />
        </Flex>
      </Flex>
      <Skeleton active />
    </Flex>
  );
};

export default BookDetailSkeleton;
