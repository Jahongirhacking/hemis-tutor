import { useGenerateTimetableSummaryMutation } from '@/services/chat';
import { useGetSchedulesQuery } from '@/services/dashboard';
import { RootState } from '@/store/store';
import { ChatTopic, SearchParams } from '@/utils/config';
import { getCorrectWeek } from '@/utils/dateFunc';
import { Card, Empty, Flex, Typography } from 'antd';
import { BadgeCheck, NotepadText } from 'lucide-react';
import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LessonsByWeekdayChart from '../components/LeesonsByWeekdayChart';
import LessonsBySubjectChart from '../components/LessonsBySubjectChart';
import useGetToken from '../hooks/useGetToken';
import { getTranslationTerm } from './constants';
import { IAnalyzeResultProps } from './interface';

const TimetableResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.TimetableSummary;
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const { profile } = useSelector((store: RootState) => store?.authSlice);
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const [generateTimetable, { isLoading: isTimetableSummaryLoading, data }] =
    useGenerateTimetableSummaryMutation();
  const { data: schedulesData, isFetching: isScheduleFetching } =
    useGetSchedulesQuery(
      { week: String(getCorrectWeek(moment().unix(), currentSemester)) },
      { skip: !currentSemester || !profile }
    );
  const { token, ready } = useGetToken();

  useEffect(() => {
    if (!isVisible) return;
    if (data && !isTimetableSummaryLoading) {
      props?.setResult(data?.answer);
    }
  }, [data, isVisible]);

  useEffect(() => {
    if (!isVisible || !profile || isScheduleFetching || !ready) return;
    if (searchParams.has(SearchParams.Modal)) {
      // prompt
      const userInfo = `**Talaba ma'lumotlari:**\n${profile?.data?.full_name}, ${profile?.data?.university}, ${profile?.data?.faculty?.name}, ${profile?.data?.specialty?.name}, ${profile?.data?.level?.name}`;
      const summary = `${userInfo}\n **Dars jadvali ma'lumotlari (${currentSemester?.name}):**\n*  ${schedulesData?.data?.length ? schedulesData?.data?.map(a => `${a?.subject?.name} - ${moment.unix(a?.lesson_date).format('DD.MM.YYYY')} ${a?.lessonPair?.start_time}-${a?.lessonPair?.end_time}`)?.join('\n*  ') : "Talaba uchun ushbu haftada dars jadvali qo'yilmagan. Buni chiroyli qilib tushuntiring"}`;
      generateTimetable({
        question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
        token,
      });
      setIsInitialized(true);
    }
  }, [isVisible, profile, isScheduleFetching, token, ready]);

  if (!isVisible) return null;

  return (
    <Flex vertical>
      {isScheduleFetching ? (
        props?.showRequestLoading()
      ) : isTimetableSummaryLoading || !isInitialized ? (
        props?.showResponseLoading()
      ) : data ? (
        <Flex vertical gap={18}>
          <Card
            className="analyze-result-content"
            title={
              <Flex gap={8}>
                <BadgeCheck />
                <Typography.Title level={5}>Tahlil natijasi</Typography.Title>
              </Flex>
            }
            extra={props.openChat()}
          >
            {props?.showResult()}
          </Card>

          <Flex gap={12} wrap className="extra-analyzes">
            <Card
              title={
                <Flex gap={8}>
                  <NotepadText size={20} />
                  <Typography.Title level={5}>
                    Hafta kunlari kesimida tahlil
                  </Typography.Title>
                </Flex>
              }
            >
              {schedulesData?.data?.length ? (
                <LessonsByWeekdayChart data={schedulesData?.data} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    "Joriy hafta uchun dars jadvali ma'lumotlari topilmadi"
                  }
                />
              )}
            </Card>

            <Card
              title={
                <Flex gap={8}>
                  <NotepadText size={20} />
                  <Typography.Title level={5}>
                    Fanlar kesimida tahlil
                  </Typography.Title>
                </Flex>
              }
            >
              {schedulesData?.data?.length ? (
                <LessonsBySubjectChart data={schedulesData?.data} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    "Joriy hafta uchun dars jadvali ma'lumotlari topilmadi"
                  }
                />
              )}
            </Card>
          </Flex>
        </Flex>
      ) : (
        props?.showNotFound()
      )}
    </Flex>
  );
};

export default TimetableResult;
