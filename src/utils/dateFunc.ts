import moment from 'moment';
import { getLocalStorage, localStorageNames } from './storageFunc';

export type LangType = 'uz-UZ' | 'oz-UZ' | 'en-US' | 'ru-RU';
type LangValues = [uz: string, oz: string, en: string, ru: string];
interface ILangResource {
  long: LangValues;
  short: LangValues;
}

export const CURRENT_DATE_FORMAT = 'YYYY-MM-DD';
export const CORRECT_DATE_FORMAT = 'DD.MM.YYYY';

const getTranslation = (args: LangValues, lang?: LangType): string => {
  switch (lang || getLocalStorage(localStorageNames.language)) {
    case 'uz-UZ':
      return args[0];
    case 'oz-UZ':
      return args[1];
    case 'en-US':
      return args[2];
    case 'ru-RU':
      return args[3];
    default:
      return args[0];
  }
};

export const monthNames: ILangResource[] = [
  {
    long: ['yanvar', 'январ', 'january', 'январь'],
    short: ['yan', 'янв', 'jan', 'янв'],
  },
  {
    long: ['fevral', 'феврал', 'february', 'февраль'],
    short: ['fev', 'фев', 'feb', 'фев'],
  },
  {
    long: ['mart', 'март', 'march', 'март'],
    short: ['mar', 'мар', 'mar', 'мар'],
  },
  {
    long: ['aprel', 'апрел', 'april', 'апрель'],
    short: ['apr', 'апр', 'apr', 'апр'],
  },
  {
    long: ['may', 'май', 'may', 'май'],
    short: ['may', 'май', 'may', 'май'],
  },
  {
    long: ['iyun', 'июн', 'june', 'июнь'],
    short: ['iyn', 'июн', 'jun', 'июн'],
  },
  {
    long: ['iyul', 'июл', 'july', 'июль'],
    short: ['iyl', 'июл', 'jul', 'июл'],
  },
  {
    long: ['avgust', 'август', 'august', 'август'],
    short: ['avg', 'авг', 'aug', 'авг'],
  },
  {
    long: ['sentabr', 'сентябр', 'september', 'сентябрь'],
    short: ['sen', 'сен', 'sep', 'сен'],
  },
  {
    long: ['oktabr', 'октябр', 'october', 'октябрь'],
    short: ['okt', 'окт', 'oct', 'окт'],
  },
  {
    long: ['noyabr', 'ноябр', 'november', 'ноябрь'],
    short: ['noy', 'ноя', 'nov', 'ноя'],
  },
  {
    long: ['dekabr', 'декабр', 'december', 'декабрь'],
    short: ['dek', 'дек', 'dec', 'дек'],
  },
];

export const dayNames: ILangResource[] = [
  {
    short: ['Yak', 'Якш', 'Sun', 'Вос'],
    long: ['Yakshanba', 'Якшанба', 'Sunday', 'Воскресенье'],
  },
  {
    short: ['Dush', 'Душ', 'Mon', 'Пон'],
    long: ['Dushanba', 'Душанба', 'Monday', 'Понедельник'],
  },
  {
    short: ['Sesh', 'Сеш', 'Tue', 'Вт'],
    long: ['Seshanba', 'Сешанба', 'Tuesday', 'Вторник'],
  },
  {
    short: ['Chor', 'Чор', 'Wed', 'Ср'],
    long: ['Chorshanba', 'Чоршанба', 'Wednesday', 'Среда'],
  },
  {
    short: ['Pay', 'Пай', 'Thu', 'Чет'],
    long: ['Payshanba', 'Пайшанба', 'Thursday', 'Четверг'],
  },
  {
    short: ['Jum', 'Жум', 'Fri', 'Пят'],
    long: ['Juma', 'Жума', 'Friday', 'Пятница'],
  },
  {
    short: ['Shan', 'Шан', 'Sat', 'Суб'],
    long: ['Shanba', 'Шанба', 'Saturday', 'Суббота'],
  },
];

export const getTranslatedName = (
  resource: ILangResource[],
  index: number,
  type: 'long' | 'short',
  lang?: LangType
) => {
  return getTranslation(resource[index][type], lang);
};

/**
 *
 * @param date
 * @returns "2-mart, 03:59"
 */
export const convertDateToDayTimeString = (
  date: number,
  type: 'long' | 'short' = 'long',
  lang?: LangType
) => {
  if (!date) return '';
  const dateObj = moment.unix(date);
  const day = dateObj.date();
  const month = getTranslatedName(monthNames, dateObj.month(), type, lang);
  const hours = String(dateObj.hour()).padStart(2, '0');
  const minutes = String(dateObj.minute()).padStart(2, '0');
  return `${day}-${month}, ${hours}:${minutes}`;
};

/**
 * "03:59"
 * @param date
 * @returns
 */
export const convertDateToTimeString = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getDateAfterDays = (prevDate: Date, step: number = 1) => {
  const newDate = new Date(prevDate);
  newDate.setDate(prevDate.getDate() + step);
  return newDate;
};

/**
 * "Yakshanba" | "Yak"
 * @param date
 * @param type
 * @returns
 */
export const convertDateToDayName = (
  date: number,
  type: 'short' | 'long' = 'short',
  lang?: LangType
) => {
  const dayIndex = moment.unix(date).toDate().getDay();
  if (dayIndex >= 0 && dayIndex <= 6)
    return getTranslatedName(dayNames, dayIndex, type, lang);
  return;
};

export const currentDate =
  new Date().toISOString().slice(0, 10) + `T00:00:00.000Z`;
export const currentEpochTime = new Date(currentDate).getTime();

/**
 * 08:30 -> 8*60+30
 * @param timeString
 * @returns
 */
export const timeStringToMinutes = (timeString: string) => {
  try {
    if (!timeString) {
      throw new Error('Vaqt formatida xatolik');
    }
    const [hours, minutes] = timeString?.split(':')?.map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Kunning qaysidir qismidagi "timestamp"dan, o'sha kunning "timeString" vaqtiga o'tkazish
 * @param timestamp
 * @param timeString
 * @returns
 */
export const setTimeToTimestamp = (
  timestamp: number,
  timeString: string
): number => {
  if (!timestamp || !timeString) return timestamp;
  const date = moment.unix(timestamp);
  const timeParts = timeString?.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  date.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
  const newTimestamp = date.unix();
  return newTimestamp;
};

/**
 * Bir xil kundami
 * @param timestamp1
 * @param timestamp2
 * @returns
 */
export const areTimestampsInSameDay = (
  timestamp1: number,
  timestamp2: number
) => {
  const date1 = moment.unix(timestamp1);
  const date2 = moment.unix(timestamp2);
  return date1.isSame(date2, 'day');
};

/**
 * schedule status: 
    "processing" -> dars hozir:yashil, 
    "future" -> dars hali boshlanmagan:ko'k,
    "completed" -> dars tugagan:qizil
 * @param startTime 
 * @param endTime 
 * @returns 
 */
export const getStatus = (
  startTime: number,
  endTime: number
): 'processing' | 'future' | 'completed' => {
  const now = moment();
  const start = moment.unix(startTime);
  const end = moment.unix(endTime);

  if (now.isBetween(start, end, null, '[]')) {
    return 'processing';
  } else if (now.isBefore(start)) {
    return 'future';
  } else if (now.isAfter(end)) {
    return 'completed';
  }
};

/**
 * Oxirgi dushanba topish
 * @param timestamp
 * @returns
 */
export const getLatestMondayUnixTimestamp = (timestamp: number) => {
  const date = moment.unix(timestamp);
  const daysToSubtract = date.day() === 1 ? 0 : (date.day() + 6) % 7;
  const latestMonday = date.subtract(daysToSubtract, 'days');
  return latestMonday.startOf('day').unix();
};

/**
 * Agar kun formatda -> kunning o'zini qaytarish, yakshanbasiz
 * Agar hafta formatda -> oxirgi dushanba
 * @param unixDate
 * @param activeOption
 * @returns
 */
export const getStartingDateUnixTimeStamp = (
  unixDate: number = moment().unix(),
  activeOption: 'month' | 'week' | 'day' | 'semester'
) => {
  const date = moment.unix(unixDate);
  if (date.day() === 0) {
    date.add(1, 'day');
  }
  if (activeOption === 'day') {
    return date.startOf('day').unix();
  }
  if (activeOption === 'week') {
    return getLatestMondayUnixTimestamp(date.unix());
  }
  if (activeOption === 'month') {
    return date.startOf('month').unix();
  }
  return;
};

/**
 * Kun oy: 18 May
 * @param timestamp
 * @returns
 */
export const formatUnixTimestampToDate = (
  timestamp: number,
  sep: string = ' ',
  type: 'long' | 'short' = 'long',
  lang?: LangType
) => {
  const date = moment.unix(timestamp);
  const day = date.date();
  const monthIndex = date.month();
  if (monthIndex >= 0 && monthIndex <= 11)
    return `${day}${sep}${getTranslatedName(monthNames, monthIndex, type, lang)}`;
  return;
};

/**
 * Yakshanbasiz o'tkazish: Juma, Shanba, Dushanba
 * @param steps
 * @param stepType
 * @param setDateFunc
 */
export const handleClickDateChangerBtn = (
  steps: number,
  stepType: 'week' | 'day' | 'month' | 'semester',
  setDateFunc: (arg: (prev: number) => number) => void
) => {
  setDateFunc((prev: number) => {
    if (stepType === 'semester') return;

    const date = moment.unix(prev);
    if (date.day() === 6 && steps === 1 && stepType === 'day')
      return date.add(2, 'days').unix();
    if (date.day() === 1 && steps === -1 && stepType === 'day')
      return date.add(-2, 'days').unix();
    return date.add(steps, stepType).unix();
  });
};

export const getTaskStatus = (
  statusCode: string,
  deadline: number,
  now: number
): 'important' | 'new' | 'sent' | 'marked' | 'expired' => {
  const timeLeftInSeconds = moment
    .unix(deadline)
    .diff(moment.unix(now), 'seconds');
  if (
    statusCode === '11' &&
    timeLeftInSeconds >= 0 &&
    timeLeftInSeconds <= 24 * 60 ** 2
  )
    return 'important';
  if (statusCode === '12') return 'sent';
  if (statusCode === '13') return 'marked';
  if (statusCode === '11' && now < deadline) return 'new';
  if (deadline <= now) return 'expired';
};

// Format seconds → hh:mm:ss
export const formatTime = (seconds: number | null) => {
  if (seconds === null) return '--:--';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? `${h}:` : ''}${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
};
