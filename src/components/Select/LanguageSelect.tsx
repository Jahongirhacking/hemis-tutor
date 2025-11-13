import { DownIconSVG } from '@/assets/icon';
import useLanguage from '@/hooks/useLanguage';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const { activeLang, setActiveLang, langOptions } = useLanguage();

  const onLanguageChange = (langObj: { label: string; value: string }) => {
    i18n.changeLanguage(langObj.value);
    setActiveLang(langObj.value);
  };

  return (
    <Select
      labelInValue
      value={langOptions.find(opt => opt.value === activeLang)}
      style={{ width: 120 }}
      options={langOptions}
      onChange={onLanguageChange}
      suffixIcon={<DownIconSVG />}
    />
  );
};

export default LanguageSelect;
