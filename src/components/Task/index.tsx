import { RightOutlinedSVG } from '@/assets/icon';
import { ITaskList } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { convertDateToDayTimeString, getTaskStatus } from '@/utils/dateFunc';
import { Button, Card, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import style from './Task.module.scss';

const Task = ({
  task,
  onClick = () => {},
}: {
  label?: string;
  task: ITaskList;
  onClick?: () => void;
}) => {
  const now = useSelector((store: RootState) => store.currentTimeSlice);
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  const getStatusTag = (
    status: 'important' | 'marked' | 'new' | 'sent' | 'expired'
  ) => {
    switch (status) {
      case 'important':
        return (
          <Tag
            bordered={false}
            className={`${style['status-tag']} ${style['bg-important']}`}
          >
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[0]
            }
          </Tag>
        );
      case 'new':
        return (
          <Tag bordered={false} color="blue" className={style['status-tag']}>
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[1]
            }
          </Tag>
        );
      case 'sent':
        return (
          <Tag bordered={false} color="purple" className={style['status-tag']}>
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[2]
            }
          </Tag>
        );
      case 'marked':
        return (
          <Tag bordered={false} color="green" className={style['status-tag']}>
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[3]
            }
          </Tag>
        );
      case 'expired':
        return (
          <Tag bordered={false} color="red" className={style['status-tag']}>
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[4]
            }
          </Tag>
        );
      default:
        return (
          <Tag bordered={false} color="warning" className={style['status-tag']}>
            {
              (
                t('components.task.types', { returnObjects: true }) as string[]
              )[5]
            }
          </Tag>
        );
    }
  };

  return (
    <Card
      className={`task-card ${style['task-card']}`}
      hoverable
      style={{ width: '100%' }}
      onClick={handleClick}
    >
      <Flex vertical justify="space-between" align="center" gap={3}>
        <Flex
          className={style['task__header']}
          justify="space-between"
          style={{ width: '100%' }}
        >
          <Flex vertical gap={2}>
            <Typography.Text strong>{task?.taskType?.name}</Typography.Text>
            <Typography.Text>{task?.subject?.name}</Typography.Text>
          </Flex>
          <Button
            className={`details-btn ${style['details-btn']}`}
            icon={<RightOutlinedSVG />}
          />
        </Flex>
        <Flex
          className={style['task__body']}
          justify="space-between"
          align="flex-end"
          gap={10}
          wrap
          style={{ width: '100%' }}
        >
          <Flex gap={3} wrap>
            {getStatusTag(
              getTaskStatus(task?.taskStatus?.code, task?.deadline, now)
            )}
            {getTaskStatus(task?.taskStatus?.code, task?.deadline, now) ===
              'marked' && (
              <Tag
                className={style['mark-tag']}
                color="cyan"
                style={{ margin: 0 }}
              >
                {`${task?.studentTaskActivity?.mark} / ${task?.max_ball}`}
              </Tag>
            )}
          </Flex>
          <Flex
            className={style['task-info']}
            vertical
            gap={4}
            align="flex-end"
          >
            <Typography.Text>{task?.trainingType?.name}</Typography.Text>
            <Typography.Text className={style['deadline-wrapper']}>
              {t('components.task.deadline_text')}:
              <Typography.Text className={style['deadline-time']} strong>
                {convertDateToDayTimeString(task?.deadline)}
              </Typography.Text>
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Task;
