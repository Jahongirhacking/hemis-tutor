import { SimpleEditor } from '@/components/Editor/SimpleEditor/SimpleEditor';
import { usePagination } from '@/hooks/usePagination';
import {
  useLazyGetRecipientsQuery,
  useSendMessageMutation,
} from '@/services/student';
import { IRecipient, RecipientType } from '@/services/student/type';
import { getLocalStorage, setLocalStorage } from '@/utils/storageFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import {
  Button,
  Divider,
  Empty,
  Flex,
  Input,
  Segmented,
  Select,
  Spin,
  Typography,
  message as antdMessage,
} from 'antd';
import {
  GraduationCap,
  Send,
  SquareCheck,
  SquareX,
  UserStar,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import './CreateMessage.scss';

const ALL_ITEMS = '__all__';
const CLEAR_ITEMS = '__clear__';
const DRAFT_MESSAGE = 'draft_message';

type IRecipientType = IRecipient['id'] | '__all__' | '__clear__';

const CreateMessagePage = () => {
  const { form, values } = useCustomFilter();
  const { pagination } = usePagination();
  const [recipientType, setRecipientType] = useState<RecipientType>(
    RecipientType.ALL
  );
  const [getRecipients, { isFetching, data: recipientsData }] =
    useLazyGetRecipientsQuery();
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<IRecipient['id'][]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const clearInputs = () => {
    setSelected([]);
    setTitle('');
    setMessage('');
  };

  const handleSubmit = useCallback(
    async (asDraft: boolean = false) => {
      const messageContent = asDraft
        ? {
            ...getLocalStorage(DRAFT_MESSAGE),
            save_as_draft: asDraft,
          }
        : {
            title,
            message,
            recipients: selected,
            save_as_draft: asDraft,
          };
      if (
        !messageContent?.message ||
        !messageContent?.title ||
        !messageContent?.recipients?.length
      ) {
        if (!asDraft) {
          antdMessage.warning("Xabar ma'lumot maydoni yetarli kiritilmagan");
        }
        return;
      }
      try {
        await sendMessage(messageContent)?.unwrap();
        antdMessage.success(
          asDraft
            ? 'Xabar qoralamada saqlandi'
            : 'Xabar muvaffaqiyatli yuborildi!'
        );
        clearInputs();
      } catch (err) {
        console.error(err);
      } finally {
        localStorage.removeItem(DRAFT_MESSAGE);
      }
    },
    [sendMessage, message, title, selected]
  );

  useEffect(() => {
    setLocalStorage(DRAFT_MESSAGE, {
      title,
      message,
      recipients: selected,
    });
  }, [selected, title, message]);

  useEffect(() => {
    return () => {
      handleSubmit(true);
    };
  }, []);

  const fetchUsers = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    // store last triggered promise so it can be aborted via RTK Query's abort
    let lastTrigger: any = null;

    return async (search: string) => {
      // Clear previous debounce timer
      if (timeoutId) clearTimeout(timeoutId);

      // Abort previous request if still running
      if (lastTrigger && typeof lastTrigger.abort === 'function') {
        try {
          lastTrigger.abort();
        } catch (_) {}
      }

      timeoutId = setTimeout(async () => {
        try {
          lastTrigger = getRecipients({
            ...values,
            ...pagination,
            type: recipientType,
            search: search || undefined,
            per_page: 50,
          });
          await lastTrigger;
        } catch (err: any) {
          if (err?.name === 'AbortError') {
            console.log('Request cancelled');
          } else {
            console.error(err);
          }
        }
      }, 1000);
    };
  }, [getRecipients, values, pagination, recipientType]);

  const searchUsers = useMemo(() => fetchUsers(), [fetchUsers]);

  useEffect(() => {
    searchUsers('');
  }, [values, recipientType]);

  const studentRecipients = useMemo(
    () =>
      recipientsData?.result?.recipients?.filter(
        r => r?.type === RecipientType.STUDENT
      ),
    [recipientsData]
  );
  const employeeRecipients = useMemo(
    () =>
      recipientsData?.result?.recipients?.filter(
        r => r?.type !== RecipientType.STUDENT
      ),
    [recipientsData]
  );

  const handleChangeAlgorithm = useCallback(
    (values: IRecipientType[]) => {
      setSelected(prev => {
        // Add newly selected values
        const newSelected = values as IRecipient['id'][];
        // Remove items that are no longer selected from this dropdown
        const currentIds =
          recipientsData?.result?.recipients?.map(o => o?.id) ?? [];
        return Array.from(
          new Set([
            ...prev.filter(id => !currentIds.includes(id)), // keep old not in current search
            ...newSelected, // add newly selected
          ])
        );
      });
    },
    [setSelected, recipientsData]
  );

  const handleChange = useCallback(
    (values: IRecipientType[]) => {
      if (values.includes(ALL_ITEMS)) {
        handleChangeAlgorithm(
          recipientsData?.result?.recipients?.map(o => o?.id)
        );
      } else if (values.includes(CLEAR_ITEMS)) {
        setSelected([]);
      } else {
        handleChangeAlgorithm(values as IRecipient['id'][]);
      }
    },
    [recipientsData]
  );

  return (
    <Flex vertical gap={18} className="w-full create-message-page">
      <CustomFilter form={form}>
        <Flex vertical gap={12} className="w-full">
          <Flex
            gap={8}
            align="center"
            justify="space-between"
            className="w-full"
            wrap
          >
            <Segmented
              value={recipientType}
              onChange={value => setRecipientType(value)}
              options={[
                { value: RecipientType.ALL, label: t('const.all') },
                { value: RecipientType.STUDENT, label: t('const.student') },
                { value: RecipientType.EMPLOYEE, label: t('const.staff') },
              ]}
            />
            <Flex align="center" gap={8} wrap>
              <CustomFilter.ByGroup />
            </Flex>
          </Flex>
          <Select
            className="w-full"
            showSearch
            placeholder={'Qabul qiluvchilarni tanlang'}
            filterOption={false}
            onSearch={searchUsers}
            onChange={handleChange}
            value={selected}
            options={[
              ...(recipientsData?.result?.recipients?.length
                ? [
                    {
                      label: (
                        <Typography.Text
                          style={{ color: '#3bb139' }}
                          className="flex gap-2 items-center line-clamp-1"
                        >
                          <SquareCheck size={14} /> {`${t('const.all')}`}
                        </Typography.Text>
                      ),
                      value: ALL_ITEMS,
                    },
                  ]
                : []),
              ...(recipientsData?.result?.recipients?.length && selected?.length
                ? [
                    {
                      label: (
                        <Typography.Text
                          type="danger"
                          className="flex gap-2 items-center line-clamp-1"
                        >
                          <SquareX size={14} /> {`${t('const.clean')}`}
                        </Typography.Text>
                      ),
                      value: CLEAR_ITEMS,
                    },
                  ]
                : []),
              ...(studentRecipients?.length
                ? [
                    {
                      label: t('const.student'),
                      title: t('const.student'),
                      options: studentRecipients?.map(r => ({
                        label: (
                          <span className="flex gap-2 items-center line-clamp-1">
                            <GraduationCap size={14} />{' '}
                            {`${r?.name} - ${r?.label}`}
                          </span>
                        ),
                        value: r?.id,
                        title: `${r?.name} - ${r?.label}`,
                      })),
                    },
                  ]
                : []),
              ...(employeeRecipients?.length
                ? [
                    {
                      label: t('const.staff'),
                      title: t('const.staff'),
                      options: employeeRecipients?.map(r => ({
                        label: (
                          <span className="flex gap-2 items-center line-clamp-1">
                            <UserStar size={14} /> {`${r?.name} - ${r?.label}`}
                          </span>
                        ),
                        value: r?.id,
                        title: `${r?.name} - ${r?.label}`,
                      })),
                    },
                  ]
                : []),
            ]}
            loading={isFetching}
            notFoundContent={
              isFetching ? (
                <Spin size="small" />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={`${toFirstCapitalLetter(t('const.not_found'))}`}
                />
              )
            }
            mode="multiple"
          />
        </Flex>
      </CustomFilter>

      <Divider className="m-0" />

      <Flex vertical gap={18} className="w-full">
        <Flex
          gap={12}
          justify="space-between"
          align="center"
          className="w-full"
          wrap
        >
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Xabar yozish
          </Typography.Title>
          <Button
            type="primary"
            className="ml-auto"
            icon={<Send size={16} />}
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleSubmit(false)}
          >
            {t('const.send')}
          </Button>
        </Flex>
        <Flex vertical gap={12}>
          <Input
            placeholder="Sarlavha kiriting"
            value={title}
            onChange={e => setTitle(e?.target?.value)}
          />
          <SimpleEditor
            placeholder="Xabar yozing..."
            initialValue={message}
            onChange={value => setMessage(value)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateMessagePage;
