import { useGenerateAttendanceSummaryMutation } from '@/services/chat';
import { RootState } from '@/store/store';
import { ChatTopic, SearchParams } from '@/utils/config';
import { Card, Empty, Flex, Typography } from 'antd';
import { BadgeCheck, BookCheck, NotepadText } from 'lucide-react';
import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SemesterAttendanceChart from '../components/SemesterAttendanceChart';
import SubjectAttendanceChart from '../components/SubjectAttendanceChart';
import useGetToken from '../hooks/useGetToken';
import { getTranslationTerm } from './constants';
import { IAnalyzeResultProps } from './interface';

const AttendanceResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.AttendanceSummary;
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const [generateAttendance, { isLoading: isAttendanceSummaryLoading, data }] =
    useGenerateAttendanceSummaryMutation();
  const { token, ready } = useGetToken();

  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const { attendance, profile } = useSelector(
    (store: RootState) => store?.authSlice
  );

  useEffect(() => {
    if (!isVisible) return;
    if (data && !isAttendanceSummaryLoading) {
      props?.setResult(data?.answer);
    }
  }, [data]);

  useEffect(() => {
    if (!isVisible || !profile || !ready) return;
    if (searchParams.has(SearchParams.Modal)) {
      // prompt
      const currentAttendance = attendance?.data?.filter(
        a => a?.semester?.code === currentSemester?.code
      );
      const userInfo = `**Talaba ma'lumotlari:**\n${profile?.data?.full_name}, ${profile?.data?.university}, ${profile?.data?.faculty?.name}, ${profile?.data?.specialty?.name}, ${profile?.data?.level?.name}`;
      const summary = `${userInfo}\n **Talaba qoldirgan davomat ma'lumotlari (${currentSemester?.name}):**\n*  ${currentAttendance?.length ? currentAttendance?.map(a => `${a?.subject?.name} - ${moment.unix(a?.lesson_date).format('DD.MM.YYYY')} ${a?.lessonPair?.start_time}-${a?.lessonPair?.end_time} (${a?.explicable ? 'sababli' : 'sababsiz'})`)?.join('\n*  ') : 'Talaba ushbu semestrda hech qanday dars qoldirmagan. Bu uchun uni qisqacha maqtang'}`;
      generateAttendance({
        question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
        token,
      });
      setIsInitialized(true);
    }
  }, [isVisible, profile, ready, token]);

  if (!isVisible) return null;

  return (
    <Flex vertical>
      {isAttendanceSummaryLoading || !isInitialized ? (
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
                    Semestrlar kesimida tahlil
                  </Typography.Title>
                </Flex>
              }
            >
              {attendance?.data?.length ? (
                <SemesterAttendanceChart data={attendance?.data} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Davomat ma'lumotlari topilmadi"}
                />
              )}
            </Card>

            <Card
              title={
                <Flex gap={8}>
                  <BookCheck size={20} />
                  <Typography.Title level={5}>
                    Fanlar kesimida tahlil
                  </Typography.Title>
                </Flex>
              }
            >
              {attendance?.data?.length ? (
                <SubjectAttendanceChart data={attendance?.data} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Davomat ma'lumotlari topilmadi"}
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

export default AttendanceResult;
