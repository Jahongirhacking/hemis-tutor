import { IBaseName } from '../dashboard/type';

//Login Types
export interface ILogin {
  login: string;
  password: string;
  remember?: boolean;
  university?: string;
}

export interface ILoginRes {
  token: string;
}

export interface IProfile {
  first_name: string;
  second_name: string;
  third_name: string;
  full_name: string;
  short_name: string;
  student_id_number: string;
  image: string;
  birth_date: number;
  passport_pin: string;
  passport_number: string;
  email: string;
  phone: string;
  gender: IBaseName;
  university: string;
  specialty: IBaseName;
  studentStatus: {
    name: string;
    code: StudentStatus;
  };
  educationForm: IBaseName;
  educationType: IBaseName;
  paymentForm: IBaseName;
  group: Group;
  faculty: Faculty;
  educationLang: IBaseName;
  level: IBaseName;
  semester: ISemestr;
  password_valid: boolean;
  address: string;
  country: IBaseName;
  province: Province;
  district: District;
  socialCategory: IBaseName;
  accommodation: IBaseName;
  validateUrl: string;
  hash: string;
  avg_gpa: string;
}

export enum StudentStatus {
  Studying = '11',
  Graduated = '14',
}

export interface Group {
  id: number;
  name: string;
  educationLang: IBaseName;
}

export interface Faculty extends IBaseName {
  id: number;
  structureType: IBaseName;
  localityType: IBaseName;
  parent: unknown;
  active: boolean;
}

export interface Semester extends IBaseName {
  id: number;
  current: boolean;
  education_year: EducationYear;
}

export interface EducationYear extends IBaseName {
  current: boolean;
}

export interface Province extends IBaseName {
  _parent: string;
}

export interface District extends IBaseName {
  _parent: string;
}

export interface ISemestr extends IBaseName {
  id: number;
  current: boolean;
  education_year: EducationYear;
  weeks: Week[];
}

export interface Week {
  id: number;
  _semester: string;
  current: boolean;
  start_date: number;
  end_date: number;
  start_date_f: string;
  end_date_f: string;
}
