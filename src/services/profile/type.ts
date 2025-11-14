import { IEducationYear, IGroupDetails } from '../student/type';

export interface IGetGroupReq {
  education_year: IEducationYear['code'];
}

export interface IGetGroupRes {
  groups: IGroupDetails[];
  education_year: IEducationYear['code'];
}

export interface ITutor {
  id: string;
  full_name: string;
  email: string;
  telephone: string;
  employee: IEmployee;
  groups: IGroupDetails[];
  image: null | string;
  language: string;
  login: null | string;
  university: string;
}

export interface ITutorStats {
  total_students: number;
  active_students: number;
  groups_count: number;
  current_year: string;
}

export interface IGetProfileRes {
  tutor: ITutor;
  groups: IGroupDetails[];
  statistics: ITutorStats;
}

export interface IUpdateProfileReq {
  email: string;
  telephone: string;
}

export interface IDateInfo {
  date: string; // "1991-06-21 00:00:00.000000"
  timezone_type: number; // 3
  timezone: string; // "UTC"
}

export interface IEmployeeTranslations {
  first_name_en: string;
  first_name_oz: string;
  first_name_uz: string;
  third_name_oz: string;
  third_name_uz: string;
  second_name_en: string;
  second_name_oz: string;
  second_name_uz: string;
}

export interface IEmployee {
  id: number;
  employee_id_number: string;

  first_name: string;
  second_name: string;
  third_name: string;

  birth_date: IDateInfo;

  _gender: string;
  passport_number: string;
  passport_pin: string;

  _academic_degree: string;
  _academic_rank: string;

  specialty: string;
  image: string;

  position: number;
  active: boolean;

  _translations: IEmployeeTranslations;

  updated_at: IDateInfo;
  created_at: IDateInfo;

  _admin: number;

  telephone: string;
  email: string;
  home_address: string;

  _citizenship: string;
  _uid: string;
  _sync: boolean;

  year_of_enter: number;
  _qid: string | null;

  _sync_diff: any[];

  _sync_date: IDateInfo;
  _sync_status: string;

  passport_date: IDateInfo;

  _country: string;
  _province: string;
  _district: string;
  _nationality: string;
}

export interface IUpdateProfileRes {
  success: true;
  message: string;
  tutor: ITutor;
}
