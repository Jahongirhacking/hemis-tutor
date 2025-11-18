import { useGetGradeDebtorsQuery } from '@/services/student';
import { Card, Collapse, Flex, Skeleton, Tag, Typography } from 'antd';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import useCustomTable from '../../components/hooks/useCustomTable';

const Debtors = () => {
  const { form, values } = useCustomFilter();
  const { data: debtorsData, isFetching } = useGetGradeDebtorsQuery({
    group_id: values?.[FilterKey.GroupId],
    semester: values?.[FilterKey.Semester],
  });
  const { emptyText } = useCustomTable({});

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

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
