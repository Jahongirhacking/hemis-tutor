import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import {
  useAnswerExamMutation,
  useFinishExamMutation,
  useStartExamMutation,
} from '@/services/exams';
import { IExamQuestion } from '@/services/exams/type';
import { RootState } from '@/store/store';
import { formatTime } from '@/utils/dateFunc';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  message,
  Modal,
  Progress,
  Skeleton,
  Typography,
} from 'antd';
import DOMPurify from 'dompurify';
import { Clock, SquareCheck, SquareX } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { v4 as uuidv4 } from 'uuid';
import ExamQuestion from './components/ExamQuestion';
import ExamTimer from './components/ExamTimer';
import './ExamDetails.scss';

const ExamDetails = () => {
  const { id } = useParams();
  const [startExam, { data: examData, isLoading }] = useStartExamMutation();
  const [finishExam] = useFinishExamMutation();
  const [deviceId, setDeviceId] = useState(
    getLocalStorage(localStorageNames.deviceId)
  );
  const navigate = useNavigate();
  const [answer] = useAnswerExamMutation();
  const [questions, setQuestions] = useState<IExamQuestion[]>([]);
  const isFinishable = useMemo(
    () =>
      questions?.reduce(
        (acc, curr) => acc && curr?.selected?.length !== 0,
        true
      ),
    [questions]
  );
  const { t } = useTranslation();
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );

  const generateDeviceId = useCallback(() => {
    const tempId = uuidv4();
    if (!deviceId) {
      setLocalStorage(localStorageNames.deviceId, tempId);
      setDeviceId(tempId);
    }
  }, []);

  useEffect(() => {
    generateDeviceId();
  }, []);

  useEffect(() => {
    if (examData?.data?.questions?.length) {
      setQuestions([...examData?.data?.questions]);
    }
  }, [examData]);

  useEffect(() => {
    if (id && deviceId) {
      startExam({
        exam: Number(id),
        device_id: getLocalStorage(localStorageNames.deviceId),
      });
    }
  }, [id, deviceId]);

  // 🧠 Added: handle option select
  const handleSelect = useCallback(
    async (questionId: number, value: number | number[], multiple: boolean) => {
      if (!questionId) return;
      if (!deviceId) return generateDeviceId();
      try {
        const res = await answer({
          device_id: deviceId,
          exam: Number(id),
          question: questionId,
          option: value,
          selected: true,
        })?.unwrap();
        setQuestions(prev =>
          prev?.map(q =>
            q?.id === res?.data?.questionId
              ? { ...q, selected: res?.data?.selected }
              : { ...q }
          )
        );
      } catch (err) {
        console.error(err);
        console.log(multiple);
      }
    },
    [deviceId, id]
  );

  // 🧾 Added: finish exam handler
  const handleFinish = useCallback(async () => {
    if (!deviceId) return generateDeviceId();
    try {
      const res = await finishExam({
        exam: Number(id),
        device_id: deviceId,
      })?.unwrap();
      message.success('Imtihon yakunlandi!');
      Modal.info({
        maskClosable: true,
        keyboard: true,
        closable: true,
        className: `${themeColor}-modal`,
        content: (
          <Flex vertical gap={12} align="center" justify="center">
            <Progress type="dashboard" percent={res?.data?.result?.percent} />
            <Typography.Title
              style={{ textAlign: 'center', margin: 0 }}
              level={5}
            >
              {examData?.data?.exam?.subject?.name} /{' '}
              {examData?.data?.exam?.examType?.name}
            </Typography.Title>
            <Typography.Text strong>
              {res?.data?.result?.correct}{' '}
              <SquareCheck
                style={{ transform: 'translateY(2px)' }}
                size={15}
                color="rgba(13, 172, 13, 1)"
              />{' '}
              /{' '}
              {examData?.data?.exam?.questionCount - res?.data?.result?.correct}{' '}
              <SquareX
                style={{ transform: 'translateY(2px)' }}
                size={15}
                color="rgba(172, 13, 13, 1)"
              />{' '}
              / {formatTime(res?.data?.result?.timeSpent)}{' '}
              <Clock
                style={{ transform: 'translateY(2px)' }}
                size={15}
                color="rgba(13, 101, 172, 1)"
              />
            </Typography.Text>
          </Flex>
        ),
        title: t('components.task.task_in_drawer.result_text'),
        footer: null,
        afterClose: () => navigate('/dashboard/exams'),
      });
    } catch (err) {
      console.error(err);
    }
  }, [deviceId, id, examData]);

  const confirmFinish = useCallback(() => {
    Modal.confirm({
      maskClosable: true,
      keyboard: true,
      cancelText: t('const.cancel'),
      okText: t('login.university_form.button_text'),
      closable: true,
      className: `${themeColor}-modal`,
      content: (
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t('exam.finish_message')),
          }}
        />
      ),
      title: t('exam.finish_title'),
      onOk: handleFinish,
    });
  }, [handleFinish]);

  return (
    <Flex
      vertical
      className="dashboard__outlet exam-details"
      style={{ marginTop: 12 }}
    >
      {isLoading ? (
        <Skeleton active />
      ) : questions?.length ? (
        <Flex vertical gap={18}>
          <Flex justify="space-between" align="center" gap={12} wrap>
            <Flex vertical gap={4}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {`${examData?.data?.exam?.subject?.name} / ${examData?.data?.exam?.examType?.name}`}
              </Typography.Title>
              <Typography.Text>
                {`Savollar soni: ${examData?.data?.exam?.questionCount} / Berilgan vaqt: ${examData?.data?.exam?.durationMinutes} daqiqa`}
              </Typography.Text>
            </Flex>
            <Button
              icon={<CloseOutlined />}
              disabled={!isFinishable}
              onClick={confirmFinish}
            />
          </Flex>
          <Flex gap={24} wrap align="flex-start">
            <Flex vertical gap={12} className="exam-questions" flex={1}>
              {questions?.map((question, index) => (
                <Card key={question?.id} id={`q-${index + 1}`}>
                  <ExamQuestion
                    question={question}
                    index={index}
                    handleSelect={handleSelect}
                  />
                </Card>
              ))}
            </Flex>
            <Flex vertical gap={16} className="exam-status">
              <Card>
                <Flex vertical gap={24}>
                  <ExamTimer
                    totalSeconds={
                      (examData?.data?.exam?.durationMinutes || 0) * 60
                    }
                    durationSeconds={examData?.data?.timeLeft}
                    onTimeEnd={handleFinish}
                  />
                  <Flex gap={8} wrap>
                    {questions?.map((q, index) => (
                      <HashLink key={q?.id} to={`#q-${index + 1}`} smooth>
                        <Button
                          shape="circle"
                          type={q?.selected?.length ? 'primary' : 'default'}
                        >
                          {index + 1}
                        </Button>
                      </HashLink>
                    ))}
                  </Flex>
                </Flex>
              </Card>

              <Button
                type="primary"
                onClick={confirmFinish}
                disabled={!isFinishable}
              >
                Imtihonni yakunlash
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <NotFoundAnimation.Card />
      )}
    </Flex>
  );
};

export default ExamDetails;
