import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';

export const hostName = 'https://univer.hemis.uz';
export const baseUrl = `${hostName}/rest/ver1/tutor`;
export const ttsUrl = 'https://oyqiz.airi.uz/api/v1/tts';
export const STORY_BASE_URL = 'https://story.e-edu.uz';
export const TYUTOR_API_URL = 'https://tyutor-api.hemis.uz';
export const chatBaseUrl = 'https://ai-hemis.e-edu.uz';

export const getBaseUrl = (path: string, hasLang = true): string => {
  const basePath = getLocalStorage(localStorageNames.employeeApi) || baseUrl;
  const lang = getLocalStorage(localStorageNames.language);
  return `${basePath}${path}${lang && hasLang ? `?l=${lang}` : ''}`;
};
