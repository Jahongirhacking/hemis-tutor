import { ITask, TaskStatus } from '@/services/profile/type';
import { RootState } from '@/store/store';
import { Card, CardProps, Flex, Progress, Typography } from 'antd';
import { useSelector } from 'react-redux';

const TodoProgress = ({ todos, ...props }: CardProps & { todos: ITask[] }) => {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  const percent =
    (todos?.filter(t => t?.status === TaskStatus.Completed)?.length /
      (todos?.length || Infinity)) *
      100 || 0;

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
          <Typography.Text strong>Joriy progress</Typography.Text>
          <Typography.Text
            strong
            style={{ color: '#14b8a6', fontSize: '18px' }}
          >
            {Math.round(percent)}%
          </Typography.Text>
        </Flex>
        <Progress
          percent={percent}
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
