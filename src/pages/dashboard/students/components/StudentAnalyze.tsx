import AnalyzeWithVoice from '@/components/Chat/components/AnalyzeWithVoice';
import ShowAnalyzeResult from '@/components/Chat/components/ShowAnalyzeResult';
import { MAX_AI_REQ_LENGTH } from '@/components/Chat/config';
import useTTS from '@/hooks/useTTS';
import { useGenerateAttendancePatternResponseMutation } from '@/services/chat';
import { useGetAttendanceReportQuery } from '@/services/student';
import { RootState } from '@/store/store';
import { Flex, Typography } from 'antd';
import { NotebookPen } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StudentFullInfo from '../../components/StudentFullInfo';

const StudentAnalyze = ({ props: studentId }: { props: string }) => {
  const { stopAudio, mode } = useTTS();
  const profile = useSelector((store: RootState) => store?.authSlice.profile);
  const { data: studentAttendance, isFetching: isStudentAttendanceFetching } =
    useGetAttendanceReportQuery(
      { student_id: Number(studentId) },
      { skip: !studentId }
    );
  const [
    generatePattern,
    { data: patternData, isLoading: isPatternDataLoading },
  ] = useGenerateAttendancePatternResponseMutation();

  useEffect(() => {
    if (studentAttendance?.result?.attendance?.length && profile?.tutor?.id) {
      const question = `${JSON.stringify(studentAttendance?.result?.attendance?.map(({ student, id, absent_off, absent_on, ...other }) => ({ ...other })))?.slice(0, MAX_AI_REQ_LENGTH)}`;
      generatePattern({ question, token: profile?.tutor?.id });
    }
  }, [studentAttendance, profile]);

  return (
    <Flex vertical gap={18}>
      <StudentFullInfo studentId={Number(studentId)} infoTypes={[]} />
      <AnalyzeWithVoice gap={20} mode={mode} stopAudio={stopAudio}>
        <Flex gap={20} justify="space-between" align="flex-end" wrap>
          <Flex vertical gap={4}>
            <Flex gap={2}>
              <img src="/icons/flash.svg" width={15} />
              <Typography.Text strong style={{ color: '#7752FF' }}>
                AI tahlili
              </Typography.Text>
            </Flex>
            <Typography.Title level={4} className="!m-0">
              Talabaning asosiy ma'lumotlarini qayta ishlash natijasida
              quyidagilar aniqlandi:
            </Typography.Title>
          </Flex>
        </Flex>
        <Flex vertical gap={12}>
          <ShowAnalyzeResult
            loading={isPatternDataLoading}
            preLoading={isStudentAttendanceFetching}
            result={patternData?.answer}
            title={
              <Typography.Text className="flex items-center gap-3">
                <NotebookPen /> Davomat tahlili
              </Typography.Text>
            }
          />
        </Flex>
      </AnalyzeWithVoice>
    </Flex>
  );
};

export default StudentAnalyze;
