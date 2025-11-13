import {
  formatUnixTimestampToDate,
  getCorrectWeek,
  getStartingDateUnixTimeStamp,
  handleClickDateChangerBtn,
} from '@/utils/dateFunc';

import { RightOutlinedSVG } from '@/assets/icon';
import { DashboardContext } from '@/pages/dashboard';
import { ISchedule } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { ChatTopic } from '@/utils/config';
import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Button, Flex, Segmented, Typography } from 'antd';
import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TimeTable from '.';
import AnalyzeButton from '../Chat/AnalyzeButton';

const makeTimeTable = ({
  pixelsForOneCellHeight,
  hasTitle = true,
  optionName,
}: {
  pixelsForOneCellHeight: number;
  hasTitle?: boolean;
  optionName: string;
}) => {
  return ({
    getSchedules,
    schedules: scheduleList,
    isLoading,
  }: {
    getSchedules: (arg: { week: string }) => void;
    schedules: ISchedule[];
    isLoading: boolean;
  }) => {
    const { t } = useTranslation();
    const OPTION_NAME = optionName;
    const NAV_WIDTH = 270;
    const FULL_TABLE_WIDTH = 800;
    const deviceSize = useContext(DashboardContext)?.deviceSize;

    const options: { label: string; value: 'week' | 'day' }[] = [
      {
        label: t('const.week'),
        value: 'week',
      },
      {
        label: t('const.day'),
        value: 'day',
      },
    ];

    const [activeOption, setActiveOption] = useState<'week' | 'day'>(
      getExistedOne(
        getLocalStorage(localStorageNames.savedTabs) &&
          getLocalStorage(localStorageNames.savedTabs)[OPTION_NAME],
        deviceSize - NAV_WIDTH >= FULL_TABLE_WIDTH ? 'week' : 'day',
        options[0].value
      )
    );

    const [activeDate, setActiveDate] = useState<number>(
      getStartingDateUnixTimeStamp(moment().startOf('day').unix(), activeOption)
    );
    const [activeWeek, setActiveWeek] = useState<number>(0);
    const currentSemester = useSelector(
      (store: RootState) => store?.authSlice?.currentSemester
    );
    const schedules = scheduleList?.filter(schedule => schedule?.lessonPair);

    const handleDateChange = useCallback(
      (timeStamp: number) => {
        const newDate = getStartingDateUnixTimeStamp(timeStamp, activeOption);
        if (newDate !== timeStamp) {
          setActiveDate(newDate);
        }
      },
      [activeOption]
    );

    useEffect(() => {
      handleDateChange(activeDate);
    }, [handleDateChange, activeDate]);

    useEffect(() => {
      if (
        getLocalStorage(localStorageNames.savedTabs) &&
        getLocalStorage(localStorageNames.savedTabs)[OPTION_NAME] !==
          activeOption
      ) {
        handleDateChange(moment().endOf('day').unix());
      }
      setLocalStorage(localStorageNames.savedTabs, {
        ...getLocalStorage(localStorageNames.savedTabs),
        [OPTION_NAME]: activeOption,
      });
    }, [activeOption]);

    useEffect(() => {
      const newWeek = getCorrectWeek(activeDate, currentSemester);
      if (!newWeek) return;
      if (activeWeek === newWeek) return;
      getSchedules({
        week: `${newWeek}`,
      });
      setActiveWeek(newWeek);
    }, [getSchedules, activeDate, activeWeek, currentSemester]);

    useEffect(() => {
      if (!currentSemester) return;
      const currentWeeks = currentSemester?.weeks;
      if (!currentWeeks || !currentWeeks.length) return;
      if (currentWeeks[currentWeeks.length - 1]?.end_date < moment().unix()) {
        return setActiveDate(currentWeeks[0]?.start_date);
      }
      return setActiveDate(
        getStartingDateUnixTimeStamp(
          moment().startOf('day').unix(),
          activeOption
        )
      );
    }, [currentSemester, activeOption]);

    return (
      <section className="time-table-section upper-element">
        <Flex align="center" justify="space-between" wrap gap={15}>
          {hasTitle && (
            <h2 className="section_title">
              {t('components.time_table.title')}
            </h2>
          )}
          <Flex align="center" gap={10} wrap>
            <Segmented
              value={activeOption}
              options={options}
              onChange={(val: 'week' | 'day') => setActiveOption(val)}
            />
            <Typography.Text
              strong
              style={{
                minWidth: activeOption === 'week' ? '90px' : '65px',
                textAlign: 'center',
              }}
            >
              {activeOption === 'week'
                ? `${formatUnixTimestampToDate(activeDate, ' ', 'short')} - ${formatUnixTimestampToDate(moment.unix(activeDate).add(5, 'days').unix(), ' ', 'short')}`
                : `${formatUnixTimestampToDate(activeDate, '-', 'short')}`}
            </Typography.Text>
            <Flex gap={4}>
              <Button
                icon={<RightOutlinedSVG />}
                style={{ transform: 'rotate(180deg)' }}
                onClick={() =>
                  handleClickDateChangerBtn(-1, activeOption, setActiveDate)
                }
              />
              <Button
                type="primary"
                onClick={() => handleDateChange(moment().unix())}
              >
                {t('const.today')}
              </Button>
              <Button
                icon={<RightOutlinedSVG />}
                onClick={() =>
                  handleClickDateChangerBtn(1, activeOption, setActiveDate)
                }
              />
            </Flex>

            <AnalyzeButton chatTopic={ChatTopic.TimetableSummary} />
          </Flex>
        </Flex>

        <div
          className="dashboard__outlet--content"
          style={{ marginTop: '20px' }}
        >
          <TimeTable
            {...{
              pixelsForOneCellHeight,
              activeOption,
              activeDate,
              isLoading,
            }}
            schedules={schedules}
          />
        </div>
      </section>
    );
  };
};

export default makeTimeTable;
