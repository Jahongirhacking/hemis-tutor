import useTTS from '@/hooks/useTTS';
import { RootState } from '@/store/store';
import { ChatTopic, DrawerChildTypes, SearchParams } from '@/utils/config';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { LoadingOutlined } from '@ant-design/icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button, Flex, Modal, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import NotFoundAnimation from '../SpecialComponents/NotFoundAnimation';
import AnimatedMessage from '../TypingAnimation/AnimatedMessage';
import AnalyzeButton from './AnalyzeButton';
import AttendanceResult from './AnalyzeResult/AttendanceResult';
import ContractResult from './AnalyzeResult/ContractResult';
import CourseResult from './AnalyzeResult/CourseResult';
import GpaResult from './AnalyzeResult/GpaResult';
import { IAnalyzeResultProps } from './AnalyzeResult/interface';
import PlagiarismResult from './AnalyzeResult/PlagiarismResult';
import TimetableResult from './AnalyzeResult/TimetableResult';
import AiLogo from './components/AiLogo';
import AnalyzeWithVoice from './components/AnalyzeWithVoice';
import VoiceBtn from './components/VoiceBtn';

interface IModalTabProps {
  children: React.FC<IAnalyzeResultProps>;
  label: string;
  value: ChatTopic;
}

const AnalyzeModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const profile = useSelector((store: RootState) => store?.authSlice?.profile);
  const { isLoading: isSpeakLoading, stopAudio, mode, onClickBtn } = useTTS();
  const { t } = useTranslation();
  const [result, setResult] = useState<string>();

  const tabs: IModalTabProps[] = [
    {
      children: AttendanceResult,
      label: t('const.attendance'),
      value: ChatTopic.AttendanceSummary,
    },
    {
      children: GpaResult,
      label: t('const.gpa_appropriation'),
      value: ChatTopic.GpaSummary,
    },
    {
      children: TimetableResult,
      label: t('const.time_table'),
      value: ChatTopic.TimetableSummary,
    },
    {
      children: CourseResult,
      label: t('const.recommended_courses'),
      value: ChatTopic.CourseRecommendation,
    },
    {
      children: PlagiarismResult,
      label: t('const.plagiarism'),
      value: ChatTopic.PlagiarismCheck,
    },
    {
      children: ContractResult,
      label: t('const.financial_state'),
      value: ChatTopic.ContractSummary,
    },
  ];

  useEffect(() => {
    if (!searchParams.has(SearchParams.Modal)) {
      stopAudio();
    }
  }, [searchParams]);

  return (
    <Modal
      onCancel={() => {
        searchParams.delete(SearchParams.Modal);
        setSearchParams(searchParams);
      }}
      footer={null}
      open={searchParams.has(SearchParams.Modal)}
      title={
        <Flex align="center" justify="center" gap={12} wrap>
          <AiLogo style={{ marginRight: 30 }} />
        </Flex>
      }
      className={`analyze-modal ${themeColor}-modal`}
    >
      <AnalyzeWithVoice gap={20} mode={mode} stopAudio={stopAudio}>
        <Flex gap={20} justify="space-between" align="flex-end" wrap>
          <Flex vertical gap={4}>
            <Flex gap={2}>
              <img src="/icons/flash.svg" width={15} />
              <Typography.Text strong style={{ color: '#7752FF' }}>
                AI tahlili
              </Typography.Text>
            </Flex>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {[
                'Salom',
                toFirstCapitalLetter(profile?.data?.first_name || ''),
              ]?.join(', ')}
              !
            </Typography.Title>
          </Flex>
          <Flex wrap gap={12}>
            {tabs?.map(e => (
              <AnalyzeButton key={e?.value} icon={null} chatTopic={e?.value}>
                {e?.label}
              </AnalyzeButton>
            ))}
          </Flex>
        </Flex>
        {tabs?.map((Element, index) => (
          <Element.children
            key={index}
            showRequestLoading={() => (
              <Flex
                gap={4}
                vertical
                align="center"
                style={{
                  maxWidth: 'min(500px, 100%)',
                  margin: 'auto',
                  width: '100%',
                }}
              >
                <DotLottieReact
                  key={'loading-1'}
                  src="https://lottie.host/ad197045-a76c-4cc2-9cca-e17ee71126dc/yQ2TdCLqKB.lottie"
                  loop
                  autoplay
                />
                <Flex gap={12} style={{ marginBottom: 20 }}>
                  <LoadingOutlined />
                  <Typography.Text strong>
                    Muhim ma'lumotlar yuklanmoqda...
                  </Typography.Text>
                </Flex>
              </Flex>
            )}
            showResponseLoading={() => (
              <Flex
                gap={4}
                vertical
                align="center"
                style={{
                  maxWidth: 'min(500px, 100%)',
                  margin: 'auto',
                  width: '100%',
                }}
              >
                <DotLottieReact
                  key={'loading-2'}
                  src="https://lottie.host/e6054948-bd91-48cf-a2d4-7bc0d175b9d0/evVGPhmVAc.lottie"
                  loop
                  autoplay
                />
                <Flex gap={12} style={{ marginBottom: 20 }}>
                  <LoadingOutlined />
                  <Typography.Text strong>
                    Ma'lumotlar tahlil qilinmoqda...
                  </Typography.Text>
                </Flex>
              </Flex>
            )}
            openChat={(noReply = false) => (
              <Flex gap={8}>
                {!noReply && (
                  <Button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.delete(SearchParams.Modal);
                      params.set(SearchParams.Drawer, DrawerChildTypes.AiChat);
                      setSearchParams(params);
                    }}
                    icon={<MessageCircle />}
                    title="Ushbu tahlilni chatda muhokama qilish"
                  >
                    Muhokama qilish
                  </Button>
                )}

                <VoiceBtn
                  mode={mode}
                  isLoading={isSpeakLoading}
                  onClick={() => {
                    onClickBtn({ result });
                  }}
                />
              </Flex>
            )}
            setResult={setResult}
            showResult={() => (
              <>
                {result ? (
                  <AnimatedMessage>
                    <div className={'analyze-result'}>
                      <Typography.Paragraph className="animated-text-content">
                        <ReactMarkdown>
                          {DOMPurify.sanitize(result)}
                        </ReactMarkdown>
                      </Typography.Paragraph>
                    </div>
                  </AnimatedMessage>
                ) : (
                  <NotFoundAnimation />
                )}
              </>
            )}
            showNotFound={props => <NotFoundAnimation {...(props ?? {})} />}
          />
        ))}
      </AnalyzeWithVoice>
    </Modal>
  );
};

export default AnalyzeModal;
