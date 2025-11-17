import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';
import ContractDebtors from './tabs/ContractDebtors';
import ContractList from './tabs/ContractList';

const FinancialPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page financial-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Moliyaviy holat
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'list',
              label: "Kontraktlar ro'yxati",
              children: <ContractList />,
            },
            {
              key: 'debtors',
              label: 'Kontrakt qarzdorlik',
              children: <ContractDebtors />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default FinancialPage;
