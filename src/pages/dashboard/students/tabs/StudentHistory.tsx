import { usePagination } from '@/hooks/usePagination';
import { useGetStudentHistoryListQuery } from '@/services/student';
import { CORRECT_DATE_FORMAT, CURRENT_DATE_FORMAT } from '@/utils/dateFunc';
import { Divider, Flex, Tag } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

enum FilterItem {
  GROUP_ID = 'group',
}

const StudentHistory = () => {
  const { form, values } = useCustomFilter();
  const { pagination, setPagination } = usePagination();
  const { data: historyData, isFetching } = useGetStudentHistoryListQuery({
    ...values,
    ...pagination,
  });
  const { t } = useTranslation();

  useEffect(() => {
    setPagination({
      page: undefined,
      per_page: undefined,
    });
  }, [values]);

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.BySearch />
        <CustomFilter.ByPinfl />
        <CustomFilter.ByGroup field={FilterItem.GROUP_ID} />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        columns={[
          {
            title: t('const.student'),
            key: 'full_name',
            dataIndex: 'full_name',
            width: 250,
          },
          {
            title: t('const.group'),
            key: 'group',
            dataIndex: 'group',
          },
          {
            title: t('const.course'),
            key: 'level',
            dataIndex: 'level',
          },
          {
            title: t('const.status'),
            key: 'status_change',
            dataIndex: 'status_change',
            render: status => <Tag>{status}</Tag>,
          },
          {
            title: t('const.date'),
            key: 'date',
            dataIndex: 'date',
            render: date => (
              <Tag color={'blue'}>
                {moment(date, CURRENT_DATE_FORMAT).format(CORRECT_DATE_FORMAT)}
              </Tag>
            ),
          },
          {
            title: t('const.comment'),
            key: 'comment',
            dataIndex: 'comment',
            render: comment => comment || '-',
          },
        ]}
        loading={isFetching}
        paginationTotal={historyData?.result?.pagination?.total_count}
        pagination={false}
        dataSource={historyData?.result?.history}
      />
    </Flex>
  );
};

export default StudentHistory;
