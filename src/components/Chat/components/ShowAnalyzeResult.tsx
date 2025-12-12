import { loading_1, loading_2 } from '@/assets/animations';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, CardProps, Flex, Typography } from 'antd';
import DOMPurify from 'dompurify';
import Lottie from 'lottie-react';
import ReactMarkdown from 'react-markdown';

const ShowAnalyzeResult = ({
  preLoading,
  loading,
  result,
  ...props
}: { preLoading: boolean; loading: boolean; result: string } & CardProps) => {
  return (
    <Card className="analyze-result-content" {...props}>
      {preLoading ? (
        <Flex
          gap={4}
          vertical
          align="center"
          style={{
            maxWidth: 'min(300px, 100%)',
            margin: 'auto',
            width: '100%',
          }}
        >
          <Lottie key={'loading-1'} animationData={loading_1} loop autoplay />
          <Flex gap={12} style={{ marginBottom: 20 }}>
            <LoadingOutlined />
            <Typography.Text strong>
              Muhim ma'lumotlar yuklanmoqda...
            </Typography.Text>
          </Flex>
        </Flex>
      ) : loading ? (
        <Flex
          gap={4}
          vertical
          align="center"
          style={{
            maxWidth: 'min(300px, 100%)',
            margin: 'auto',
            width: '100%',
          }}
        >
          <Lottie key={'loading-2'} animationData={loading_2} loop autoplay />
          <Flex gap={12} style={{ marginBottom: 20 }}>
            <LoadingOutlined />
            <Typography.Text strong>
              Ma'lumotlar tahlil qilinmoqda...
            </Typography.Text>
          </Flex>
        </Flex>
      ) : result ? (
        <AnimatedMessage>
          <div className={'analyze-result'}>
            <Typography.Paragraph className="animated-text-content">
              <ReactMarkdown>{DOMPurify.sanitize(result)}</ReactMarkdown>
            </Typography.Paragraph>
          </div>
        </AnimatedMessage>
      ) : (
        <NotFoundAnimation />
      )}
    </Card>
  );
};

export default ShowAnalyzeResult;
