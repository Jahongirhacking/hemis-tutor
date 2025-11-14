export const localStorageNames = {
  savedTabs: 'saved-tabs',
  temporaryTabs: 'temporary-tabs',
  language: 'i18nextLng',
  university: 'university',
  theme: 'theme',
  universityApi: 'university_api',
  employeeApi: 'employee_api',
  isMobileNavBottom: 'is_mobile_nav_bottom',
  HEMIS_TOKEN: 'HEMIS_EMPLOYEE_TOKEN',
  REFRESH_TOKEN: 'refresh_token',
  advertisementMemo: 'advertisement_memo',
  deviceId: 'device_id',
};

export const sessionStorageNames = {
  allySupportsCache: 'ally-supports-cache',
  e_library: 'e-library',
};

export const getExistedOne = (
  ...args: string[] | number[] | object[] | any[]
) => {
  const existed = args.find(val => val);
  return existed;
};

export const setLocalStorage = (
  key: string,
  value: object | number | string | boolean
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return item;
  }
};

export const setSessionStorage = (
  key: string,
  value: object | number | string | boolean
) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  if (!sessionStorage.getItem(key)) return null;
  return JSON.parse(sessionStorage.getItem(key));
};
