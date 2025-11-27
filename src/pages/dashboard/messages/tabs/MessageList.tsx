import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { usePagination } from '@/hooks/usePagination';
import { useGetMessagesQuery } from '@/services/student';
import { MessageType } from '@/services/student/type';
import {
  Badge,
  Card,
  Divider,
  Flex,
  Segmented,
  Skeleton,
  Typography,
} from 'antd';
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
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <Flex justify="space-between" align="center" className="w-full">
          <Segmented
            value={type}
            onChange={value => setType(value)}
            options={[
              {
                label: (
                  <Flex gap={6} align="center">
                    {'Kiruvchi'}{' '}
                    <Badge
                      size="small"
                      count={messageData?.result?.counters?.inbox}
                    />
                  </Flex>
                ),
                value: MessageType.INBOX,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {'Chiquvchi'}{' '}
                    <Badge
                      size="small"
                      count={messageData?.result?.counters?.outbox}
                    />
                  </Flex>
                ),
                value: MessageType.OUTBOX,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {'Qoralama'}{' '}
                    <Badge
                      size="small"
                      count={messageData?.result?.counters?.draft}
                    />
                  </Flex>
                ),
                value: MessageType.DRAFT,
              },
              {
                label: (
                  <Flex gap={6} align="center">
                    {"O'chirilgan"}{' '}
                    <Badge
                      size="small"
                      count={messageData?.result?.counters?.trash}
                    />
                  </Flex>
                ),
                value: MessageType.TRASH,
              },
            ]}
          />
          <CustomFilter.BySearch />
        </Flex>

        <Divider style={{ margin: 0 }} />

        <Flex vertical gap={12} className="w-full">
          {isFetching ? (
            <Skeleton active />
          ) : messageData?.result?.messages?.length ? (
            <Flex vertical gap={24} className="w-full">
              <Flex vertical gap={8} className="w-full">
                {messageData?.result?.messages?.map(m => (
                  <Card key={m?.id} hoverable>
                    <Flex vertical gap={8}>
                      <Typography.Text type="success">
                        {m?.sender?.name}
                      </Typography.Text>
                      <Typography.Text strong>{m?.title}</Typography.Text>
                      <Typography.Text type="secondary">
                        {m?.message_preview}
                      </Typography.Text>
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
      </CustomFilter>
    </Flex>
  );
};

export default MessageList;
