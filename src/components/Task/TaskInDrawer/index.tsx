import FileList from '@/components/FileList';
import FileUploader from '@/components/FileUploader';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import TaskSkeleton from '@/components/Skeletons/TaskSkeleton';
import { getBaseUrl } from '@/services/api/const';
import {
  useGetTaskDetailMutation,
  useGetTaskUploadCheckMutation,
} from '@/services/dashboard';
import { Card, Divider, Empty, Flex, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Task from '..';
import './style.scss';

const TaskInDrawer = ({ taskId }: { taskId?: number }) => {
  const [getTaskDetail, { data: taskData, isLoading: isDetailLoading }] =
    useGetTaskDetailMutation();
  const [
    getTaskUploadCheck,
    { data: taskUploadData, isLoading: isCheckLoading },
  ] = useGetTaskUploadCheckMutation();
  const taskUpload = taskUploadData?.data;
  const { t } = useTranslation();

  useEffect(() => {
    getTaskDetail({ id: taskId });
    getTaskUploadCheck({ id: taskId });
  }, [getTaskDetail, getTaskUploadCheck, taskId]);

  const task = taskData?.data;

  if (isDetailLoading || isCheckLoading)
    return (
      <GenerateSkeleton>
        <Flex vertical gap={40} style={{ width: '100%' }}>
          <TaskSkeleton status="new" />
          <Skeleton active />
          <Skeleton active />
        </Flex>
      </GenerateSkeleton>
    );

  if (!task)
    return (
      <Empty description={t('components.task.task_in_drawer.empty_text')} />
    );

  return (
    <Flex className="task-in-drawer" vertical gap={16}>
      <Card className="task-in-drawer__card card-1">
        <Task task={task} />
        <Divider />
        <Flex className="task-in-drawer__score">
          <Flex vertical align="center" flex={1}>
            <Typography.Title level={1} style={{ margin: 0 }}>
              {task?.studentTaskActivity?.mark ?? 0}
            </Typography.Title>
            <Typography.Text strong>
              {t('components.task.task_in_drawer.score_text')}
            </Typography.Text>
          </Flex>
          <Flex vertical align="center" flex={1}>
            <Typography.Title level={1} style={{ margin: 0 }}>
              {task?.max_ball}
            </Typography.Title>
            <Typography.Text strong>
              {t('components.task.task_in_drawer.max_score_text')}
            </Typography.Text>
          </Flex>
          <Flex vertical align="center" flex={1}>
            <Typography.Title level={1} style={{ margin: 0 }}>
              {task?.studentTaskActivity?.mark
                ? Math.round(
                    (task?.studentTaskActivity?.mark / task?.max_ball) * 100
                  )
                : 0}
              <span style={{ fontSize: '16px' }}>%</span>
            </Typography.Title>
            <Typography.Text strong>
              {t('components.task.task_in_drawer.result_text')}
            </Typography.Text>
          </Flex>
        </Flex>
      </Card>

      <Card className="task-in-drawer__card card-2">
        <Flex vertical>
          <Typography.Text strong style={{ fontSize: '16px' }}>
            {t('components.task.task_in_drawer.task_info_title')}
          </Typography.Text>
          <Flex vertical>
            <Typography.Text strong style={{ fontSize: '12px' }}>
              {t('components.task.task_in_drawer.task_info_comment_text')}
            </Typography.Text>
            <Typography.Text style={{ fontSize: '12px' }}>
              {task?.comment}
            </Typography.Text>
          </Flex>
          <Divider />
          <FileList files={task?.files} />
        </Flex>
      </Card>

      <Card className="task-in-drawer__card card-3">
        <Flex vertical>
          <Typography.Text strong>
            {t('components.task.task_in_drawer.task_submit_title')}
          </Typography.Text>
          <Divider />
          <FileUploader
            url={getBaseUrl(`/education/task-upload?task=${taskId}`, false)}
            task={task}
            maxNumberOfFiles={taskUpload?.maxFiles}
            maxSizeOfFile={taskUpload?.fileSize}
            submittable={taskUpload?.submit}
            extensions={taskUpload?.extensions}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default TaskInDrawer;
