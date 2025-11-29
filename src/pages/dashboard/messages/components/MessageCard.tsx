import { IMessage, MessageType } from '@/services/student/type'
import { getRightTimeString } from '@/utils/dateFunc'
import { Card, Flex, Rate, Typography } from 'antd'
import { Asterisk, CheckCheck, Clock } from 'lucide-react'

const MessageCard = ({ message: m, readedMessages, handleClick }: { message: IMessage, readedMessages: IMessage['id'][], handleClick: () => void }) => {
    return (
        <Card key={m?.id} hoverable className="message-card" onClick={handleClick}>
            <Flex gap={12} className='w-full'>
                <Rate count={1} value={m?.starred ? 1 : 0} className="mt-1" />
                <Flex vertical gap={8} className='w-full'>
                    <Flex gap={8} align='center' justify='space-between' className='w-full'>
                        <Typography.Text type="success">
                            {
                                (m?.type === MessageType.OUTBOX || m?.type === MessageType.DRAFT
                                    ? m?.recipient?.name
                                    : m?.sender?.name) || m?.sender?.name || m?.recipient?.name
                            }
                        </Typography.Text>
                        {
                            m?.type === MessageType.INBOX && (m?.opened || readedMessages?.includes(m?.id)
                                ? <CheckCheck color='#3bb139' size={18} />
                                : <Asterisk color='#3bb139' size={18} />
                            )
                        }
                    </Flex>
                    {
                        m?.title && (
                            <Typography.Text strong>{m?.title}</Typography.Text>
                        )
                    }
                    {
                        m?.message_preview && (
                            <Typography.Text type="secondary" className='line-clamp-2'>
                                {m?.message_preview}
                            </Typography.Text>
                        )
                    }
                    <Typography.Text type='secondary' className='flex items-center gap-1 ml-auto'><Clock size={14} /> {getRightTimeString(m?.created_at)}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    )
}

export default MessageCard