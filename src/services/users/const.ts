import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';

export const TOKEN = 'HEMIS_TOKEN';

export const token = getLocalStorage(TOKEN);

export const current_language = getLocalStorage(localStorageNames.language);
