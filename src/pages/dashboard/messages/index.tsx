import { Flex, Typography } from 'antd';
import { Mail } from 'lucide-react';
import CustomTabs from '../components/CustomTabs';
import MessageModal from './components/MessageModal';
import CreateMessagePage from './tabs/CreateMessage';
import MessageList from './tabs/MessageList';

const MessagesPage = () => {
  return (
    <Flex vertical gap={24} className="dashboard__page external-service-page upper-element">
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
          <Mail size={24} color="white" />
        </div>
        <div>
          <Typography.Title
            level={2}
            style={{ margin: 0, marginBottom: '4px' }}
          >
            Xabarlar
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
            Talaba va xodimlar bilan muloqot
          </Typography.Text>
        </div>
      </Flex>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'my-messages',
              label: <span style={{ fontWeight: 500 }}>Mening xabarlarim</span>,
              children: <MessageList />,
            },
            {
              key: 'create-message',
              label: <span style={{ fontWeight: 500 }}>Xabar yaratish</span>,
              children: <CreateMessagePage />,
            },
          ]}
        />
      </Flex>

      <MessageModal />
    </Flex>
  );
};

export default MessagesPage;
