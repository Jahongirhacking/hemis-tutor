import { paths } from '@/router/paths';
import { useMarkAsReadMutation } from '@/services/student';
import { IMessageDetail, MessageType } from '@/services/student/type';
import { SearchParams } from '@/utils/config';
import { Button, Flex, Rate, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { t } from 'i18next';
import { Calendar1, Reply } from 'lucide-react';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageTabs } from '..';
import { MessageRecipient } from '../tabs/CreateMessage';
import './MessageDetails.scss';

const MessageDetails = ({
  messageDetails,
}: {
  messageDetails: IMessageDetail;
}) => {
  const [markAsRead] = useMarkAsReadMutation();

  const getReplyUrl = useCallback(
    (id: number, name?: string) =>
      `${paths.private.messages}?${SearchParams.ActiveTab}=${MessageTabs.CreateMessages}&${MessageRecipient.Id}=${id}&${MessageRecipient.Name}=${name}`,
    []
  );

  useEffect(() => {
    if (
      messageDetails &&
      messageDetails?.type === MessageType.INBOX &&
      !messageDetails?.opened
    ) {
      markAsRead({ id: messageDetails?.id });
    }
  }, [messageDetails]);

  return (
    <Flex vertical gap={12} className="w-full message-details-container">
      <Flex gap={8} className="w-full" align="center">
        <Rate count={1} value={messageDetails?.starred ? 1 : 0} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {messageDetails?.title || ''}
        </Typography.Title>
      </Flex>
      <Flex vertical gap={6}>
        <Typography.Text
          type="secondary"
          className="line-clamp-2 flex items-center gap-2"
        >
          <span className="min-w-[45px]">Kimdan:</span>
          {messageDetails?.sender?.id ? (
            <Link
              to={getReplyUrl(
                messageDetails?.sender?.id,
                messageDetails?.sender?.name
              )}
            >
              {messageDetails?.sender?.name || ''}
            </Link>
          ) : (
            messageDetails?.sender?.name
          )}
        </Typography.Text>
        <Typography.Text type="secondary" className="line-clamp-2 flex gap-2">
          <span className="min-w-[45px]">Kimga:</span>
          <Flex className="gap-x-3 gap-y-[1px]" wrap>
            {messageDetails?.recipients
              ?.filter(r => !!r?.id)
              ?.map(r => (
                <Link key={r?.id} to={getReplyUrl(r?.id, r?.name)}>
                  {r?.name}
                </Link>
              ))}
          </Flex>
        </Typography.Text>
        <Button
          type="text"
          icon={<Calendar1 size={15} />}
          className="flex p-0 gap-2 w-min"
        >
          {moment(messageDetails?.created_at, 'YYYY-MM-DD HH:mm:ss').format(
            `DD.MM.YYYY HH:mm`
          )}
        </Button>
      </Flex>
      <span
        className="message-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(messageDetails?.message || ''),
        }}
      />
      {!messageDetails?.deleted && (
        <Flex className="ml-auto" gap={8}>
          {/* <Button
            loading={isDeleteLoading}
            danger
            icon={<DeleteOutlined size={14} />}
            onClick={handleDeleteMessage}
          >
            {t('const.delete')}
          </Button> */}
          {messageDetails?.type === MessageType.INBOX &&
            !!messageDetails?.sender?.id && (
              <Link
                to={getReplyUrl(
                  messageDetails?.sender?.id,
                  messageDetails?.sender?.name
                )}
              >
                <Button
                  type="default"
                  style={{ color: '#14b8a6', borderColor: '#14b8a6' }}
                  icon={<Reply size={14} />}
                >
                  {t('const.reply')}
                </Button>
              </Link>
            )}
        </Flex>
      )}
    </Flex>
  );
};

export default MessageDetails;
