import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { usePagination } from '@/hooks/usePagination';
import { useGetMessagesQuery } from '@/services/student';
import { MessageType } from '@/services/student/type';
import {
  Badge,
  Card,
  Divider,
  Flex,
  Rate,
  Segmented,
  Skeleton,
  Typography,
} from 'antd';
import { Asterisk, CheckCheck, Inbox, NotepadText, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CustomPagination from '../../components/CustomPagination';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const MessageList = () => {
  const { form, values } = useCustomFilter();
  const { pagination } = usePagination();
  const [type, setType] = useState(MessageType.INBOX);
  const { data: messageData, isFetching } = useGetMessagesQuery({
    ...pagination,
    ...values,
    type,
  });

  return (
    <Flex vertical gap={18} className="messages-page">
      <CustomFilter form={form}>
        <Flex
          gap={12}
          justify="space-between"
          align="center"
          className="w-full"
          wrap
        >
          <Segmented
            value={type}
            onChange={value => setType(value)}
            options={[
              {
                label: (
                  <Flex gap={6} align="center">
                    {`Kiruvchi${messageData?.result?.counters?.inbox ? ` (${messageData?.result?.counters?.inbox})` : ''}`}
                    <Badge
                      size="small"
                      count={messageData?.result?.counters?.unread_inbox}
                    />
                  </Flex>
                ),
                icon: <Inbox size={16} />,
                value: MessageType.INBOX,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {`Chiquvchi${messageData?.result?.counters?.inbox ? ` (${messageData?.result?.counters?.outbox})` : ''}`}
                  </Flex>
                ),
                icon: <Send size={16} />,
                value: MessageType.OUTBOX,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {`Qoralama${messageData?.result?.counters?.draft ? ` (${messageData?.result?.counters?.draft})` : ''}`}
                  </Flex>
                ),
                icon: <NotepadText size={16} />,
                value: MessageType.DRAFT,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {`O'chirilgan${messageData?.result?.counters?.trash ? ` (${messageData?.result?.counters?.trash})` : ''}`}
                  </Flex>
                ),
                icon: <Trash2 size={16} />,
                value: MessageType.TRASH,
              },
            ]}
          />
          <CustomFilter.BySearch />
        </Flex>
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <Flex vertical gap={12} className="w-full">
        {isFetching ? (
          <Skeleton active />
        ) : messageData?.result?.messages?.length ? (
          <Flex vertical gap={24} className="w-full">
            <Flex vertical gap={12} className="w-full">
              {messageData?.result?.messages?.map(m => (
                <Card key={m?.id} hoverable className="message-card">
                  <Flex gap={12} className='w-full'>
                    <Rate count={1} value={m?.starred ? 1 : 0} className="mt-1" />
                    <Flex vertical gap={8} className='w-full'>
                      <Flex gap={8} align='center' justify='space-between' className='w-full'>
                        <Typography.Text type="success">
                          {m?.sender?.name}
                        </Typography.Text>
                        {
                          m?.opened
                            ? <CheckCheck color='#3bb139' size={18} />
                            : <Asterisk color='#3bb139' size={18} />
                        }
                      </Flex>
                      <Typography.Text strong>{m?.title}</Typography.Text>
                      <Typography.Text type="secondary">
                        {m?.message_preview}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
            <CustomPagination
              total={messageData?.result?.pagination?.total_count}
            />
          </Flex>
        ) : (
          <NotFoundAnimation.Dashboard />
        )}
      </Flex>
    </Flex>
  );
};

export default MessageList;
