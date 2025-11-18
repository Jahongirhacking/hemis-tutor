import { useGetDebtorsQuery } from '@/services/student';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const ContractDebtors = () => {
  const { form, values } = useCustomFilter();
  const { data: contractData, isFetching } = useGetDebtorsQuery({
    ...values
  });
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
      </CustomFilter>

      <CustomTable
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
        dataSource={contractData?.result?.debtors}
      />
    </Flex>
  );
};

export default ContractDebtors;
