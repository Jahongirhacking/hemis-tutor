import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useLanguage = () => {
  const { i18n } = useTranslation();
  const langOptions = [
    {
      label: `O‘zbekcha`,
      value: 'uz-UZ',
    },
    {
      label: `Ўзбекча`,
      value: 'oz-UZ',
    },
    {
      label: `Русский`,
      value: 'ru-RU',
    },
    {
      label: `English`,
      value: 'en-US',
    },
  ];

  const [activeLang, setActiveLang] = useState('uz-UZ');
  const hasLanguageChanged = useRef(false);

  useEffect(() => {
    if (i18n.language && !hasLanguageChanged.current) {
      setActiveLang(i18n.language);
      hasLanguageChanged.current = true;
    }
  }, [i18n.language]);

  return { langOptions, activeLang, setActiveLang };
};

export default useLanguage;
