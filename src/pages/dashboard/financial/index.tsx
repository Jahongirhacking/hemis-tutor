import { Flex, Typography } from 'antd';
import { DollarSign } from 'lucide-react';
import CustomTabs from '../components/CustomTabs';
import ContractDebtors from './tabs/ContractDebtors';
import ContractList from './tabs/ContractList';

const FinancialPage = () => {
  return (
    <Flex vertical gap={24} className="dashboard__page financial-page">
      <Flex align="center" gap={12}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
          }}
        >
          <DollarSign size={24} color="white" />
        </div>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Moliyaviy holat
        </Typography.Title>
      </Flex>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'list',
              label: <span style={{ fontWeight: 500 }}>Kontraktlar ro'yxati</span>,
              children: <ContractList />,
            },
            {
              key: 'debtors',
              label: <span style={{ fontWeight: 500 }}>Kontrakt qarzdorlik</span>,
              children: <ContractDebtors />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default FinancialPage;