import { AiLogoIconSVG } from '@/assets/icon';
import { Flex, Typography } from 'antd';

const ResultTitle = () => {
  return (
    <Flex gap={4} align="center">
      <AiLogoIconSVG />
      <Typography.Title level={5}>Tahlil natijasi</Typography.Title>
    </Flex>
  );
};

export default ResultTitle;
