import { TearsWithSmileEmoji } from '@/assets/emojis';
import { StudentStatus } from '@/services/users/type';
import { RootState } from '@/store/store';
import { Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Restricted = () => {
  const { t } = useTranslation();
  const profile = useSelector((store: RootState) => store.authSlice.profile);

  return (
    <section
      className="section dashboard__outlet upper-element"
      style={{ marginTop: '10px' }}
    >
      <Card style={{ maxWidth: 800 }}>
        <Flex vertical gap={10} style={{ textAlign: 'center' }} align="center">
          <img className="emoji-img" src={TearsWithSmileEmoji} />
          <Typography.Paragraph strong>
            {![StudentStatus.Studying, StudentStatus.Graduated].includes(
              profile?.data?.studentStatus?.code
            )
              ? t('off_topic.restricted_profile_warning')
              : t('off_topic.restricted_university_warning')}
          </Typography.Paragraph>
        </Flex>
      </Card>
    </section>
  );
};

export default Restricted;
