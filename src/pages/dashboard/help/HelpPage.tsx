import { toFirstLowerLetter } from '@/utils/stringFunc';
import { LinkOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Flex, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const SocialLinkCard = ({
  href,
  imgSrc,
  title,
  description,
}: {
  href: string;
  imgSrc: string;
  title: string;
  description: string;
}) => {
  const { t } = useTranslation();
  return (
    <Card
      className="upper-element"
      style={{
        flex: 1,
        minWidth: 'min(400px, 100%)',
        width: '100%',
        maxWidth: '1000px',
        height: '100%',
      }}
      actions={[
        <Button
          key={'link'}
          icon={<LinkOutlined style={{ marginRight: '8px' }} />}
          href={href}
          target="_blank"
          type="link"
          style={{ height: '100%' }}
        >
          {t('const.see')}
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar size="large" src={imgSrc} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

const HelpPage = () => {
  const { t } = useTranslation();

  const socialLinks = useMemo(
    () => [
      {
        href: 'https://t.me/HEMIS_support',
        imgSrc: '/images/tg_group.jpg',
        title: `Telegram ${toFirstLowerLetter(t('const.group'))}`,
        description: t('help.tg_group_info'),
      },
      {
        href: 'https://t.me/hemis_university',
        imgSrc: '/images/tg-logo.png',
        title: `Telegram ${t('const.channel')}`,
        description: t('help.tg_channel_info'),
      },
      {
        href: 'https://t.me/my_hemis_uzbot',
        imgSrc: '/images/tg-logo.png',
        title: `Telegram ${t('const.bot')}`,
        description: t('help.tg_bot_info'),
      },
      {
        href: 'https://www.youtube.com/@hemis_blog',
        imgSrc: '/images/yt-logo.png',
        title: `YouTube ${t('const.channel')}`,
        description: t('help.yt_channel_info'),
      },
    ],
    [t]
  );

  return (
    <Flex vertical gap={16} className="help-page" style={{ maxWidth: '100%' }}>
      <Typography.Title
        level={3}
        className="section_title"
        style={{ marginBottom: 0 }}
      >
        {
          (
            t('dashboard.navbar.navbarBottom', {
              returnObjects: true,
            }) as string[]
          )[1]
        }
      </Typography.Title>
      <Row
        gutter={[25, 25]}
        style={{ marginTop: 10 }}
        className="card-container"
      >
        {socialLinks?.map(l => (
          <Col key={l?.href} span={24} sm={24} lg={12} xxl={8}>
            <SocialLinkCard
              href={l?.href}
              imgSrc={l?.imgSrc}
              title={l?.title}
              description={l?.description}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default HelpPage;
