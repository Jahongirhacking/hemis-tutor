import {
  getTaskPriorityName,
  ITask,
  TaskPriority,
  TaskStatus,
} from '@/services/profile/type';
import { RootState } from '@/store/store';
import { Card, Checkbox, Flex, Tag, Typography } from 'antd';
import { Check, LucideClockFading, XIcon } from 'lucide-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TODO_DETAILS_PARAM } from './TodoDetailsModal';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const TodoCard = ({
  todo,
  handleToggleTodo,
}: {
  todo: ITask;
  handleToggleTodo: (taskId: number, value: boolean) => void;
}) => {
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Card
      className={`task-item ${todo?.status === TaskStatus.Completed ? 'completed' : ''}`}
      style={{
        background:
          todo?.status === TaskStatus.Completed
            ? themeColor === 'dark'
              ? 'rgba(20, 184, 166, 0.1)'
              : 'rgba(20, 184, 166, 0.05)'
            : themeColor === 'dark'
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.02)',
        border:
          todo?.status === TaskStatus.Completed
            ? '1px solid rgba(20, 184, 166, 0.3)'
            : '1px solid rgba(148, 163, 184, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      hoverable
      onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.set(TODO_DETAILS_PARAM, String(todo?.id));
        setSearchParams(params);
      }}
    >
      <Flex gap={12} align="start">
        <Checkbox
          checked={todo?.status === TaskStatus.Completed}
          onChange={e => handleToggleTodo(todo?.id, e?.target?.checked)}
          style={{ marginTop: '4px' }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        <Flex vertical gap={8} style={{ flex: 1 }}>
          <Flex justify="space-between" align="center" wrap gap={8}>
            <Typography.Text
              strong
              style={{
                fontSize: '16px',
                textDecoration:
                  todo?.status === TaskStatus.Completed
                    ? 'line-through'
                    : 'none',
                opacity: todo?.status === TaskStatus.Completed ? 0.6 : 1,
              }}
            >
              {todo?.title}
            </Typography.Text>
            {todo?.due_at && (
              <Tag color="blue" style={{ margin: 0 }}>
                {moment(todo?.due_at, DATE_FORMAT).format('DD.MM.YYYY HH:mm')}
              </Tag>
            )}
          </Flex>
          {todo?.description && (
            <Typography.Text
              type="secondary"
              style={{
                fontSize: '14px',
                opacity: todo?.status === TaskStatus.Completed ? 0.5 : 0.7,
              }}
            >
              {todo?.description}
            </Typography.Text>
          )}

          <Flex gap={12} wrap align="center">
            <Tag
              color={
                todo?.priority === TaskPriority.High
                  ? 'red'
                  : todo?.priority === TaskPriority?.Medium
                    ? 'orange'
                    : 'green'
              }
            >
              {getTaskPriorityName(todo?.priority)}
            </Tag>
            <Tag
              className="flex gap-1 items-center"
              {...(todo?.status === TaskStatus.Completed
                ? {
                    icon: <Check size={16} />,
                    color: 'green',
                  }
                : todo?.status === TaskStatus.Rejected
                  ? {
                      icon: <XIcon size={16} />,
                      color: 'red',
                    }
                  : {
                      icon: <LucideClockFading size={16} />,
                      color: 'blue',
                    })}
            >
              {todo?.status_label}
            </Tag>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TodoCard;
