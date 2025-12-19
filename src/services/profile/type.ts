import {
  IEducationYear,
  IGroupDetails,
  StudentLivingStatus,
} from '../student/type';

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

export interface IDashboardStatisticsRes {
  education_year: string;
  semester: string | null;
  groups: {
    total_groups: number;
    groups_list: IDashboardGroup[];
  };
  students: {
    total_students: number;
    active_students: number;
    inactive_students: number;
  };
  gender_statistics: {
    male_count: number;
    female_count: number;
    male_percent: number;
    female_percent: number;
  };
  education_form_statistics: IEducationFormStat[];
  course_statistics: ICourseStat[];
  social_statistics: ISocialStat[];
  terrain_statistics: ITerrainStat[];
  living_status_statistics: ILivingStatusStat[];
  district_statistics: IDistrictStat[];
  geo_location_statistics: IGeoLocationStatistics;
  attendance: IAttendanceStats;
  absenteeism: {
    range_24_plus: { count: number; percent: number };
    range_48_plus: { count: number; percent: number };
    range_72_plus: { count: number; percent: number };
    top_10_absentees: Array<{
      student_id: number;
      full_name: string;
      absent_count: number;
      group_id: number;
    }>;
  };
  performance: IPerformanceStats;
  contracts: IContractsStats;
  accommodation_statistics: IAccomodationStatistics[];
}

export interface IDashboardGroup {
  group_id: number;
  group_name: string;
  students_count: number;
  semester: string;
}

export interface IAttendanceStats {
  total_lessons: number;
  total_attendance_records: number;
  present_count: number;
  absent_count: number;
  attendance_rate: number;
}

export interface IPerformanceStats {
  total_grades: number;
  average_grade: number;
  excellent_count: number;
  good_count: number;
  satisfactory_count: number;
  poor_count: number;
}

export interface IContractsStats {
  total_contracts: number;
  active_contracts: number;
  paid_count: number;
  debt_count: number;
  total_summa: number;
  paid_summa: number;
  debt_summa: number;
}

export interface IEducationFormStat {
  education_form_code: string;
  education_form_name: string;
  count: number;
  percent: number;
}

export interface IGrantType {
  payment_form_code: number;
  payment_form_name: string;
  count: number;
  percent: number;
}

export interface ICourseStat {
  course_code: string;
  course_name: string;
  count: number;
  percent: number;
  payment_forms: IGrantType[];
}

export interface ISocialStat {
  category_code: string;
  category_name: string;
  count: number;
  percent: number;
}

export interface ITerrainStat {
  terrain_code: string;
  terrain_name: string;
  count: number;
  percent: number;
}

export interface ILivingStatusStat {
  living_status_code: string;
  living_status_name: string;
  count: number;
  percent: number;
}
export interface IDistrictItem {
  district_code: string;
  district_name: string;
  count: number;
  percent: number;
}

export interface IDistrictStat {
  province_code: string;
  province_name: string;
  total_count: number;
  total_percent: number;
  districts: IDistrictItem[];
}

export interface IGeoLocationStudent {
  address: string;
  full_name: string;
  id: number;
  living_status_color: string;
  living_status_name: string;
  student_id_number: string;
}

export interface IGeoLocation {
  geo_location: string;
  latitude: number;
  longitude: number;
  count: number;
  living_status: StudentLivingStatus;
  students: IGeoLocationStudent[];
}

export interface IGeoLocationStatistics {
  locations: IGeoLocation[];
  with_location: number;
  without_location: number;
  with_location_percent: number;
  without_location_percent: number;
}

export interface IAccomodationStatistics {
  accommodation_code: string;
  accommodation_name: string;
  count: number;
  percent: number;
}

export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  InProgress = 'in_progress',
  Rejected = 'rejected',
}

export interface ITask {
  has_file: false;
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  status_label: string;
  priority: 'low' | 'medium' | 'high';
  due_at: string;
  created_at: string;
}

export interface ITaskDetail extends Omit<ITask, 'has_file'> {
  result_note: string;
  priority_label: string;
  file_url: string;
  updated_at: string;
}

export interface ITaskDetailRes {
  task: ITaskDetail;
}
