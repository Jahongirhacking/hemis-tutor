import FileList from '@/components/FileList';
import {
  useGetTaskDetailQuery,
  useUpdateTaskMutation,
  useUploadTaskFileMutation,
} from '@/services/profile';
import { TaskStatus } from '@/services/profile/type';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  message,
  Modal,
  ModalProps,
  Skeleton,
  Tag,
  Typography,
  Upload,
} from 'antd';
import { Check } from 'lucide-react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const TODO_DETAILS_PARAM = 'todo-details';

const TodoDetailsModal = ({
  handleToggleTodo,
  ...props
}: ModalProps & {
  handleToggleTodo: (taskId: number, value: boolean) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get(TODO_DETAILS_PARAM));
  const { data: todo, isFetching } = useGetTaskDetailQuery(
    { id: taskId },
    { skip: !taskId }
  );
  const task = todo?.result?.task;
  const [uploadFile, { isLoading: isFileLoading, data: fileData }] =
    useUploadTaskFileMutation();
  const [updateTask, { isLoading: isUpdateLoading }] = useUpdateTaskMutation();

  const handleFileUpload = useCallback(
    async (info: any) => {
      try {
        const formData = new FormData();
        formData.append('file', info);
        const res = await uploadFile(formData)?.unwrap();
        await updateTask({ id: taskId, file: res?.result?.file });
        message.success('Fayl muvaffaqiyatli yuklandi');
      } catch (err) {
        console.error(err);
      }
    },
    [taskId, updateTask, uploadFile]
  );

  const handleNotesChange = useCallback(
    async (notes: string) => {
      await updateTask({ id: taskId, result_note: notes })?.unwrap();
    },
    [taskId, updateTask]
  );

  const handleCancelModal = useCallback(() => {
    updateTask({ id: taskId, status: task?.status })?.unwrap();
    const params = new URLSearchParams(searchParams);
    params.delete(TODO_DETAILS_PARAM);
    setSearchParams(params);
  }, [updateTask, taskId, task, searchParams, setSearchParams]);

  return (
    <Modal
      open={!!taskId}
      onCancel={handleCancelModal}
      footer={null}
      className="todo-modal"
      destroyOnHidden
      {...props}
    >
      <Flex vertical gap={16}>
        {isFetching ? (
          <Skeleton active />
        ) : (
          <Card
            key={task?.id}
            className={`task-detail-card ${task?.status === TaskStatus.Completed ? 'completed' : ''}`}
            style={{
              background:
                task?.status === TaskStatus.Completed
                  ? 'rgba(20, 184, 166, 0.05)'
                  : 'rgba(0, 0, 0, 0.02)',
              border:
                task?.status === TaskStatus.Completed
                  ? '1px solid rgba(20, 184, 166, 0.3)'
                  : '1px solid rgba(148, 163, 184, 0.2)',
            }}
          >
            <Flex vertical gap={16}>
              <Flex gap={12} align="start">
                <Checkbox
                  checked={task?.status === TaskStatus.Completed}
                  onChange={e => handleToggleTodo(taskId, e?.target?.checked)}
                  style={{ marginTop: '4px' }}
                />
                <Flex vertical gap={8} style={{ flex: 1 }}>
                  <Flex justify="space-between" align="center" wrap gap={8}>
                    <Typography.Text
                      strong
                      style={{
                        fontSize: '18px',
                        textDecoration:
                          task?.status === TaskStatus.Completed
                            ? 'line-through'
                            : 'none',
                      }}
                    >
                      {task?.title}
                    </Typography.Text>
                    {task?.due_at && <Tag color="blue">{task?.due_at}</Tag>}
                  </Flex>
                  {task?.description && (
                    <Typography.Text type="secondary">
                      {task?.description}
                    </Typography.Text>
                  )}
                </Flex>
              </Flex>

              <Flex vertical gap={12}>
                <Typography.Text strong>
                  Vazifani bajarish uchun:
                </Typography.Text>

                <Flex vertical gap={8} wrap justify="flex-start">
                  <Upload
                    accept="*/*"
                    showUploadList={false}
                    beforeUpload={file => {
                      handleFileUpload(file); // ✅ only called once per file
                      return false; // prevent auto-upload
                    }}
                  >
                    <Button
                      loading={isFileLoading || isUpdateLoading}
                      icon={<UploadOutlined />}
                    >
                      Fayl yuklash (ixtiyoriy)
                    </Button>
                  </Upload>
                  {((fileData as any)?.result?.file?.path ||
                    task?.file_url) && (
                    <FileList
                      className="max-h-[110px]"
                      files={[
                        {
                          name: (
                            (fileData as any)?.result?.file?.path ||
                            task?.file_url
                          )
                            ?.split('/')
                            ?.slice(-1)
                            ?.join('.'),
                          url:
                            (fileData as any)?.result?.file?.path ||
                            task?.file_url,
                          description: 'Yuklangan fayl',
                        },
                      ]}
                    />
                  )}
                </Flex>

                <Input.TextArea
                  placeholder="Izoh yozing (ixtiyoriy)"
                  rows={3}
                  defaultValue={task?.result_note}
                  onBlur={e => handleNotesChange(e.target.value)}
                />
              </Flex>

              {task?.status === TaskStatus.Completed && (
                <Flex
                  align="center"
                  gap={8}
                  style={{
                    padding: '12px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <Typography.Text
                    className="flex gap-2"
                    style={{ color: '#22c55e' }}
                  >
                    <Check /> Vazifa bajarildi
                  </Typography.Text>
                </Flex>
              )}
            </Flex>
          </Card>
        )}
      </Flex>
    </Modal>
  );
};

export default TodoDetailsModal;
