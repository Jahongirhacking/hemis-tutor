import { IMessage, MessageType } from '@/services/student/type';
import { getRightTimeString } from '@/utils/dateFunc';
import { Rate } from 'antd';
import { Asterisk, CheckCheck, Clock } from 'lucide-react';

const MessageCard = ({
  message: m,
  readedMessages,
  handleClick,
}: {
  message: IMessage;
  readedMessages: IMessage['id'][];
  handleClick: () => void;
}) => {
  const isRead = m?.opened || readedMessages?.includes(m?.id);

  const senderName =
    (m?.type === MessageType.OUTBOX || m?.type === MessageType.DRAFT
      ? m?.recipient?.name
      : m?.sender?.name) ||
    m?.sender?.name ||
    m?.recipient?.name;

  return (
    <div
      onClick={handleClick}
      className="
        w-full cursor-pointer select-none
        rounded-xl border border-gray-200 bg-white
        p-4 shadow-sm
        hover:shadow-md hover:bg-gray-50
        transition-all duration-150
      "
    >
      <div className="flex gap-3">
        <Rate count={1} value={m?.starred ? 1 : 0} className="mt-1" />

        <div className="flex flex-col gap-1 w-full">
          {/* Top Row */}
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-[#14b8a6]">{senderName}</span>

            {m?.type === MessageType.INBOX &&
              (isRead ? (
                <CheckCheck className="text-[#14b8a6]" size={18} />
              ) : (
                <Asterisk className="text-[#14b8a6]" size={18} />
              ))}
          </div>

          {/* Title */}
          {m?.title && (
            <span className="font-semibold text-gray-800">{m?.title}</span>
          )}

          {/* Preview */}
          {m?.message_preview && (
            <span className="text-gray-500 text-sm line-clamp-2">
              {m?.message_preview}
            </span>
          )}

          {/* Time */}
          <span className="text-gray-400 text-sm flex items-center gap-1 ml-auto">
            <Clock size={14} /> {getRightTimeString(m?.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
