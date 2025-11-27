import { SoonCard } from '@/components/Common/SoonCard';
import { Flex, Typography } from 'antd';
import CustomTabs from '../components/CustomTabs';
import MessageList from './tabs/MessageList';

const MessagesPage = () => {
  return (
    <Flex vertical gap={18} className="dashboard__page external-service-page">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Xabarlar
      </Typography.Title>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'my-messages',
              label: 'Mening xabarlarim',
              children: <MessageList />,
            },
            {
              key: 'create-message',
              label: 'Xabar yaratish',
              children: <SoonCard />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default MessagesPage;
