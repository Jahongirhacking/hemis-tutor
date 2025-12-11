import { usePagination } from '@/hooks/usePagination';
import { useGetExamsQuery } from '@/services/student';
import { IExam } from '@/services/student/type';
import {
  formatUnixTimestampToDate,
  LangType,
  setTimeToTimestamp,
} from '@/utils/dateFunc';
import { Badge, Divider, Flex, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const Exams = () => {
  const { form, values } = useCustomFilter();
  const { pagination } = usePagination();
  const { data: examsData, isFetching } = useGetExamsQuery({
    ...values,
    ...pagination,
  });
  const { t, i18n } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <Flex vertical gap={18}>
        <CustomTable
          columns={[
            { title: '#', dataIndex: 'index', key: 'index', width: 60 },
            { title: t('const.group'), dataIndex: 'group', key: 'group' },
            {
              title: t('const.date'),
              dataIndex: 'exam_date',
              key: 'exam_date',
              render: (date, record: IExam) =>
                (() => {
                  const d = moment(date, 'YYYY-MM-DD');
                  const startTime = moment.unix(
                    setTimeToTimestamp(d.unix(), record?.start_time)
                  );
                  const endTime = moment.unix(
                    setTimeToTimestamp(d.unix(), record?.finish_time)
                  );
                  const now = moment();
                  return (
                    <Flex vertical gap={2}>
                      <Typography.Text>{`${formatUnixTimestampToDate(d?.unix(), '-', 'long', i18n?.language as LangType)}, ${d?.format('YYYY')}`}</Typography.Text>
                      <Flex gap={6} align="center">
                        <Badge
                          status={
                            now.isBetween(startTime, endTime, null, '[]')
                              ? 'processing'
                              : now.isAfter(endTime)
                                ? 'default'
                                : 'success'
                          }
                        />
                        <Typography.Text>{`${record?.start_time} - ${record?.finish_time}`}</Typography.Text>
                      </Flex>
                    </Flex>
                  );
                })(),
            },
            {
              title: t('const.subject'),
              dataIndex: 'subject',
              key: 'subject',
            },
            {
              title: t('const.exam_type'),
              dataIndex: 'exam_type',
              key: 'exam_type',
            },
            {
              title: t('const.auditorium'),
              dataIndex: 'auditorium',
              key: 'auditorium',
            },
          ]}
          loading={isFetching}
          dataSource={examsData?.result?.exams}
          paginationTotal={examsData?.result?.pagination?.total_count}
          pagination={false}
        />
      </Flex>
    </Flex>
  );
};

export default Exams;
