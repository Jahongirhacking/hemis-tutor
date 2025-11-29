import { Flex } from 'antd';
import CheckAddress from './tabs/CheckAddress';

const CheckAddressPage = () => {
  return (
    <Flex vertical gap={20} className="dashboard__page check-address-page">
      {/* Main Content */}
      <CheckAddress />
    </Flex>
  );
};

export default CheckAddressPage;
