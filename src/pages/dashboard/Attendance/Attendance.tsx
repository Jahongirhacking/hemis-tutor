import AttendanceDetailsList from '@/components/Attendance/AttendanceDetailsList';
import AnalyzeButton from '@/components/Chat/AnalyzeButton';
import AttendanceTableSkeleton from '@/components/Skeletons/AttendanceTableSkeleton';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import {
  useGetAttendeanceListMutation,
  useGetScheduleListMutation,
} from '@/services/dashboard';
import { IAttendance, IBaseCode } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { RootState } from '@/store/store';
import { ChatTopic, DrawerChildTypes, SearchParams } from '@/utils/config';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import {
  Button,
  Empty,
  Flex,
  Spin,
  Switch,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './main.scss';

interface IAbsentProps {
  absent_off: number;
  absent_on: number;
}

interface IAttendanceDataByScienceProps {
  id: number;
  subjectName: string;
  trainingTypes: Map<string, IAbsentProps>;
  employees: Set<string>;
  subject: IBaseCode;
}

export const AttendancePage = () => {
  const [getAttendance, { data: attendanceList, isLoading, isSuccess }] =
    useGetAttendeanceListMutation();
  const attendance = attendanceList?.data;
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const [getSchedules, { data: scheduleList, isLoading: isScheduleLoading }] =
    useGetScheduleListMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isByScience, setIsByScience] = useState(
    getLocalStorage(localStorageNames.isAttendanceByScience) ?? false
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleShowDetails = ({ subject }: { subject: IBaseCode }): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.AttendanceDetail);
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.in_detail'),
        props: {
          subject,
          attendance,
          schedules: scheduleList?.data,
          isScheduleLoading,
        },
      })
    );
  };

  const handleSwitch = (value: boolean) => {
    setLocalStorage(localStorageNames?.isAttendanceByScience, value);
    setIsByScience(value);
  };

  const attendanceDataByHours = attendance?.map((item, index) => ({
    ...item,
    subjectName: item?.subject?.name,
    id: index,
  }));

  const attendanceMapByScience = new Map<
    string,
    IAttendanceDataByScienceProps
  >();
  attendance?.forEach((element, index) => {
    // check if subject exists
    if (attendanceMapByScience.has(element?.subject?.name)) {
      const attendanceByScience = attendanceMapByScience.get(
        element?.subject?.name
      );
      // check if training type exists else create new
      // add absent hours
      if (attendanceByScience.trainingTypes.has(element?.trainingType?.name)) {
        const attendanceTrainingType = attendanceByScience.trainingTypes.get(
          element?.trainingType?.name
        );
        attendanceTrainingType.absent_off += element?.absent_off;
        attendanceTrainingType.absent_on += element?.absent_on;
      } else {
        attendanceByScience.trainingTypes.set(element?.trainingType?.name, {
          absent_on: element?.absent_on,
          absent_off: element?.absent_off,
        });
      }
      // add employees
      attendanceByScience.employees.add(element?.employee.name);
    } else {
      // else create new subject
      const attendanceMapByTrainingTypes = new Map<string, IAbsentProps>();
      attendanceMapByTrainingTypes.set(element?.trainingType?.name, {
        absent_on: element?.absent_on,
        absent_off: element?.absent_off,
      });
      attendanceMapByScience.set(element?.subject?.name, {
        id: index,
        subjectName: element?.subject?.name,
        subject: element?.subject,
        employees: new Set<string>([element?.employee?.name]),
        trainingTypes: attendanceMapByTrainingTypes,
      });
    }
  });

  const columns: TableColumnsType<any> = [
    {
      title: t('const.subjects') as string,
      dataIndex: 'subjectName',
      key: 'subjectName',
      // ...getColumnSearchProps('subjectName'),
      filters: [...new Set(attendance?.map(item => item?.subject?.name))].map(
        name => ({
          text: name,
          value: name,
        })
      ),
      onFilter: (value, record: IAttendance) => record?.subject?.name === value,
    },
    {
      title: t('const.lesson_date') as string,
      dataIndex: 'date',
      key: 'date',
      className: 'attendance-date-column',
      render: (_, record: IAttendance) =>
        moment.unix(record?.lesson_date).format('DD.MM.YYYY'),
    },
    {
      title: t('const.training') as string,
      dataIndex: 'type',
      key: 'type',
      className: 'attendance-type-column',
      filters: [
        ...new Set(attendance?.map(item => item?.trainingType?.name)),
      ].map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record: IAttendance) =>
        record?.trainingType?.name === value,
      render: (_, record: IAttendance) => record?.trainingType?.name,
    },
    {
      title: toFirstCapitalLetter(t('const.explicable')),
      key: 'isSababli',
      className: 'attendance-explicable-column',
      filters: [
        {
          text: (
            <Tag color="green">
              {toFirstCapitalLetter(t('const.explicable'))}
            </Tag>
          ),
          value: true,
        },
        {
          text: (
            <Tag color="magenta">
              {toFirstCapitalLetter(t('const.not_explicable'))}
            </Tag>
          ),
          value: false,
        },
      ],
      onFilter: (value, record: IAttendance) => record.explicable === value,
      render: (_, record: IAttendance) =>
        record?.explicable ? (
          <Tag color="green">{t('const.yes')}</Tag>
        ) : (
          <Tag color="magenta">{t('const.no')}</Tag>
        ),
    },
    {
      title: toFirstCapitalLetter(t('const.hours_plural')),
      key: 'hours',
      dataIndex: 'hours',
      render: (_, record: IAttendance) =>
        record?.explicable ? (
          <Tag color="green">2</Tag>
        ) : (
          <Tag color="magenta">2</Tag>
        ),
    },
    {
      title: t('const.staff') as string,
      key: 'stuff',
      dataIndex: 'stuff',
      className: 'attendance-employee-column',
      render: (_, record: IAttendance) => record?.employee?.name,
    },
    {
      title: t('const.actions') as string,
      key: 'actions',
      dataIndex: 'actions',
      className: 'attendance-actions-column',
      render: (_, record: IAttendance) => (
        <Button
          type="link"
          onClick={() => handleShowDetails({ subject: record?.subject })}
        >
          {t('const.in_detail')}
        </Button>
      ),
    },
  ];

  const columnsBySubjects: TableColumnsType<any> = [
    {
      title: t('const.subjects') as string,
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: t('const.training') as string,
      dataIndex: 'type',
      key: 'type',
      className: 'attendance-type-column',
      render: (_, record) => (
        <Flex vertical gap={5}>
          {Array.from(record?.trainingTypes?.keys())?.map((key: string) => (
            <Flex wrap gap={8} key={key}>
              <Typography.Text style={{ minWidth: '70px' }}>
                {key}:{' '}
              </Typography.Text>
              <Flex gap={3}>
                {record?.trainingTypes?.get(key)?.absent_off ? (
                  <Tag color="magenta">
                    {record?.trainingTypes?.get(key)?.absent_off}
                  </Tag>
                ) : null}
                {record?.trainingTypes?.get(key)?.absent_on ? (
                  <Tag color="green">
                    {record?.trainingTypes?.get(key)?.absent_on}
                  </Tag>
                ) : null}
              </Flex>
            </Flex>
          ))}
        </Flex>
      ),
    },
    {
      title: toFirstCapitalLetter(t('const.hours_plural')),
      key: 'hours',
      dataIndex: 'hours',
      render: (_, record) => {
        const total_absent_on =
          (Array.from(record?.trainingTypes?.values())?.reduce(
            (acc: number, curr: IAbsentProps) => acc + curr?.absent_on,
            0
          ) as number) || 0;
        const total_absent_off =
          (Array.from(record?.trainingTypes?.values())?.reduce(
            (acc: number, curr: IAbsentProps) => acc + curr?.absent_off,
            0
          ) as number) || 0;

        return (
          <Flex gap={5}>
            {total_absent_off ? (
              <Tag
                style={{ fontSize: '11pt', fontWeight: 'bold' }}
                color="magenta"
              >
                {total_absent_off}
              </Tag>
            ) : null}
            {total_absent_on ? (
              <Tag
                style={{ fontSize: '11pt', fontWeight: 'bold' }}
                color="green"
              >
                {total_absent_on}
              </Tag>
            ) : null}
          </Flex>
        );
      },
    },
    {
      title: t('const.staff') as string,
      key: 'stuff',
      dataIndex: 'stuff',
      className: 'attendance-employee-column',
      render: (_, record) => Array.from(record?.employees).join(', '),
    },
    {
      title: t('const.actions') as string,
      key: 'actions',
      dataIndex: 'actions',
      className: 'attendance-actions-column',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleShowDetails({ subject: record?.subject })}
        >
          {t('const.in_detail')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getAttendance({
      semester: currentSemester?.code,
    });
  }, [getAttendance, currentSemester]);

  useEffect(() => {
    if (currentSemester && currentSemester.code) {
      getSchedules({ semester: currentSemester?.code });
    }
  }, [getSchedules, currentSemester?.code]);

  return (
    <section className="attendance upper-element">
      <Flex wrap gap={12} justify="space-between" align="center">
        <Typography.Title
          level={2}
          className="section_title"
          style={{ margin: 0 }}
        >
          {t('dashboard.dashboard_page.attendances.title')}
        </Typography.Title>
        <Flex gap={8} align="center" justify="space-between">
          <Switch size="small" value={isByScience} onChange={handleSwitch} />
          <Typography.Text style={{ fontSize: '10pt' }}>
            {t('const.by_science')}
          </Typography.Text>
        </Flex>
      </Flex>

      <Flex vertical gap={16} className="attendance__table">
        <Flex justify="space-between" align="center" gap={16}>
          <Flex gap={'3px 14px'} align="center" wrap className="semester-name">
            <h2>{currentSemester ? currentSemester.name : <Spin />}</h2>
            <AttendanceDetailsList attendance={attendance} />
          </Flex>

          <AnalyzeButton
            chatTopic={ChatTopic.AttendanceSummary}
            style={{ minWidth: 30 }}
          />
        </Flex>

        {isSuccess && attendance ? (
          <Table
            columns={isByScience ? columnsBySubjects : columns}
            rowKey="id"
            pagination={{ pageSize: 12 }}
            locale={{
              emptyText: isLoading ? (
                <Spin style={{ margin: '20px auto' }} />
              ) : (
                <NotFoundAnimation.Dashboard
                  description={t(
                    'components.attendance.attendance_in_drawer.empty_text'
                  )}
                  src="https://lottie.host/fd088be0-dcfa-4ee7-86a7-707c01712fc8/bGyUG18kIe.lottie"
                />
              ),
              filterReset: t('const.clean'),
            }}
            dataSource={
              isByScience
                ? Array.from(attendanceMapByScience.values())
                : attendanceDataByHours
            }
          />
        ) : isLoading ? (
          <GenerateSkeleton>
            <AttendanceTableSkeleton data={[false, false, true, false]} />
          </GenerateSkeleton>
        ) : (
          <Empty description={`${t('const.info')} ${t('const.not_found')}`} />
        )}
      </Flex>
    </section>
  );
};
