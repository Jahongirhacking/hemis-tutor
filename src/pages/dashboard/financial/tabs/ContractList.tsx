import { useGetContractListQuery } from '@/services/student';
import { Flex, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import useCustomTable from '../../components/hooks/useCustomTable';

const ContractList = () => {
  const { data: contractData, isFetching } = useGetContractListQuery({});
  const { t } = useTranslation();
  const { emptyText } = useCustomTable({});

  return (
    <Flex vertical gap={12}>
      <Table
        loading={isFetching}
        columns={[
          {
            title: 'Talaba',
            dataIndex: 'student',
            key: 'name',
            render: student => student?.full_name,
          },
          {
            title: t('const.academic_year'),
            key: 'year',
            render: () => contractData?.result?.education_year,
          },
          {
            title: t('dashboard.contract.contract_type'),
            dataIndex: 'contract_type',
            key: 'contract_type',
          },
          {
            title: t('dashboard.contract.contract_number'),
            dataIndex: 'contract_number',
            key: 'contract_number',
          },
          {
            title: t('dashboard.contract.contract_sum'),
            dataIndex: 'contract_summa',
            key: 'contract_summa',
          },
          {
            title: t('dashboard.contract.paid_sum'),
            dataIndex: 'paid_summa',
            key: 'paid_summa',
          },
          {
            title: t('dashboard.contract.total_debt'),
            dataIndex: 'debt_summa',
            key: 'debt_summa',
            fixed: 'right',
          },
        ]}
        scroll={{ x: 800 }}
        dataSource={contractData?.result?.contracts}
        rowKey={'id'}
        locale={{ emptyText }}
      />
    </Flex>
  );
};

export default ContractList;
