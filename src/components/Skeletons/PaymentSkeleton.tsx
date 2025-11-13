import { Flex, Skeleton } from 'antd';

const PaymentSkeleton = () => {
  return (
    <Flex className="contract-section" vertical gap={20}>
      <Flex className="payment__card" vertical gap={24}>
        <Skeleton.Button active />
        <Skeleton active />
        <Skeleton active />
      </Flex>
    </Flex>
  );
};

export default PaymentSkeleton;
