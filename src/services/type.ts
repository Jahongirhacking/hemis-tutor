export interface IBaseOldDataRes<TData> {
  code: number;
  error: null;
  success: boolean;
  data: TData;
}

export interface IBaseDataRes<TData> {
  status_code: number;
  ok: boolean;
  description: string;
  result: TData;
}

export interface IBaseDataEdu<TData> {
  message: string;
  object: TData;
  statusCode: number;
  timeStamp: string;
}

export interface IBaseDataUniLib<TData> {
  result: {
    current_page: number;
    data: TData;
    from: number;
    last_page: number;
    per_page: string;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

export interface IUniversity {
  code: string;
  name: string;
  api_url: string;
  student_url: string;
  employee_url: string;
}

export interface IOverallScore {
  grade: number;
  max_ball: number;
  percent: number;
  label?: string;
  examType?: {
    name: string;
  };
}

export type ILangParam = 'uz' | 'en' | 'ru';

export interface IStudentGPA {
  eduYear: string;
  gpa: string;
  method: string;
  course: string;
  creditSum: string;
  subjects: number;
  debtSubjects: number;
}

export enum GenderType {
  Male = '11',
  Female = '12',
}

export interface IStudentPassportRes {
  id: string;
  code: string;
  citizenshipCode: string;
  citizenshipName: string;
  pinfl: string;
  serialAndNumber: string;
  fullName: string;
  universityCode: string;
  universityName: string;
  facultyCode: string;
  facultyName: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  region: string;
  districtCode: string;
  district: string;
  address: string;
  currentRegionCode: string;
  currentRegion: string;
  currentDistrictCode: string;
  currentDistrict: string;
  currentAddress: string;
  paymentFormCode: string;
  paymentFormName: string;
  eduLanguageCode: string;
  eduLanguageName: string;
  nationalityCode: string;
  nationality: string;
  accomodationCode: string;
  accomodationName: string;
  socialCategoryCode: string;
  socialCategoryName: string;
  courseCode: string;
  course: string;
  enrollEducationYearCode: string;
  enrollEducationYear: string;
  genderCode: string;
  gender: string;
  eduFormCode: string;
  eduForm: string;
  statusCode: string;
  status: string;
  eduTypeCode: string;
  eduType: string;
  birthday: string | null;
  tag: string;
  phone: string;
  roommateCount: number | null;
  roommateTypeCode: string | null;
  roommateType: string | null;
  email: string;
  parentPhone: string;
  responsiblePersonPhone: string;
  geoAddress: string;
  academicMobileTypeCode: string | null;
  academicMobileType: string | null;
  graducationYearCode: string | null;
  graducationYear: string | null;
  graduationDate: string | null;
  eduStartDate: string | null;
  statusOrderName: string;
  statusOrderNumber: string;
  statusOrderDate: string;
  statusEduYearCode: string;
  statusEduYear: string;
  passportGivenDate: string | null;
  statusOrderCategory: string;
  studentTypeCode: string;
  studentTypeName: string;
  enrollOrderDate: string | null;
  enrollOrderNumber: string | null;
  enrollOrderName: string | null;
  enrollOrderCategory: string | null;
  createTs: string;
  updateTs: string;
  groupName: string | null;
  groupId: string | number | null;
  ownershipCode: string;
  ownership: string;
  specialityId: string;
  specialityCode: string;
  specialityName: string;
  gpas: IStudentGPA[];
}

export interface IStudentExtraInfoRes {
  data: any;
}
