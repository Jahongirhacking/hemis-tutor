import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';

export const hostName = 'https://student.hemis.uz';
export const baseUrl = `${hostName}/rest/v1`;
export const ttsUrl = 'https://oyqiz.airi.uz/api/v1/tts';
export const STORY_BASE_URL = 'https://story.e-edu.uz';

export const getBaseUrl = (path: string, hasLang = true): string => {
  const basePath = getLocalStorage(localStorageNames.universityApi) || baseUrl;
  const lang = getLocalStorage(localStorageNames.language);
  return `${basePath}${path}${lang && hasLang ? `?l=${lang}` : ''}`;
};
