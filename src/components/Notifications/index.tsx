import { NotificationsDarkSVG, NotificationsSVG } from '@/assets/icon';
import { RootState } from '@/store/store';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12} align="center">
      {themeColor === 'dark' ? <NotificationsDarkSVG /> : <NotificationsSVG />}
      <Typography.Text>
        {t('components.notification.empty_text')}
      </Typography.Text>
    </Flex>
  );
};

export default Notifications;
