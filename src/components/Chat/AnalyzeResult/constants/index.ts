import { IRent } from '@/services/chat/type';

export const scholarship_data_const = {
  studentId: 1020465,
  personId: 1082309,
  person: 'JUMANIYAZOV NODIRBEK ULUG‘BEK O‘G‘LI',
  eduYear: '2025-2026 o`quv yili',
  eduYearId: 5,
  stipendTypes: [
    {
      statusId: 16,
      status: 'Утвержден',
      stipendTypeId: 1,
      stipendType: 'Стипендия для студентов с инвалидностью 1-2 групп (ПКМ-59)',
      starOn: '01.09.2025',
      endOn: '28.02.2026',
      totalCreditSum: 5418020,
      tables: [
        {
          monthOn: '31.08.2025',
          month: 'Avgust',
          creditSum: 754505,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
        {
          monthOn: '30.09.2025',
          month: 'Sentyabr',
          creditSum: 754505,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
        {
          monthOn: '31.10.2025',
          month: 'Oktyabr',
          creditSum: 754505,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
        {
          monthOn: '30.11.2025',
          month: 'Noyabr',
          creditSum: 754505,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
      ],
    },
    {
      statusId: 16,
      status: 'Утвержден',
      stipendTypeId: 3,
      stipendType:
        'Единовременное поощрение или мат. помощь студенту, обучающемуся на основе гос. гранта и контракта (ПКМ-59) до 1000% БРВ',
      starOn: '01.11.2025',
      endOn: '30.11.2025',
      totalCreditSum: 1248000,
      tables: [
        {
          monthOn: '30.09.2025',
          month: 'Sentyabr',
          creditSum: 936500,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
      ],
    },
    {
      statusId: 16,
      status: 'Утвержден',
      stipendTypeId: 15,
      stipendType:
        'Единовременное поощрение или мат. помощь студенту, обучающемуся на основе гос. гранта и контракта (ПКМ-59) до 1000% БРВ',
      starOn: '01.11.2025',
      endOn: '30.11.2025',
      totalCreditSum: 5418020,
      tables: [
        {
          monthOn: '30.09.2025',
          month: 'Sentyabr',
          creditSum: 634000,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
      ],
    },
    {
      statusId: 16,
      status: 'Утвержден',
      stipendTypeId: 2,
      stipendType:
        'Единовременное поощрение или мат. помощь студенту, обучающемуся на основе гос. гранта и контракта (ПКМ-59) до 1000% БРВ',
      starOn: '01.11.2025',
      endOn: '30.11.2025',
      totalCreditSum: 5418020,
      tables: [
        {
          monthOn: '30.09.2025',
          month: 'Noyabr',
          creditSum: 826500,
          creditStatusId: 35,
          creditStatus: 'Оплачен',
        },
      ],
    },
  ],
};

export const contract_data_const = {
  debet: null,
  institutionType: "Oliy ta'lim",
  pinfl: '51805045580037',
  fullName: 'XAYDAROV ISLOM SURAT O‘G‘LI',
  contractNumber: 'B3312538589/K',
  contractDate: '06.09.2025',
  eduOrganizationId: 331,
  eduOrganization: 'HEMIS axborot tizimi universiteti',
  eduOrganizationInn: '201095256',
  eduOrganizationAccount: '400910860262877094100350002',
  eduSpecialityId: 20391,
  eduSpeciality: '60410100 - Madaniy meros obyektlarini saqlash',
  eduPeriod: 5,
  eduYear: '2025-2026 o`quv yili',
  eduTypeId: 11,
  eduType: 'Bakalavr',
  eduFormId: 13,
  eduForm: 'Kunduzgi taʼlim',
  eduCourseId: 3,
  eduCourse: '2-bosqich',
  eduContractTypeId: 1,
  eduContractType: 'Bazoviy shartnoma',
  pdfLink:
    'https://kontrakt-api.edu.uz/MyContractInvoice/PrintContractPdf/5a8774a0-752d-4307-bfc7-1243c900f6e5',
  eduContractSum: 12060000,
  gpa: 4.39,
  bankMfo: '00014',
  debit: 6550000,
  credit: 5510000,
};

export const rent_data_const: IRent[] = [
  {
    studentName: 'MALIKOV AZAMATJON DAVRONBEK O‘G‘LI',
    pinfl: '52906045130027',
    monthName: '10/01/2025',
    rentAddress: 'Андижанская, г. Андижан, Янги Андижон МСГ, ул. Саадий, дом 3',
    rentContractId: 3192532,
    renterPinfl: '30301771240013',
    renterName: '',
    address: 'Андижанская, г. Андижан, Янги Андижон МСГ, ул. Саадий, дом 3',
    plasticCardType: null,
    plasticCardCode: null,
    amount: 206000.0,
    paymentDate: '01.10.2025',
  },
  {
    studentName: 'MALIKOV AZAMATJON DAVRONBEK O‘G‘LI',
    pinfl: '52906045130027',
    monthName: '09/01/2025',
    rentAddress: 'Андижанская, г. Андижан, Янги Андижон МСГ, ул. Саадий, дом 3',
    rentContractId: 3192532,
    renterPinfl: '30301771240013',
    renterName: '',
    address: 'Андижанская, г. Андижан, Янги Андижон МСГ, ул. Саадий, дом 3',
    plasticCardType: null,
    plasticCardCode: null,
    amount: 206000.0,
    paymentDate: '01.09.2025',
  },
];

export const getTranslationTerm = (lang: string) => {
  const langName =
    lang === 'en-US' ? 'Inglizcha' : lang === 'ru-RU' ? 'Ruscha' : "O'zbekcha";
  return `Javobni men faqat ${langName}da qabul qilaman`;
};

export const defaultIcons: {
  primaryColor: string;
  icon: string;
  secondaryColor: string;
}[] = [
  {
    icon: '/icons/plagiarism.svg',
    primaryColor: '#007AFF',
    secondaryColor: '#6198FF',
  },
  {
    icon: '/icons/pencil.svg',
    primaryColor: '#FF61AD',
    secondaryColor: '#FFE0EF',
  },
  {
    icon: '/icons/course.svg',
    primaryColor: '#3fc556ff',
    secondaryColor: '#DBF8E0',
  },
  {
    icon: '/icons/attendance.svg',
    primaryColor: '#FF9500',
    secondaryColor: '#FFEACC',
  },
  {
    icon: '/icons/gpa.svg',
    primaryColor: '#2b8fb1',
    secondaryColor: '#2b8fb1bd',
  },
];

export const weekDays = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

export const DEFAULT_SCHEDULE_TIME_INTERVAL = 2;
