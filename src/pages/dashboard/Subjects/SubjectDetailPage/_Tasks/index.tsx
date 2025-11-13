import Task from '@/components/Task';
import { ISubject, ITaskList } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { RootState } from '@/store/store';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { getTaskStatus } from '@/utils/dateFunc';
import { Badge, Empty, Flex, Skeleton, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './style.scss';

interface ITasksData {
  key?: string;
  label: string;
  items: ITaskList[];
}

const Tasks = ({ tasks: data }: { tasks: ISubject }) => {
  const tasks = data?.tasks;
  const now = useSelector((store: RootState) => store.currentTimeSlice);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleClickTask = (task: ITaskList) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.Task);
    newParams.set(
      SearchParams.DrawerProps,
      JSON.stringify({ taskId: task.id })
    );
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('dashboard.dashboard_page.tasks.drawer_title'),
      })
    );
  };

  const tasksData: ITasksData[] = [
    {
      key: 'important',
      label: (
        t('dashboard.subjects_page.subject_detail.task_types', {
          returnObjects: true,
        }) as string[]
      )[0],
      items: [
        ...tasks.filter(
          task =>
            getTaskStatus(task?.taskStatus?.code, task?.deadline, now) ===
            'important'
        ),
      ],
    },
    {
      key: 'new',
      label: (
        t('dashboard.subjects_page.subject_detail.task_types', {
          returnObjects: true,
        }) as string[]
      )[1],
      items: [
        ...tasks.filter(
          task =>
            getTaskStatus(task?.taskStatus?.code, task?.deadline, now) === 'new'
        ),
      ],
    },
    {
      key: 'sent',
      label: (
        t('dashboard.subjects_page.subject_detail.task_types', {
          returnObjects: true,
        }) as string[]
      )[2],
      items: [
        ...tasks.filter(
          task =>
            getTaskStatus(task?.taskStatus?.code, task?.deadline, now) ===
            'sent'
        ),
      ],
    },
    {
      key: 'marked',
      label: (
        t('dashboard.subjects_page.subject_detail.task_types', {
          returnObjects: true,
        }) as string[]
      )[3],
      items: [
        ...tasks.filter(
          task =>
            getTaskStatus(task?.taskStatus?.code, task?.deadline, now) ===
            'marked'
        ),
      ],
    },
    {
      key: 'expired',
      label: (
        t('dashboard.subjects_page.subject_detail.task_types', {
          returnObjects: true,
        }) as string[]
      )[4],
      items: [
        ...tasks.filter(
          task =>
            getTaskStatus(task?.taskStatus?.code, task?.deadline, now) ===
            'expired'
        ),
      ],
    },
  ];

  if (!tasksData) return <Skeleton active />;

  return (
    <Flex gap={4} className="tasks-container">
      {tasksData?.map(taskData => (
        <Flex
          key={taskData.key}
          className={`tasks__column ${taskData.key}-column`}
          vertical
          gap={8}
        >
          <Flex className="column__header" gap={4} align="center">
            <Typography.Title level={5} style={{ margin: 0 }}>
              {taskData.label}
            </Typography.Title>
            <Badge
              count={taskData.items.length}
              showZero
              color="#F5F5F5"
              style={{ color: '#000' }}
            />
          </Flex>
          <Flex
            className="tasks__cards-wrapper"
            vertical
            align="center"
            gap={8}
          >
            {taskData.items?.length !== 0 ? (
              <>
                {taskData.items.map((task, ind) => (
                  <Task
                    key={ind}
                    task={task}
                    label={taskData.label}
                    onClick={() => handleClickTask(task)}
                  />
                ))}
              </>
            ) : (
              <Empty
                description={t(
                  'dashboard.subjects_page.subject_detail.empty_task'
                )}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default Tasks;
