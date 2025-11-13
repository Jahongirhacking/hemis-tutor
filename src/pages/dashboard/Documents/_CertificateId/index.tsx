import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Card, Flex, Image, QRCode, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CertificateId = () => {
  const profile = useSelector(
    (store: RootState) => store.authSlice?.profile?.data
  );
  const { t } = useTranslation();

  return (
    <Flex
      className="certificate-id--wrapper"
      wrap
      gap={24}
      justify="flex-start"
    >
      <AnimatedMessage>
        <Card className="certificate-card animated-text-content" hoverable>
          <Flex
            className="certificate-card__body"
            vertical
            gap={16}
            justify="space-between"
          >
            <Flex vertical gap={20}>
              <Flex gap={12} justify="space-between" align="center">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {`${t('const.student')} ${t('const.certificate_id')}`}
                </Typography.Title>
                <Image
                  className="university-logo"
                  width={30}
                  src={getLocalStorage(localStorageNames.university)?.logo}
                  fallback="/images/gerb.png"
                  preview={false}
                />
              </Flex>
              <Flex gap={30} className="certificate-card__info">
                <Flex vertical gap={10} align="center">
                  <Image
                    src={profile?.image}
                    width={150}
                    style={{ borderRadius: 10 }}
                    fallback="/images/avatar.png"
                  />
                  <Image
                    src={
                      getLocalStorage(localStorageNames.theme)?.color === 'dark'
                        ? '/images/logo-dark.svg'
                        : '/images/logo.svg'
                    }
                    preview={false}
                  />
                </Flex>
                <Flex vertical gap={5} style={{ width: '100%' }}>
                  <Flex vertical gap={1}>
                    <Typography.Text>
                      {t('login.steps', { returnObjects: true })[0]}
                    </Typography.Text>
                    <Typography.Text strong>
                      {profile.university}
                    </Typography.Text>
                  </Flex>
                  <Flex vertical gap={1}>
                    <Typography.Text>{`${t('const.firstname')} ${t('const.lastname')}`}</Typography.Text>
                    <Typography.Text
                      strong
                    >{`${profile.first_name} ${profile.second_name}`}</Typography.Text>
                  </Flex>
                  <Flex vertical gap={1}>
                    <Typography.Text>{t('const.student')} ID</Typography.Text>
                    <Typography.Text strong>
                      {profile.student_id_number}
                    </Typography.Text>
                  </Flex>
                  <Flex gap={25} justify="space-between" wrap>
                    <Flex vertical>
                      <Flex vertical gap={1}>
                        <Typography.Text>{t('const.faculty')}</Typography.Text>
                        <Typography.Text strong>
                          {profile.faculty.name}
                        </Typography.Text>
                      </Flex>
                      <Flex vertical gap={1}>
                        <Typography.Text>{t('const.course')}</Typography.Text>
                        <Typography.Text strong>
                          {profile.level.name}
                        </Typography.Text>
                      </Flex>
                    </Flex>
                    <QRCode
                      value={profile.validateUrl}
                      color="black"
                      size={100}
                      style={{
                        backgroundColor: '#ffffffcc',
                        marginLeft: 'auto',
                      }}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </AnimatedMessage>
    </Flex>
  );
};

export default CertificateId;
