import { useGetGradeDebtorsQuery } from '@/services/student';
import { RootState } from '@/store/store';
import {
  Card,
  Collapse,
  Flex,
  Form,
  Select,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCustomTable from '../../components/hooks/useCustomTable';

const Debtors = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const { data: debtorsData, isFetching } = useGetGradeDebtorsQuery(
    { ...values },
    { skip: !values?.group_id }
  );
  const { profile } = useSelector((store: RootState) => store.authSlice);
  const { emptyText } = useCustomTable({});

  useEffect(() => {
    if (profile) {
      form.setFieldValue('group_id', profile?.groups?.[0]?.id);
    }
  }, [profile]);

  return (
    <Flex vertical gap={18}>
      <Form form={form} layout="vertical">
        <Flex gap={8} align="center">
          <Form.Item name={'group_id'} style={{ margin: 0 }}>
            <Select
              style={{ width: 180 }}
              placeholder={'Guruh tanlang'}
              options={profile?.groups?.map(g => ({
                label: g?.name,
                value: g?.id,
              }))}
            />
          </Form.Item>
        </Flex>
      </Form>

      <Flex gap={12} vertical>
        {isFetching ? (
          <Skeleton active />
        ) : debtorsData?.result?.debtors?.length ? (
          debtorsData?.result?.debtors?.map(d => (
            <Collapse
              key={d?.student?.id}
              items={[
                {
                  key: '1',
                  label: (
                    <Flex justify="space-between" gap={8}>
                      <Typography.Text strong>
                        {d?.student?.full_name}
                      </Typography.Text>
                      <Tag color="error">{d?.total_debts}</Tag>
                    </Flex>
                  ),
                  children: d?.debts?.length ? (
                    <Flex gap={8}>
                      {d?.debts?.map(s => (
                        <Card key={s?.subject}>
                          <Flex vertical gap={6}>
                            <Typography.Text strong>
                              {s?.subject}
                            </Typography.Text>
                            <Typography.Text>{s?.exam_type}</Typography.Text>
                            <Tag color="red">{s?.grade}</Tag>
                          </Flex>
                        </Card>
                      ))}
                    </Flex>
                  ) : (
                    emptyText
                  ),
                },
              ]}
            />
          ))
        ) : (
          emptyText
        )}
      </Flex>
    </Flex>
  );
};

export default Debtors;
