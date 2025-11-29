import { useMarkAsReadMutation } from '@/services/student';
import { IMessageDetail, MessageType } from '@/services/student/type';
import { CORRECT_DATE_FORMAT, CURRENT_DATE_FORMAT } from '@/utils/dateFunc';
import { Button, Flex, Rate, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { Calendar1 } from 'lucide-react';
import moment from 'moment';
import { useEffect } from 'react';
import './MessageDetails.scss';

const MessageDetails = ({
  messageDetails,
}: {
  messageDetails: IMessageDetail;
}) => {
  const [markAsRead] = useMarkAsReadMutation();

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
        <Typography.Text type="secondary">{`Kimdan: ${messageDetails?.sender?.name || ''}`}</Typography.Text>
        <Typography.Text
          type="secondary"
          className="line-clamp-1"
        >{`Kimga: ${messageDetails?.recipients?.map(r => r?.name)?.join(', ') || ''}`}</Typography.Text>
        <Button
          type="text"
          icon={<Calendar1 size={15} />}
          className="flex p-0 gap-2 w-min"
        >
          {moment(
            messageDetails?.created_at,
            `${CURRENT_DATE_FORMAT} HH:mm:ss`
          ).format(`${CORRECT_DATE_FORMAT} HH:mm:ss`)}
        </Button>
      </Flex>
      <span
        className="message-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(messageDetails?.message || ''),
        }}
      />
    </Flex>
  );
};

export default MessageDetails;
