import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import {
  useCheckPlagiarismFileMutation,
  useCheckPlagiarismMutation,
} from '@/services/chat';
import { IPlagiarismResponse } from '@/services/chat/type';
import { ChatTopic, SearchParams } from '@/utils/config';
import { getPureJSON } from '@/utils/objectFunc';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  Input,
  message,
  Progress,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import DOMPurify from 'dompurify';
import { t } from 'i18next';
import {
  BadgeAlert,
  BadgeCheck,
  BookText,
  File,
  Link,
  MailWarning,
  Percent,
  TextSearch,
} from 'lucide-react';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetToken from '../hooks/useGetToken';
import { IAnalyzeResultProps } from './interface';

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

function percentToHsl(percent: number) {
  // percent 0 => hue 120 (green); percent 100 => hue 0 (red)
  const hue = 120 - (percent * 120) / 100;
  return `hsl(${hue}, 75%, 45%)`;
}

const PlagiarismResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.PlagiarismCheck;
  const [text, setText] = useState('');
  const [plagiarismResult, setPlagiarismResult] =
    useState<IPlagiarismResponse>(null);

  const [checkPlagiarism, { isLoading: isPlagiarismLoading }] =
    useCheckPlagiarismMutation();
  const [checkPlagiarismFile, { isLoading: isPlagiarismFileLoading }] =
    useCheckPlagiarismFileMutation();
  const { token, ready } = useGetToken();

  const handleCheckPlagiarism = useCallback(async () => {
    try {
      if (!isVisible || !text || !ready) return;
      if (searchParams.has(SearchParams.Modal)) {
        const res = await checkPlagiarism({
          question: text,
          token,
        })?.unwrap();
        setPlagiarismResult(getPureJSON(res?.answer));
      }
    } catch (err) {
      console.error(err);
    }
  }, [isVisible, text, token, ready]);

  const handleCheckFile = useCallback(
    async ({ fileList }: { fileList: UploadFile[] }) => {
      try {
        if (!ready || !isVisible || !fileList?.length) return;
        const extensions = ['txt', 'pdf', 'docx'];
        if (
          fileList.find(file => {
            const nameArr = file.name.split('.');
            return !extensions.includes(nameArr[nameArr.length - 1]);
          })
        ) {
          message.warning(
            t('components.message.extensions_warning_text', {
              extensions: extensions.join(', '),
            })
          );
          return;
        }
        const file = fileList?.[0];
        const formData = new FormData();
        formData?.append('file', file?.originFileObj, file?.name);
        const res = await checkPlagiarismFile({
          token,
          file: formData,
        })?.unwrap();
        setPlagiarismResult(getPureJSON(res?.answer));
      } catch (err) {
        console.error(err, 'err');
      }
    },
    [ready, isVisible]
  );

  const pct = useMemo(
    () => clamp(Math.round(plagiarismResult?.similarityScore ?? 0)),
    [plagiarismResult?.similarityScore]
  );
  const color = useMemo(() => percentToHsl(pct), [pct]);

  if (!isVisible) return null;

  return (
    <Flex vertical>
      <Flex vertical gap={18}>
        <Input.TextArea
          rows={5}
          placeholder="Plagiatga qarshi tekshirish uchun matn kiriting..."
          value={text}
          onChange={e => {
            setText(e?.target?.value);
          }}
        />
        <Card
          className="analyze-result-content"
          title={
            <Flex gap={8}>
              <BadgeCheck />
              <Typography.Title level={5}>Tahlil natijasi</Typography.Title>
            </Flex>
          }
          extra={
            <Flex gap={8} wrap align="center">
              <Upload
                beforeUpload={() => false}
                onChange={handleCheckFile}
                fileList={null}
                showUploadList={false}
                disabled={isPlagiarismFileLoading}
              >
                <Button
                  disabled={isPlagiarismFileLoading}
                  icon={<File size={18} />}
                >
                  Fayl yuklash
                </Button>
              </Upload>

              <Button
                type="primary"
                icon={
                  isPlagiarismLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <TextSearch size={18} />
                  )
                }
                onClick={handleCheckPlagiarism}
                disabled={isPlagiarismLoading || isPlagiarismFileLoading}
              >
                Tekshirish
              </Button>
            </Flex>
          }
        >
          {isPlagiarismLoading || isPlagiarismFileLoading ? (
            props?.showResponseLoading()
          ) : plagiarismResult ? (
            // Result
            <AnimatedMessage>
              <Flex vertical gap={20} className="plagiarims-result-container">
                <Card
                  className="similarity-score"
                  title={
                    <Flex gap={6} align="center">
                      <Percent size={20} />
                      Plagiat foizi
                    </Flex>
                  }
                >
                  <Flex vertical gap={8}>
                    <Progress percent={pct} strokeColor={color} />
                  </Flex>
                </Card>
                <Card
                  className="plagiarism-cases"
                  title={
                    <Flex gap={6} align="center">
                      <MailWarning size={20} />
                      Plagiat ehtimolligi yuqori holatlar
                    </Flex>
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        plagiarismResult?.highlightedText || 'Topilmadi'
                      ),
                    }}
                  />
                </Card>
                <Card
                  className="plagiarism-sources"
                  title={
                    <Flex gap={6} align="center">
                      <BookText size={20} />
                      Ehtimoliy manbalar
                    </Flex>
                  }
                >
                  {plagiarismResult?.sources &&
                  plagiarismResult?.sources?.length ? (
                    <Flex gap={18} wrap>
                      {plagiarismResult?.sources?.map(source => (
                        <Card className="source-card" key={source?.uri}>
                          <Flex vertical gap={8}>
                            <a href={source?.uri} target="_blank">
                              <Flex align="center" gap={6}>
                                <Link size={16} />
                                <Typography.Text
                                  strong
                                  style={{ color: '#1677ff' }}
                                >
                                  {source?.title}
                                </Typography.Text>
                              </Flex>
                            </a>
                            <Typography.Text>{source?.snippet}</Typography.Text>
                          </Flex>
                        </Card>
                      ))}
                    </Flex>
                  ) : (
                    props?.showNotFound()
                  )}
                </Card>
              </Flex>
            </AnimatedMessage>
          ) : (
            props?.showNotFound({
              description:
                'Plagiatga tekshirish uchun yuqorida matn kiritib, "Tekshirish" tugmasini bosing',
              icon: <BadgeAlert size={20} />,
              src: 'https://lottie.host/fd088be0-dcfa-4ee7-86a7-707c01712fc8/bGyUG18kIe.lottie',
            })
          )}
        </Card>
      </Flex>
    </Flex>
  );
};

export default PlagiarismResult;
