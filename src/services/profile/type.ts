import { IEducationYear, IGroupDetails } from '../student/type';

export interface IGetGroupReq {
  education_year: IEducationYear['code'];
}

export interface IGetGroupRes {
  groups: IGroupDetails[];
  education_year: IEducationYear['code'];
}

export interface ITutor {
  id: 12;
  full_name: 'Muhammad Aliyev';
  email: 'tutor@example.com';
  telephone: '+998991234567';
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

export interface IUpdateProfileRes {
  success: true;
  message: string;
  tutor: ITutor;
}
