import { Flex, Skeleton } from 'antd';

const ExamTableSkeleton = ({
  items,
}: {
  items: ('completed' | 'processing' | 'future')[][];
}) => {
  return (
    <Flex vertical gap={16} style={{ width: '100%' }}>
      {items?.map((item, index) => (
        <Flex className={`exam-table exam-table-skeleton`} gap={4} key={index}>
          <Flex
            vertical
            justify="center"
            align="center"
            className="left"
            gap={4}
          >
            <Skeleton.Button active size="small" />
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="small" />
          </Flex>
          <Flex
            vertical
            className="exam-day-container"
            gap={5}
            align="flex-start"
          >
            {item?.map((color, index) => (
              <Flex
                key={index}
                align="center"
                justify="center"
                gap={16}
                className={`right ${color}-card`}
              >
                <Flex className="content" vertical gap={6}>
                  <Skeleton active />
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ExamTableSkeleton;
