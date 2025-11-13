import { Flex } from 'antd';
import React, { ReactElement } from 'react';

const GenerateSkeleton = ({
  children,
  numberOfRepetition = 1,
}: {
  children: ReactElement | ReactElement[];
  numberOfRepetition?: number;
}) => {
  return (
    <Flex
      wrap
      gap={15}
      className="skeleton-container"
      style={{ width: '100%' }}
    >
      {Array.from({ length: numberOfRepetition }).map((_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
    </Flex>
  );
};

export default GenerateSkeleton;
