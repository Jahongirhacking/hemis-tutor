import DashedList from '@/components/DashedList';
import { ISchedule } from '@/services/dashboard/type';
import {
  formatUnixTimestampToDate,
  setTimeToTimestamp,
} from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Empty, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const ScheduleInDrawer = ({
  schedule,
  attendanceStatus,
}: {
  schedule?: ISchedule;
  attendanceStatus?:
    | 'none'
    | 'absent_off'
    | 'absent_on'
    | 'attended'
    | 'in_process';
}) => {
  const { t } = useTranslation();

  if (!schedule)
    return <Empty description={`${t('const.info')} ${t('const.not_found')}`} />;

  const AttendanceStatus = () => {
    if (attendanceStatus === 'absent_off')
      return (
        <Flex gap={5} className="absent_off-value">
          <span>{toFirstCapitalLetter(t('const.not_explicable'))}</span>
          <CloseCircleOutlined />
        </Flex>
      );
    if (attendanceStatus === 'absent_on')
      return (
        <Flex gap={5} className="absent_on-value">
          <span>{toFirstCapitalLetter(t('const.explicable'))}</span>
          <WarningOutlined />
        </Flex>
      );
    if (attendanceStatus === 'attended')
      return (
        <Flex gap={5} className="attended-value">
          <span>{toFirstCapitalLetter(t('const.attended'))}</span>
          <CheckCircleOutlined />
        </Flex>
      );
    if (attendanceStatus === 'in_process')
      return (
        <Flex gap={5} className="in_process-value">
          {toFirstCapitalLetter(t('const.in_process'))}
        </Flex>
      );
    return (
      <Flex gap={5} className="waiting-value">
        {toFirstCapitalLetter(t('const.waiting'))}
      </Flex>
    );
  };

  return (
    <Flex vertical gap={25} className="schedule-in-drawer">
      <Flex vertical gap={10}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {schedule?.subject?.name}
        </Typography.Title>
        <Flex wrap className="dashboard__details-list">
          <Typography.Text>{schedule?.trainingType?.name}</Typography.Text>
          <Typography.Text strong>
            {`
                        ${formatUnixTimestampToDate(schedule?.lesson_date)}
                        (${schedule?.lessonPair?.start_time} - ${schedule?.lessonPair?.end_time})`}
          </Typography.Text>
        </Flex>
      </Flex>
      <DashedList
        list={[
          {
            label: t('const.status'),
            value: <AttendanceStatus />,
          },
          {
            label: t('const.building'),
            value: schedule?.auditorium?.building.name,
          },
          {
            label: t('const.department'),
            value: schedule?.department?.name,
          },
          {
            label: t('const.auditorium'),
            value: schedule?.auditorium?.name,
          },
          {
            label: t('const.teacher'),
            value: schedule?.employee?.name,
          },
          {
            label: t('const.group'),
            value: schedule?.group?.name,
          },
          {
            label: t('const.language'),
            value: schedule?.group?.educationLang?.name,
          },
          {
            label: t('const.interval'),
            value: `${Math.round(
              (setTimeToTimestamp(
                schedule?.lesson_date,
                schedule?.lessonPair?.end_time
              ) -
                setTimeToTimestamp(
                  schedule?.lesson_date,
                  schedule?.lessonPair?.start_time
                )) /
                60
            )} ${t('const.minute')}`,
          },
          {
            label: t('const.semester'),
            value: schedule?.semester?.name,
          },
          {
            label: t('const.academic_year'),
            value: schedule?.educationYear?.name,
          },
        ]}
      />
    </Flex>
  );
};

export default ScheduleInDrawer;
