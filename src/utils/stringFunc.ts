import { ILangParam } from '@/services/dashboard/type';
import forge from 'node-forge';

export const toFirstCapitalLetter = (str: string): string => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};

export const removeTrailingSlash = (str: string) => {
  if (str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str;
};

export const toFirstLowerLetter = (str: string): string => {
  return str?.charAt(0)?.toLowerCase() + str?.slice(1)?.toLowerCase();
};

export const truncateString = (str: string, limit: number = 100) => {
  if (!str) return '';
  if (str.length > limit) {
    return str.slice(0, limit) + '...';
  } else {
    return str;
  }
};

export const getLangParam = (lang: string): ILangParam => {
  return (lang.slice(0, 2) === 'oz' ? 'uz' : lang.slice(0, 2)) as ILangParam;
};

export const encodePinfl = (pinfl: string | undefined) => {
  const publicKeyPem = `-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEn4Lh15Wadgc1a1Gk/vG5Sz3qY4cY6MzgpPASbuk7XjAcp0zk+xAAuR9NIeTGcE+04EZCJsG5NhXBXgHhkI70g7FU1G2ZWpAv8AdQAOFKnFJtziZQu+6Ov/6U2/cAR/pSpbAL2Pj6wIgCsADEwxxbOkPwAmO+GWyBS2NzuDBTXwIDAQAB -----END PUBLIC KEY-----`;

  // PEM formatidagi ochiq kalitni olish
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  // UTF-8 formatdagi PINFLni baytlarga aylantirish
  const buffer = forge.util.createBuffer(pinfl, 'utf8');
  const binaryString = buffer.getBytes();

  // RSA shifrlash
  const encrypted = publicKey.encrypt(binaryString, 'RSAES-PKCS1-V1_5');

  // Shifrlangan baytlarni Base64 formatiga o'tkazish
  return forge.util.encode64(encrypted);
};

export const encodeStudentId = (pinfl: string | undefined) => {
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm30VPJA2d2kYgCN8saOa
TmbiDQAFNdNx+w3b8tf3MlcFrEQvpXH453x2GZaZ7A3eSD/NKlPOngSk3WRdzwWz
sMQOVWlltNbupAgNfs2xZDZaQrC51pgKQm0rIv831pxGylwXbh3qilTMZOudEpdg
kg7hCGu0D17R0biKZ+3/wkhtCbGFN0h46IOyVocW0E5pRycEyGHvuzdhvkVvOLij
xax5+0YQUHc02QzapGJPACQGDKSZomKF85vIyGSepftSXJ/khS2UbuFb0RBxrhOq
h41raZgpYAB/F12OBbrR9RWudgMwBEUzAWY0wE/57Ylqx74pkEn7rkJzYWHCHPPx
EQIDAQAB
-----END PUBLIC KEY-----`;

  // PEM formatidagi ochiq kalitni olish
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  // UTF-8 formatdagi PINFLni baytlarga aylantirish
  const buffer = forge.util.createBuffer(pinfl, 'utf8');
  const binaryString = buffer.getBytes();

  // RSA shifrlash
  const encrypted = publicKey.encrypt(binaryString, 'RSAES-PKCS1-V1_5');

  // Shifrlangan baytlarni Base64 formatiga o'tkazish
  return forge.util.encode64(encrypted);
};

function isCyrillic(input: string): boolean {
  // Regex to match any Cyrillic character
  const cyrillicRegex = /[\u0400-\u04FF]/;
  return cyrillicRegex.test(input);
}

function cyrillicToUzbekLatin(input: string): string {
  const mapping: Record<string, string> = {
    А: 'A',
    а: 'a',
    Б: 'B',
    б: 'b',
    В: 'V',
    в: 'v',
    Г: 'G',
    г: 'g',
    Д: 'D',
    д: 'd',
    Е: 'E',
    е: 'e',
    Ё: 'Yo',
    ё: 'yo',
    Ж: 'J',
    ж: 'j',
    З: 'Z',
    з: 'z',
    И: 'I',
    и: 'i',
    Й: 'Y',
    й: 'y',
    К: 'K',
    к: 'k',
    Л: 'L',
    л: 'l',
    М: 'M',
    м: 'm',
    Н: 'N',
    н: 'n',
    О: 'O',
    о: 'o',
    П: 'P',
    п: 'p',
    Р: 'R',
    р: 'r',
    С: 'S',
    с: 's',
    Т: 'T',
    т: 't',
    У: 'U',
    у: 'u',
    Ф: 'F',
    ф: 'f',
    Х: 'X',
    х: 'x',
    Ц: 'S',
    ц: 's',
    Ч: 'Ch',
    ч: 'ch',
    Ш: 'Sh',
    ш: 'sh',
    Щ: 'Sh',
    щ: 'sh',
    Ъ: '',
    ъ: '',
    Ы: 'I',
    ы: 'i',
    Ь: '',
    ь: '',
    Э: 'E',
    э: 'e',
    Ю: 'Yu',
    ю: 'yu',
    Я: 'Ya',
    я: 'ya',
    Ў: 'Oʻ',
    ў: 'oʻ',
    Қ: 'Q',
    қ: 'q',
    Ғ: 'Gʻ',
    ғ: 'gʻ',
    Ҳ: 'H',
    ҳ: 'h',
  };

  return input
    .split('')
    .map(char => mapping[char] || char)
    .join('');
}

export const convertIfCyrillic = (input: string): string => {
  if (isCyrillic(input)) {
    return cyrillicToUzbekLatin(input);
  }
  return input; // Return the original string if no Cyrillic characters are found
};

export const keepOnlyLatinLettersAndWhitespace = (input: string): string => {
  // Regex to match Latin letters (a-z, A-Z) and whitespace
  const latinAndWhitespaceRegex = /[a-zA-Z\s]/g;
  // Extract and join matched characters
  return input.match(latinAndWhitespaceRegex)?.join('') || '';
};
