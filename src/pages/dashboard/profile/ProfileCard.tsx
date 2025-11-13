import { SoonCard } from '@/components/Common/SoonCard';
import { Card } from 'antd';

const ProfileCard = () => {
  // const { setNextIndex } = useContext(ControlledFlowContext);
  // const user = useAppSelector(state => state.authSlice.profile);
  // const { t } = useTranslation();

  return (
    <Card style={{ overflowX: 'auto' }} className="profile-card">
      <SoonCard />
      {/* <Flex gap={24} wrap>
        <Avatar
          src={user?.data?.image ?? '/images/avatar.png'}
          style={{ backgroundColor: '#8381D8' }}
        >
          {`${user?.data?.first_name[0]}${user?.data?.second_name[0]}`}
        </Avatar>
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
            wrap
            justify="space-between"
            align="center"
            style={{ width: '100%' }}
          >
            <Typography.Title level={2} style={{ margin: 0 }}>
              {user?.data?.full_name}
            </Typography.Title>
            <Flex gap={4}>
              <Tag color="green">{user?.data?.level?.name}</Tag>
              <Tag color="magenta">
                {truncateString(user?.data?.group?.name, 35)}
              </Tag>
            </Flex>
          </Flex>

          <Flex vertical gap={2}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {user?.data?.university}
            </Typography.Title>
            <Typography.Text strong style={{ color: '#000000A6' }}>
              {user?.data?.faculty?.name}
            </Typography.Text>
            <Typography.Text style={{ color: '##000000A6' }}>
              {user?.data?.specialty?.name}
            </Typography.Text>
            <Button
              className="edit-btn"
              icon={<PencilIconSVG />}
              onClick={setNextIndex}
            >
              {t('const.edit')}
            </Button>
          </Flex>
        </Flex>
      </Flex> */}
    </Card>
  );
};

export default ProfileCard;
