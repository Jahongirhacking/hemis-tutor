import { useGetMessageDetailsQuery } from "@/services/student";
import { Modal, Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";
import MessageDetails from "./MessageDetails";

export const MESSAGE_MODAL = "message-id"

const MessageModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: messageData, isFetching } = useGetMessageDetailsQuery({ id: searchParams.get(MESSAGE_MODAL) }, { skip: !searchParams.has(MESSAGE_MODAL) });

    return (
        <Modal
            open={searchParams.has(MESSAGE_MODAL)}
            onCancel={() => {
                const params = new URLSearchParams(searchParams);
                params.delete(MESSAGE_MODAL);
                setSearchParams(params);
            }}
            footer={false}
            maskClosable
            closable
        >
            {
                isFetching ? (
                    <Skeleton active />
                ) : (
                    <MessageDetails messageDetails={messageData?.result} />
                )
            }
        </Modal>
    )
}

export default MessageModal