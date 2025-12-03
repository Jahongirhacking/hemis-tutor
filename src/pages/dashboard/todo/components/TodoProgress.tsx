import { Card, CardProps, Flex, Progress, Typography } from 'antd';

const COMPLETION_PERCENT = 10;

const TodoProgress = ({
  themeColor,
  ...props
}: { themeColor: 'dark' | 'light' } & CardProps) => {
  return (
    <Card
      className="progress-card"
      style={{
        background:
          themeColor === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border:
          themeColor === 'dark'
            ? '1px solid rgba(20, 184, 166, 0.1)'
            : '1px solid rgba(20, 184, 166, 0.08)',
      }}
      {...props}
    >
      <Flex vertical gap={12}>
        <Flex justify="space-between" align="center">
          <Typography.Text strong>Kunlik progress</Typography.Text>
          <Typography.Text
            strong
            style={{ color: '#14b8a6', fontSize: '18px' }}
          >
            {COMPLETION_PERCENT}%
          </Typography.Text>
        </Flex>
        <Progress
          percent={COMPLETION_PERCENT}
          strokeColor={{
            '0%': '#14b8a6',
            '100%': '#0d9488',
          }}
          showInfo={false}
          size="small"
        />
      </Flex>
    </Card>
  );
};

export default TodoProgress;
