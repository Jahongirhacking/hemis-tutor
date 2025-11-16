import { RootState } from '@/store/store';
import { Flex, Tag, Typography } from 'antd';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const AcademicTitle = ({ children }: { children: ReactElement }) => {
  const { currentGroup, currentSemester } = useSelector(
    (store: RootState) => store.authSlice
  );

  return (
    <Flex vertical gap={18} wrap className="academic-title">
      <Flex gap={18} align="center">
        <Typography.Title level={4} style={{ margin: 0 }}>
          {currentGroup?.name}
        </Typography.Title>
        <Tag color="blue">{currentSemester?.name ?? '-'}</Tag>
      </Flex>
      {children}
    </Flex>
  );
};

export default AcademicTitle;
