import { SettingOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

export const SoonCard = () => {
  const { t } = useTranslation();

  return (
    <Result
      icon={<SettingOutlined spin style={{ color: '#14b8a6' }} />}
      title={t('components.soon_card.text')}
    />
  );
};
