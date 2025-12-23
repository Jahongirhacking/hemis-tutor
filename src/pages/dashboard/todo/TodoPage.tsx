import { useGetTaskListQuery, useUpdateTaskMutation } from '@/services/profile';
import { TaskStatus } from '@/services/profile/type';
import { RootState } from '@/store/store';
import { PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Calendar,
  Card,
  Empty,
  Flex,
  Progress,
  Skeleton,
  Spin,
  Tag,
  Typography,
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { MapPin } from 'lucide-react';
import moment, { Moment } from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './TodoPage.scss';
import CreateTodoModal, {
  CREATE_TODO_PARAM,
} from './components/CreateTodoModal';
import TodoCard from './components/TodoCard';
import TodoDetailsModal from './components/TodoDetailsModal';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const MAX_ELEMS = 100;
const TODOS_SECTION = 'todos-section';

const TodoPage = () => {
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleDate, setVisibleDate] = useState<{
    date: Moment;
    mode: 'year' | 'month';
  }>({ date: moment(), mode: 'month' });
  const { data: todos, isFetching: isTodosFetching } = useGetTaskListQuery({
    from_date: visibleDate?.date
      ?.clone()
      ?.startOf(visibleDate?.mode)
      ?.format(DATE_FORMAT.split(' ')?.[0]),
    to_date: visibleDate?.date
      ?.clone()
      ?.endOf(visibleDate?.mode)
      ?.format(DATE_FORMAT.split(' ')?.[0]),
    date_type: 'due_at',
    per_page: MAX_ELEMS,
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [updateTask] = useUpdateTaskMutation();

  const getTodosForDate = useCallback(
    (date: Dayjs) => {
      return todos?.result?.tasks?.filter(todo =>
        moment(todo?.due_at, DATE_FORMAT).isSame(
          moment(date.toDate()),
          visibleDate?.mode === 'year' ? 'month' : 'day'
        )
      );
    },
    [todos, visibleDate]
  );

  const dateCellRender = useCallback(
    (date: Dayjs) => {
      const dayTodos = getTodosForDate(date);
      if (dayTodos?.length === 0) return null;
      const completedCount = dayTodos?.filter(
        todo => todo?.status === TaskStatus.Completed
      )?.length;
      const isAllCompleted = completedCount === dayTodos?.length;
      return (
        <div className="calendar-cell">
          <Badge
            count={dayTodos?.length}
            style={{
              backgroundColor: isAllCompleted ? '#14b8a6' : '#f59e0b',
              boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)',
            }}
          />
        </div>
      );
    },
    [getTodosForDate]
  );

  const handleDateSelect = useCallback(
    (date: Dayjs) => {
      setSelectedDate(date);
      document.getElementById(TODOS_SECTION)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [setSelectedDate]
  );

  const handlePanelChange = useCallback(
    (date: dayjs.Dayjs, mode: 'month' | 'year') => {
      setVisibleDate({ date: moment(date?.toDate()), mode });
    },
    []
  );

  const handleToggleTodo = useCallback(
    async (taskId: number, value: boolean) => {
      try {
        await updateTask({
          id: taskId,
          status: value ? TaskStatus.Completed : TaskStatus.InProgress,
        }).unwrap();
      } catch (err) {
        console.error(err);
      }
    },
    [updateTask]
  );

  const completedTasksNumber = useMemo(
    () =>
      todos?.result?.tasks?.reduce(
        (acc, curr) => acc + Number(curr?.status === TaskStatus.Completed),
        0
      ),
    [todos]
  );

  const todayTodos = getTodosForDate(selectedDate);

  return (
    <div className="todo-page upper-element">
      <Flex vertical gap={24}>
        {/* Header */}
        <Card
          className="todo-header"
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
        >
          <Flex justify="space-between" align="center" wrap gap={16}>
            <Flex align="center" gap={12} wrap>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background:
                    'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
                }}
              >
                <MapPin size={24} color="white" />
              </div>
              <div>
                <Typography.Title
                  level={2}
                  style={{ margin: 0, marginBottom: '4px' }}
                >
                  Vazifalar kalendari
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
                  Kunlik vazifalaringizni boshqaring
                </Typography.Text>
              </div>
            </Flex>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set(CREATE_TODO_PARAM, 'ok');
                setSearchParams(params);
              }}
              size="large"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
              }}
            >
              Vazifa qo'shish
            </Button>
          </Flex>
        </Card>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card
            className="stat-card"
            style={{
              background:
                themeColor === 'dark'
                  ? 'rgba(20, 184, 166, 0.1)'
                  : 'rgba(20, 184, 166, 0.05)',
              border:
                themeColor === 'dark'
                  ? '1px solid rgba(20, 184, 166, 0.2)'
                  : '1px solid rgba(20, 184, 166, 0.1)',
            }}
          >
            <Flex vertical gap={8}>
              <Typography.Text type="secondary">Jami vazifalar</Typography.Text>
              <Typography.Title
                level={2}
                style={{ margin: 0, color: '#14b8a6' }}
              >
                {!isTodosFetching ? todos?.result?.tasks?.length : <Spin />}
              </Typography.Title>
            </Flex>
          </Card>

          <Card
            className="stat-card"
            style={{
              background:
                themeColor === 'dark'
                  ? 'rgba(34, 197, 94, 0.1)'
                  : 'rgba(34, 197, 94, 0.05)',
              border:
                themeColor === 'dark'
                  ? '1px solid rgba(34, 197, 94, 0.2)'
                  : '1px solid rgba(34, 197, 94, 0.1)',
            }}
          >
            <Flex vertical gap={8}>
              <Typography.Text type="secondary">Bajarilgan</Typography.Text>
              <Typography.Title
                level={2}
                style={{ margin: 0, color: '#22c55e' }}
              >
                {!isTodosFetching ? completedTasksNumber : <Spin />}
              </Typography.Title>
            </Flex>
          </Card>

          <Card
            className="stat-card"
            style={{
              background:
                themeColor === 'dark'
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(245, 158, 11, 0.05)',
              border:
                themeColor === 'dark'
                  ? '1px solid rgba(245, 158, 11, 0.2)'
                  : '1px solid rgba(245, 158, 11, 0.1)',
            }}
          >
            <Flex vertical gap={8}>
              <Typography.Text type="secondary">Tugallanmagan</Typography.Text>
              <Typography.Title
                level={2}
                style={{ margin: 0, color: '#f59e0b' }}
              >
                {!isTodosFetching ? (
                  todos?.result?.tasks?.length - completedTasksNumber
                ) : (
                  <Spin />
                )}
              </Typography.Title>
            </Flex>
          </Card>
        </div>

        {/* Today's Tasks */}
        <Card
          className="tasks-card"
          id={TODOS_SECTION}
          title={
            <Flex justify="space-between" wrap align="center" gap={12}>
              <Flex align="center" gap={12}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {selectedDate?.format('DD.MM.YYYY')} - Vazifalar
                </Typography.Title>
                <Tag color={todayTodos?.length > 0 ? 'cyan' : 'default'}>
                  {todayTodos?.length
                    ? `${todayTodos?.length} ta vazifa`
                    : "Vazifa yo'q"}
                </Tag>
              </Flex>
              <Progress
                className="max-w-[min(100%,400px)] flex-1 min-w-[min(180px,100%)]"
                percent={
                  Math.round(
                    (todayTodos?.reduce(
                      (acc, curr) =>
                        acc + Number(curr?.status === TaskStatus.Completed),
                      0
                    ) /
                      (todayTodos?.length || Infinity)) *
                      100
                  ) || 0
                }
              />
            </Flex>
          }
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
        >
          <Flex vertical gap={12}>
            {isTodosFetching ? (
              <Skeleton active />
            ) : todayTodos?.length === 0 ? (
              <Flex
                justify="center"
                align="center"
                style={{ minHeight: '200px' }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Bu sana uchun vazifa yo'q"
                />
              </Flex>
            ) : (
              [...(todayTodos || [])]
                ?.sort(
                  (a, b) =>
                    moment(a?.due_at, DATE_FORMAT)?.unix() -
                    moment(b?.due_at, DATE_FORMAT)?.unix()
                )
                ?.map(todo => (
                  <TodoCard
                    key={todo?.id}
                    handleToggleTodo={handleToggleTodo}
                    todo={todo}
                  />
                ))
            )}
          </Flex>
        </Card>

        {/* Calendar */}
        <Card
          className="calendar-card"
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
        >
          <Calendar
            cellRender={dateCellRender}
            onSelect={handleDateSelect}
            onPanelChange={handlePanelChange}
            value={selectedDate}
            className="todo-calendar"
          />
        </Card>
      </Flex>

      {/* Date Details Modal */}
      <TodoDetailsModal handleToggleTodo={handleToggleTodo} />

      {/* Add Todo Modal */}
      <CreateTodoModal />
    </div>
  );
};

export default TodoPage;
