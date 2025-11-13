import { ThunderEmoji } from '@/assets/emojis';
import { ClearOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedMessage from '../TypingAnimation/AnimatedMessage';

interface IQuestion {
  value: string;
  label: string;
  icon: ReactElement;
}

interface IAnswers {
  [key: string]: ReactElement;
}

interface IBottomInfoMessageProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  questions: IQuestion[];
  answers: IAnswers;
  defaultText?: ReactElement | string;
}

const BottomInfoMessage = ({
  title,
  isOpen,
  setIsOpen,
  questions,
  answers,
  defaultText = '',
}: IBottomInfoMessageProps) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleChoice = (key: string) => {
    setSelectedKey(key);
    setIsAnswered(true);
  };

  const handleClear = () => {
    setIsAnswered(false);
    setSelectedKey(null);
  };

  return (
    <Flex vertical className="bottom-info-message">
      <AnimatedMessage>
        <span style={{ width: '100%' }}>
          <Card
            title={title}
            extra={
              <Button
                onClick={() => setIsOpen(false)}
                icon={<CloseOutlined />}
              />
            }
          >
            <Flex vertical gap={10} className="message-container">
              {defaultText && (
                <span className="admin-message-text message-text">
                  {defaultText}
                </span>
              )}
              <span className="user-message-text message-text">
                {isAnswered ? (
                  <Typography.Paragraph style={{ margin: 0 }}>
                    {
                      questions.find(question => question.value === selectedKey)
                        ?.label
                    }
                  </Typography.Paragraph>
                ) : (
                  <Flex vertical className="questions" gap={5}>
                    {questions.map(question => (
                      <Button
                        key={question.value}
                        onClick={() => handleChoice(question.value)}
                        icon={question.icon}
                        disabled={isAnswered}
                      >
                        {question.label}
                      </Button>
                    ))}
                  </Flex>
                )}
              </span>
              {
                // answer
                isAnswered && (
                  <>
                    <span className="admin-message-text message-text">
                      {answers[selectedKey]}
                      <div style={{ marginLeft: 'auto', width: 'min-content' }}>
                        <img width={20} src={ThunderEmoji} />
                      </div>
                    </span>
                    <span className="admin-message-text message-text">
                      <Button
                        type="primary"
                        onClick={handleClear}
                        icon={<ClearOutlined />}
                      >
                        {t('const.clean')}
                      </Button>
                    </span>
                  </>
                )
              }
            </Flex>
          </Card>
        </span>
      </AnimatedMessage>
    </Flex>
  );
};

export default BottomInfoMessage;
