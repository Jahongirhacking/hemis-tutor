import { useGetStudentHistoryQuery } from '@/services/student';
import { Flex, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';

const StudentHistory = ({ props: id }: { props: string }) => {
  const studentId = useMemo(() => Number(id), []);
  const { data: historyData, isFetching } = useGetStudentHistoryQuery(
    { id: studentId },
    { skip: !studentId }
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12} align="center">
      <Typography.Title level={4}>
        {historyData?.result?.student?.full_name}
      </Typography.Title>
      <CustomTable
        columns={[
          {
            title: t('const.education_type'),
            dataIndex: 'education_type',
            key: 'education_type',
          },
          {
            title: t('const.education_form'),
            dataIndex: 'education_form',
            key: 'education_form',
          },
          {
            title: t('const.expertise'),
            dataIndex: 'specialty',
            key: 'specialty',
          },
          {
            title: t('const.course'),
            dataIndex: 'level',
            key: 'level',
          },
          {
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
          },
          {
            title: t('const.semester'),
            dataIndex: 'semester',
            key: 'semester',
          },
          {
            title: t('const.payment_form'),
            dataIndex: 'payment_form',
            key: 'payment_form',
          },
        ]}
        loading={isFetching}
        dataSource={historyData?.result?.history}
      />
    </Flex>
  );
};

export default StudentHistory;
