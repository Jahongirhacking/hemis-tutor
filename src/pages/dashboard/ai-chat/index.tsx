import AnalyzeButton from '@/components/Chat/AnalyzeButton';
import useGetToken from '@/components/Chat/hooks/useGetToken';
import {
  useDeleteChatHistoryMutation,
  useGenerateChatResponseMutation,
  useGetChatHistoryQuery,
} from '@/services/chat';
import { ChatRoleEnum, IChatMessage } from '@/services/chat/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { ChatTopic, SearchParams } from '@/utils/config';
import {
  Button,
  Flex,
  Image,
  Input,
  InputRef,
  message,
  Popover,
  Skeleton,
  Typography,
} from 'antd';
import DOMPurify from 'dompurify';
import { LayoutGrid, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import './style.scss';

interface IChoiceProps {
  image: string;
  title: string;
  description: string;
  chatTopic: ChatTopic;
}

const AiChat = () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const { t } = useTranslation();

  const choices: IChoiceProps[] = useMemo(
    () => [
      {
        image: '/icons/gpa.svg',
        title: t('const.gpa_appropriation'),
        description: 'Talabaning kuchli va zaif tomonlarni ko‘rsatadi',
        chatTopic: ChatTopic.GpaSummary,
      },
      {
        image: '/icons/attendance.svg',
        title: t('const.attendance'),
        description: 'Davomat bo‘yicha tahliliy hisobot beradi',
        chatTopic: ChatTopic.AttendanceSummary,
      },
      {
        image: '/icons/timetable.svg',
        title: t('const.time_table'),
        description: 'Darslar uchun kundalik reja tahlili',
        chatTopic: ChatTopic.TimetableSummary,
      },
      {
        image: '/icons/subjects.svg',
        title: t('const.recommended_courses'),
        description: "Qo'shimcha kursar bo'yicha tavsiyalar",
        chatTopic: ChatTopic.CourseRecommendation,
      },
      {
        image: '/icons/plagiarism.svg',
        title: t('const.plagiarism'),
        description: 'Plagiatga qarshi tekshiruv va tahlil',
        chatTopic: ChatTopic.PlagiarismCheck,
      },
      {
        image: '/icons/payment.svg',
        title: t('const.financial_state'),
        description: "Shartnoma to'lovi bo'yicha maslahat",
        chatTopic: ChatTopic.ContractSummary,
      },
    ],
    [t]
  );

  const [
    generateChatResponse,
    { isLoading: isResponseLoading, error: isGenerateError },
  ] = useGenerateChatResponseMutation();
  const { ready, token } = useGetToken();
  const {
    data: chatHistory,
    isLoading: isChatLoading,
    error: chatHistoryError,
  } = useGetChatHistoryQuery({ token }, { skip: !ready });
  const [deleteChatHistory] = useDeleteChatHistoryMutation();
  const [value, setValue] = useState('');
  const [chatMessages, setMessages] = useState<IChatMessage[]>();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>();

  const handleSend = useCallback(() => {
    if (!ready) return;
    if (!value.trim()) {
      message.warning("Kiritilgan matn bo'sh bo'lmasligi kerak!");
      return;
    }

    const question = DOMPurify.sanitize(value);
    setMessages(prev => [
      ...(prev || []),
      { id: -1, type: ChatRoleEnum.User, content: value },
    ]);
    generateChatResponse({
      question,
      token,
    });
    setValue('');
  }, [generateChatResponse, ready, token, value, setMessages]);

  useEffect(() => {
    if (chatHistoryError || isGenerateError) {
      const error = (chatHistoryError || isGenerateError) as any as {
        data: { detail: string };
        status: number;
      };
      message.destroy();
      message.warning(error?.data?.detail);
      if (error?.status === 401) {
        searchParams.delete(SearchParams.Drawer);
        setSearchParams(searchParams);
      }
    }
  }, [chatHistoryError, isGenerateError]);

  useEffect(() => {
    if (chatHistory && chatHistory?.messages) {
      setMessages([...chatHistory?.messages]);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (containerRef.current && chatMessages?.length) {
      setTimeout(() => {
        containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
      }, 0);
    }
  }, [chatMessages]);

  useEffect(() => {
    dispatch(setDrawer({ title: 'ai' }));
    // delay to ensure internal TextArea is mounted
    const timer = setTimeout(() => {
      inputRef.current?.focus?.({ cursor: 'end' });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex vertical gap={18} style={{ height: '100%' }} className="chat-drawer">
      <Flex
        vertical
        className="ai-chat-container"
        gap={12}
        flex={1}
        ref={containerRef}
      >
        {isChatLoading ? (
          <Skeleton active />
        ) : chatMessages?.length ? (
          chatMessages?.map(content => (
            <ChatMessage key={content?.id} content={content} />
          ))
        ) : (
          !isResponseLoading && (
            <Flex vertical gap={24}>
              <Flex
                vertical
                gap={12}
                style={{ margin: '30px auto auto', textAlign: 'center' }}
              >
                <Typography.Title level={3} style={{ margin: 0 }}>
                  Xush kelibsiz!
                </Typography.Title>
                <Typography.Text>
                  Bugun sizga qanday yordam bera olaman?
                </Typography.Text>
              </Flex>

              <Flex gap={15} wrap>
                {choices?.map(choice => (
                  <AnalyzeButton.Expanded
                    key={choice?.chatTopic}
                    chatTopic={choice?.chatTopic}
                    icon={
                      <Image
                        preview={false}
                        src={choice?.image}
                        className="chat-icon"
                      />
                    }
                  >
                    <Flex vertical gap={4}>
                      <Typography.Text strong>{choice?.title}</Typography.Text>
                      <Typography.Text>{choice?.description}</Typography.Text>
                    </Flex>
                  </AnalyzeButton.Expanded>
                ))}
              </Flex>
            </Flex>
          )
        )}
        {isResponseLoading && (
          <div className="chat-message model-message" style={{ width: '94%' }}>
            <Skeleton active />
          </div>
        )}
      </Flex>
      <Flex gap={12} vertical className="chat-controls">
        <Input.TextArea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          rows={2}
          placeholder="Nima haqida bilmoqchisiz?"
          autoFocus
          onPressEnter={e => {
            if (isMobile) return; // disable enter-submit on mobile
            if (!e.shiftKey) {
              e.preventDefault(); // prevent new line
              handleSend();
            }
          }}
        />
        <Flex gap={6} justify="space-between" align="center">
          <Flex gap={12} align="center" wrap>
            <Typography.Text className="ai-model">
              Model - HEMIS AI v1
            </Typography.Text>
            <Flex gap={4} className="extra-options">
              <Button
                style={{ color: '#cf0000ff' }}
                type="text"
                icon={<Trash2 size={20} />}
                title="Chat tarixini tozalash"
                onClick={() => {
                  if (ready) {
                    deleteChatHistory({
                      token,
                    });
                  }
                }}
              />

              <Popover
                title={
                  <Flex vertical gap={8}>
                    {choices?.map(choice => (
                      <AnalyzeButton
                        key={choice?.chatTopic}
                        icon={<img src={choice?.image} width={20} />}
                        chatTopic={choice?.chatTopic}
                      >
                        {choice?.title}
                      </AnalyzeButton>
                    ))}
                  </Flex>
                }
                trigger={['click']}
              >
                <Button
                  type="text"
                  icon={<LayoutGrid size={20} />}
                  title="Qisqa tahlillar ro'yxati"
                />
              </Popover>
            </Flex>
          </Flex>
          <Button
            title="Yuborish"
            type="text"
            icon={<Image src="/icons/send.svg" preview={false} />}
            onClick={handleSend}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AiChat;
