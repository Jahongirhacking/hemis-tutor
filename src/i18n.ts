import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Configuration of i18next
i18n
  .use(HttpApi) // load translations using http (default public/assets/locales)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    supportedLngs: ['uz-UZ', 'oz-UZ', 'en-US', 'ru-RU'], // list your supported languages here
    fallbackLng: 'uz-UZ', // default language if detected language is not available
    debug: false, // change to false in production
    interpolation: {
      escapeValue: false, // React already escapes values, so disable this feature.
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // path to your translation files
    },
    detection: {
      order: ['cookie', 'localStorage'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
