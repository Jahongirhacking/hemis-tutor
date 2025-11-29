import {
  useGetGroupListQuery,
  useGetScheduleOptionsQuery,
  useGetSchedulesByWeekQuery,
} from '@/services/student';
import { IScheduleItem } from '@/services/student/type';
import {
  CORRECT_DATE_FORMAT,
  CURRENT_DATE_FORMAT,
  dayNames,
  formatUnixTimestampToDate,
  getLatestMondayUnixTimestamp,
  getTranslatedName,
  LangType,
} from '@/utils/dateFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Divider, Flex, Typography } from 'antd';
import { TimeTable as CustomTimetable, ISchedule } from 'lesson-schedule-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

enum FilterItem {
  WEEK_ID = 'week_id',
  GROUP_ID = 'group_id',
  EDUCATION_YEAR = 'education_year',
  FACULTY_ID = 'faculty_id',
  SEMESTER = 'semester',
}

const formatWeekInfo = (weekName: string): [string, number[]] => {
  const temp = weekName?.split('. ');
  return [
    temp?.[0],
    temp?.[1]?.split(' - ')?.map(e => moment(e, CORRECT_DATE_FORMAT)?.unix()),
  ];
};

const Timetable = () => {
  const { i18n } = useTranslation();
  const { form, values } = useCustomFilter();
  const {
    [FilterItem.WEEK_ID]: week_id,
    [FilterItem.GROUP_ID]: group_id,
    ...options
  } = useMemo(() => values || {}, [values]);
  const { data: optionsData, isFetching } = useGetScheduleOptionsQuery(
    { ...options, group_id },
    { refetchOnMountOrArgChange: true }
  );
  const { data: groupList, isFetching: isGroupsFetching } =
    useGetGroupListQuery({
      education_year: values?.[FilterItem.EDUCATION_YEAR],
      faculty_id: values?.[FilterItem.FACULTY_ID],
      semester: values?.[FilterItem.SEMESTER],
    });
  const { data: schedulesData, isFetching: isSchedulesFetching } =
    useGetSchedulesByWeekQuery({ week_id, group_id }, { skip: !week_id });
  const weekNames = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) =>
        getTranslatedName(dayNames, index, 'short', i18n?.language as LangType)
      ),
    []
  );

  const formatWeekName = useCallback(
    (weekName: string) =>
      formatWeekInfo(weekName)?.[1]
        ?.map(w =>
          formatUnixTimestampToDate(w, ' ', 'long', i18n?.language as LangType)
        )
        ?.join(' - ') || '',
    []
  );

  const getWeekInfo = useCallback(
    (id: number) => {
      if (id) {
        return formatWeekInfo(
          optionsData?.result?.weeks?.find(w => w?.id === id)?.name
        );
      }
      return [];
    },
    [optionsData]
  );

  const [weekNumber, weekInterval] = useMemo(
    () => getWeekInfo(week_id),
    [week_id, getWeekInfo]
  );

  const handleWeekChange = useCallback(
    (changeTime: number) => {
      if (week_id) {
        form.setFieldValue(FilterItem.WEEK_ID, week_id + changeTime);
      }
    },
    [week_id]
  );

  useEffect(() => {
    if (!week_id && optionsData?.result?.weeks?.length) {
      const currentWeekId = (
        optionsData?.result?.weeks?.find(w => {
          const interval = getWeekInfo(w?.id)?.[1];
          return moment()
            .startOf('W')
            .isBetween(
              moment.unix(interval?.[0]),
              moment.unix(interval?.[1]),
              null,
              '[]'
            );
        }) || optionsData?.result?.weeks?.[0]
      )?.id;
      form.setFieldValue(FilterItem.WEEK_ID, currentWeekId);
    }
  }, [week_id, optionsData?.result?.weeks, getWeekInfo]);

  return (
    <Flex vertical gap={18} className="timetable-page">
      <CustomFilter form={form}>
        <CustomFilter.BySelect
          field={FilterItem.FACULTY_ID}
          placeholder="Fakultet"
          onChange={() => {
            form.setFieldValue(FilterItem.GROUP_ID, undefined);
            form.setFieldValue(FilterItem.SEMESTER, undefined);
            form.setFieldValue(FilterItem.WEEK_ID, undefined);
          }}
          options={optionsData?.result?.faculties?.map(data => ({
            label: data?.name,
            value: data?.id,
          }))}
          loading={isFetching}
        />
        <CustomFilter.BySelect
          field={FilterItem.EDUCATION_YEAR}
          placeholder="O'quv yili"
          options={optionsData?.result?.educationYears?.map(data => ({
            label: data?.name,
            value: data?.id,
          }))}
          onChange={() => {
            form.setFieldValue(FilterItem.GROUP_ID, undefined);
            form.setFieldValue(FilterItem.WEEK_ID, undefined);
          }}
          loading={isFetching}
        />
        <CustomFilter.BySelect
          field={FilterItem.GROUP_ID}
          placeholder="Guruh"
          options={groupList?.result?.groups?.map(data => ({
            label: data?.name,
            value: data?.id,
          }))}
          onChange={() => {
            form.setFieldValue(FilterItem.SEMESTER, undefined);
            form.setFieldValue(FilterItem.WEEK_ID, undefined);
          }}
          loading={isGroupsFetching}
        />
        <CustomFilter.BySelect
          field={FilterItem.SEMESTER}
          placeholder="Semestr"
          options={optionsData?.result?.semesters?.map(data => ({
            label: data?.name,
            value: data?.code,
          }))}
          onChange={() => {
            form.setFieldValue(FilterItem.WEEK_ID, undefined);
          }}
          loading={isFetching}
        />
        <CustomFilter.BySelect
          field={FilterItem.WEEK_ID}
          placeholder="Hafta"
          options={optionsData?.result?.weeks?.map(data => ({
            label: formatWeekName(data?.name),
            value: data?.id,
          }))}
          loading={isFetching}
        />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <Flex vertical gap={32} className="mt-4">
        {schedulesData?.result?.groups?.length ? (
          [...schedulesData?.result?.groups]?.map(group => (
            <Collapse
              collapsible="icon"
              key={group?.group_id}
              defaultActiveKey={group?.group_id}
              items={[
                {
                  key: group?.group_id,
                  label: (
                    <Flex justify="space-between" gap={8} wrap>
                      <Typography.Text
                        strong
                      >{`${[toFirstCapitalLetter(group?.group_name), `(${weekInterval?.map((w: number) => formatUnixTimestampToDate(w, ' ', 'long', i18n?.language as LangType))?.join(' - ') || ''})`].join(' ')}`}</Typography.Text>
                      <Flex gap={8}>
                        <Button
                          size="small"
                          icon={<LeftOutlined />}
                          disabled={
                            !optionsData?.result?.weeks?.find(
                              w => w?.id === (week_id || 0) - 1
                            )
                          }
                          onClick={e => {
                            e.stopPropagation();
                            handleWeekChange(-1);
                          }}
                        />
                        <Button
                          size="small"
                          icon={<RightOutlined />}
                          disabled={
                            !optionsData?.result?.weeks?.find(
                              w => w?.id === (week_id || 0) + 1
                            )
                          }
                          onClick={e => {
                            e.stopPropagation();
                            handleWeekChange(1);
                          }}
                        />
                      </Flex>
                    </Flex>
                  ),
                  children: (
                    <Flex vertical gap={12} className="relative">
                      <CustomTimetable
                        key={Math.random()}
                        pixelsForOneCellHeight={90}
                        activeDate={getLatestMondayUnixTimestamp(
                          moment(
                            group?.days?.find(d => !!d?.items?.length)
                              ?.items?.[0]?.lesson_date,
                            CURRENT_DATE_FORMAT
                          ).unix() || moment().unix()
                        )}
                        activeOption="week"
                        schedules={group?.days
                          ?.reduce<IScheduleItem[]>(
                            (acc, curr) => [...acc, ...curr?.items],
                            []
                          )
                          ?.map(
                            d =>
                              ({
                                lesson_date: moment(
                                  d?.lesson_date,
                                  CURRENT_DATE_FORMAT
                                ).unix(),
                                lessonPair: (() => {
                                  const lessonPair = (
                                    d?.lesson_pair?.split(' ')?.[1] || ''
                                  )?.split('-');
                                  return {
                                    start_time: lessonPair?.[0],
                                    end_time: lessonPair?.[1],
                                  } as ISchedule['lessonPair'];
                                })(),
                                subject: {
                                  name: d?.subject,
                                },
                                auditorium: {
                                  name: d?.auditorium,
                                },
                                employee: {
                                  name: d?.employee,
                                },
                                trainingType: {
                                  name: d?.training_type,
                                },
                              }) as ISchedule
                          )}
                        activeWeekNumber={Number(weekNumber) || 0}
                        weekNames={weekNames}
                      />
                      {isSchedulesFetching && (
                        <LoadingOutlined
                          style={{
                            fontSize: 60,
                            color: '#14b8a6',
                            zIndex: '999',
                          }}
                          className="absolute top-[50%] left-[50%]"
                        />
                      )}
                    </Flex>
                  ),
                },
              ]}
            />
          ))
        ) : (
          <CustomTimetable
            pixelsForOneCellHeight={90}
            activeDate={getLatestMondayUnixTimestamp(moment().unix())}
            activeOption="week"
            schedules={[]}
            activeWeekNumber={0}
            weekNames={weekNames}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Timetable;
