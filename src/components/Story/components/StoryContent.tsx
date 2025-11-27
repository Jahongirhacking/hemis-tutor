import useParentSize from '@/hooks/useParentSize';
import { Button, Flex, Typography } from 'antd';
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

const SHORT_DESC_HEIGHT = 40;

interface StoryContentProps {
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
}

export interface StoryContentHandle {
  setIsTextCollapsed: Dispatch<SetStateAction<boolean>>;
}

const StoryContent = forwardRef<StoryContentHandle, StoryContentProps>(
  (props, ref) => {
    const { t } = useTranslation();
    const [isTextLong, setIsTextLong] = useState(false);
    const [isTextCollapsed, setIsTextCollapsed] = useState(false);
    const { ref: textRef, height: textHeight } = useParentSize();
    const textHeightInitialized = useRef(false);

    useImperativeHandle(ref, () => ({
      setIsTextCollapsed,
    }));

    useEffect(() => {
      if (!textHeightInitialized?.current && textHeight) {
        if (textHeight >= SHORT_DESC_HEIGHT) {
          setIsTextLong(true);
          setIsTextCollapsed(true);
        }
        textHeightInitialized.current = true;
      }
    }, [textHeight]);

    return (
      <Flex vertical gap={8} justify="flex-end">
        <Flex gap={12} vertical className="story-content">
          <Flex
            vertical
            gap={6}
            style={{
              maxHeight: 170,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#3bb13960 transparent',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Typography.Title level={4} style={{ margin: 0 }}>
              {props?.title}
            </Typography.Title>
            <Flex
              gap={8}
              justify="space-between"
              align="center"
              wrap={!isTextCollapsed}
            >
              <Typography.Text
                className={`story-description ${isTextCollapsed ? 'short' : 'long'}-description`}
                ref={textRef}
              >
                {props?.description}
              </Typography.Text>
              {isTextLong && isTextCollapsed && (
                <Button
                  type="text"
                  onClick={e => {
                    e.stopPropagation();
                    setIsTextCollapsed(false);
                  }}
                  style={{
                    minWidth: 'fit-content',
                  }}
                >
                  <strong>{t('const.read_more')}</strong>
                </Button>
              )}
            </Flex>
          </Flex>
          {props?.link && (
            <Button type="primary" href={props?.link} target="_blank">
              {props?.buttonText || "Batafsil ko'rish"}
            </Button>
          )}
        </Flex>
      </Flex>
    );
  }
);

export default StoryContent;
