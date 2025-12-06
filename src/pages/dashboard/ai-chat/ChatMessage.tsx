import AnalyzeWithVoice from '@/components/Chat/components/AnalyzeWithVoice';
import VoiceBtn from '@/components/Chat/components/VoiceBtn';
import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import useTTS from '@/hooks/useTTS';
import { ChatRoleEnum, IChatMessage } from '@/services/chat/type';
import { Button, Dropdown, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { EllipsisVertical } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ content }: { content: IChatMessage }) => {
  const { mode, onClickBtn, isLoading, stopAudio } = useTTS();

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <AnalyzeWithVoice mode={mode} stopAudio={stopAudio}>
      <AnimatedMessage>
        <div
          className={`chat-message ${content?.type === ChatRoleEnum.Model ? 'model' : 'user'}-message`}
          style={{ position: 'relative' }}
        >
          <Typography.Paragraph className="animated-text-content">
            <ReactMarkdown>
              {DOMPurify.sanitize(content?.content)}
            </ReactMarkdown>
          </Typography.Paragraph>
          {content?.type === ChatRoleEnum.Model && (
            <Dropdown
              trigger={['click', 'contextMenu']}
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <VoiceBtn
                        mode={mode}
                        isLoading={isLoading}
                        onClick={() => onClickBtn({ result: content?.content })}
                      />
                    ),
                  },
                ],
              }}
            >
              <Button
                aria-label="Xabar ustida amallar"
                title="Amallar"
                icon={<EllipsisVertical size={12} />}
                type="text"
                style={{
                  width: 'fit-content',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              />
            </Dropdown>
          )}
        </div>
      </AnimatedMessage>
    </AnalyzeWithVoice>
  );
};

export default ChatMessage;
