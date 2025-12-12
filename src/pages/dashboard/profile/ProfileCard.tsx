import { useAppSelector } from '@/store/hooks';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomLink from '../students/components/CustomLink';

const ProfileCard = () => {
  // const { setNextIndex } = useContext(ControlledFlowContext);
  const user = useAppSelector(state => state.authSlice.profile);
  const { t } = useTranslation();

  return (
    <Card style={{ overflowX: 'auto' }} className="profile-card">
      <Flex gap={24} vertical>
        <Flex gap={24} wrap>
          <Flex vertical gap={8} align="center">
            <Avatar
              src={user?.tutor?.image ?? '/images/avatar-male.jpg'}
              style={{ backgroundColor: '#8381D8' }}
            >
              {`${user?.tutor?.full_name}`}
            </Avatar>

            {/* <Button
              className="edit-btn"
              icon={<PencilIconSVG />}
              onClick={setNextIndex}
            >
              {t('const.edit')}
            </Button> */}
          </Flex>

          <Flex
            vertical
            gap={16}
            align="flex-start"
            style={{
              flex: 1,
              minWidth: '180px',
            }}
          >
            <Flex
              gap={10}
              vertical
              justify="space-between"
              style={{ width: '100%' }}
            >
              <Typography.Title level={2} style={{ margin: 0 }}>
                {user?.tutor?.full_name}
              </Typography.Title>
              <Flex gap={4}>
                <Tag color="green" icon={<MailOutlined />}>
                  {user?.tutor?.email || '-'}
                </Tag>
                <Tag color="magenta" icon={<PhoneOutlined />}>
                  {user?.tutor?.telephone || '-'}
                </Tag>
              </Flex>
            </Flex>

            <Flex vertical gap={2}>
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                {user?.tutor?.university}
              </Typography.Title>
              <Typography.Text strong style={{ color: '#777' }}>
                {user?.tutor?.employee?.employee_id_number}
              </Typography.Text>
              <Typography.Text style={{ color: '#777' }}>
                {user?.tutor?.employee?.specialty}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {t('const.group')}
          </Typography.Title>
          <Flex gap={8} wrap>
            {user?.groups?.map(g => (
              <Tag color={'cyan'} key={g?.id}>
                <CustomLink.Group group={g} />
              </Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
