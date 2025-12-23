import { useCreateTaskMutation } from '@/services/profile';
import {
  getTaskPriorityName,
  ICreateTaskReq,
  TaskPriority,
} from '@/services/profile/type';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Select,
  Tag,
} from 'antd';
import enUS from 'antd/es/calendar/locale/en_US';
import dayjs from 'dayjs';
import moment from 'moment';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCustomFilter from '../../components/forms/useCustomFilter';

export const CREATE_TODO_PARAM = 'create-todo';

enum CreateTaskProps {
  Title = 'title',
  Description = 'description',
  DueAt = 'due_at',
  Priority = 'priority',
}

const customLocale = {
  ...enUS,
  lang: {
    ...enUS.lang,
    today: 'Bugun',
    now: 'Hozir',
    clear: 'Tozalash',
    ok: 'Tanlash',
  },
};

const CreateTodoModal = ({ ...props }: ModalProps) => {
  const { form } = useCustomFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCancelModal = useCallback(() => {
    form.resetFields();
    const params = new URLSearchParams(searchParams);
    params.delete(CREATE_TODO_PARAM);
    setSearchParams(params);
  }, [form, searchParams, setSearchParams]);

  const handleAddTodo = async ({ due_at, ...values }: ICreateTaskReq) => {
    try {
      await createTask({
        ...values,
        due_at: moment((due_at as any)?.toDate()).format('DD.MM.YYYY HH:mm:ss'),
      })?.unwrap();
      message.success('Vazifa yaratildi');
      handleCancelModal();
    } catch (err) {
      console.error(err);
      message.error('Vazifa yaratishda xatolik');
    }
  };

  return (
    <Modal
      title="Yangi vazifa qo'shish"
      open={searchParams.has(CREATE_TODO_PARAM)}
      onCancel={handleCancelModal}
      footer={null}
      className="add-todo-modal"
      destroyOnHidden
      {...props}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddTodo}
        initialValues={{
          [CreateTaskProps.Priority]: TaskPriority.Low,
          [CreateTaskProps.DueAt]: dayjs(),
        }}
      >
        <Flex vertical gap={4} className="mt-4">
          <Form.Item
            name={CreateTaskProps.Title}
            label={'Vazifa nomi'}
            rules={[
              {
                required: true,
                message: 'Vazifa nomi majburiy',
              },
            ]}
          >
            <Input placeholder="Vazifa nomini kiriting" />
          </Form.Item>

          <Form.Item
            name={CreateTaskProps.Description}
            label={'Tavsif (ixtiyoriy)'}
          >
            <Input.TextArea
              placeholder="Vazifa haqida qisqacha ma'lumot"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name={CreateTaskProps.DueAt}
            label={'Bajarish muddati'}
            rules={[
              {
                required: true,
                message: 'Bajarish muddati majburiy',
              },
            ]}
          >
            <DatePicker
              className="w-full min-h-[40px]"
              showTime
              format={'DD.MM.YYYY HH:mm:ss'}
              placeholder="Bajarish muddati"
              locale={customLocale}
            />
          </Form.Item>

          <Form.Item
            name={CreateTaskProps.Priority}
            label={'Ustuvorlik darajasi'}
            rules={[
              {
                required: true,
                message: 'Ustuvorlik darajasi majburiy',
              },
            ]}
          >
            <Select
              placeholder="Ustuvorlik darajasi tanlang"
              options={[
                {
                  label: (
                    <Tag color="green">
                      {getTaskPriorityName(TaskPriority.Low)}
                    </Tag>
                  ),
                  value: TaskPriority.Low,
                },
                {
                  label: (
                    <Tag color="orange">
                      {getTaskPriorityName(TaskPriority.Medium)}
                    </Tag>
                  ),
                  value: TaskPriority.Medium,
                },
                {
                  label: (
                    <Tag color="red">
                      {getTaskPriorityName(TaskPriority.High)}
                    </Tag>
                  ),
                  value: TaskPriority.High,
                },
              ]}
            />
          </Form.Item>
        </Flex>

        <Flex className="ml-auto" justify="flex-end" gap={8} wrap>
          <Button onClick={handleCancelModal}>Bekor qilish</Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Yaratish
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateTodoModal;
