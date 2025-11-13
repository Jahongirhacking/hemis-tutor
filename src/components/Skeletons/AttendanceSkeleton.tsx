import { Flex, Skeleton } from 'antd';

const AttendanceSkeleton = () => {
  return (
    <Flex vertical gap={25} style={{ width: '100%' }}>
      <Flex gap={16} className="attendance-skeleton">
        {Array.from({ length: 6 }).map((_, index) => (
          <Flex key={index} vertical gap={14}>
            <Skeleton.Button active />
            <Skeleton.Input active size="small" />
          </Flex>
        ))}
      </Flex>
      <Skeleton active />
    </Flex>
  );
};

export default AttendanceSkeleton;
