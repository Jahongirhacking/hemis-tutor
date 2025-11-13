import { Flex, FlexProps, Image } from 'antd';

const AiLogo = (props: Omit<FlexProps, 'children'>) => {
  return (
    <Flex gap={10} className="ai-logo" align="flex-end" {...props}>
      <Image preview={false} src="/images/ai-logo.png" />
    </Flex>
  );
};

export default AiLogo;
