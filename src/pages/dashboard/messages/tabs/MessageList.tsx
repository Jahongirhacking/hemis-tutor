import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { usePagination } from '@/hooks/usePagination';
import { useGetMessagesQuery } from '@/services/student';
import { IMessage, MessageType } from '@/services/student/type';
import { Badge, Card, Divider, Flex, Segmented, Skeleton } from 'antd';
import { Inbox, NotepadText, Send } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import MessageCard from '../components/MessageCard';
import { MESSAGE_MODAL } from '../components/MessageModal';

const MessageList = () => {
  const { form, values } = useCustomFilter();
  const { pagination } = usePagination();
  const [type, setType] = useState(MessageType.INBOX);
  const { data: messageData, isFetching } = useGetMessagesQuery({
    ...pagination,
    ...values,
    type,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [readedMessages, setReadedMessages] = useState<IMessage['id'][]>([]);

  const handleMessageCardClick = useCallback(
    (id: IMessage['id']) => {
      const params = new URLSearchParams(searchParams);
      params.set(MESSAGE_MODAL, String(id));
      setSearchParams(params);
      setReadedMessages(prev => [...prev, id]);
    },
    [searchParams, setSearchParams, readedMessages, setReadedMessages]
  );

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
              // {
              //   label: (
              //     <Flex gap={6} align="center">
              //       {`O'chirilgan${messageData?.result?.counters?.trash ? ` (${messageData?.result?.counters?.trash})` : ''}`}
              //     </Flex>
              //   ),
              //   icon: <Trash2 size={16} />,
              //   value: MessageType.TRASH,
              // },
            ]}
          />
          <CustomFilter.BySearch />
        </Flex>
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <Flex vertical gap={12} className="w-full">
        {isFetching ? (
          <GenerateSkeleton numberOfRepetition={3} vertical>
            <Card>
              <Skeleton active />
            </Card>
          </GenerateSkeleton>
        ) : messageData?.result?.messages?.length ? (
          <Flex vertical gap={24} className="w-full">
            <Flex vertical gap={18} className="w-full">
              {messageData?.result?.messages?.map(m => (
                <MessageCard
                  key={m?.id}
                  handleClick={() => handleMessageCardClick(m?.id)}
                  readedMessages={readedMessages}
                  message={m}
                />
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
