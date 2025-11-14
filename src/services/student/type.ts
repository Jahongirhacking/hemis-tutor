export interface IGroup {
  id: number;
  name: string;
}

export interface IGroupDetails extends IGroup {
  department: unknown;
  education_lang: unknown;
  education_type: unknown;
  education_form: unknown;
  curriculum: unknown;
  students_count: number;
  active_students_count: number;
}

export interface ISemester {
  code: string;
  name: string;
  education_year: string;
  start_date: string;
  end_date: string;
  position: number;
}

export interface ISubject {
  subject_id: number;
  subject_name: string;
  students_count: number;
  total_lessons: number;
  present_count: number;
  absent_count: number;
  late_count: number;
}

export interface IStudent {
  id: number;
  full_name: string;
  student_id_number: string;
  phone: string;
  image: string;
  student_status: unknown;
  payment_form: unknown;
  education_type: unknown;
  education_form: unknown;
  semester: unknown;
}

export interface IEducationYear {
  code: string;
  name: string;
}

export interface IAttendance {
  id: number;
  student: IStudent;
  subject: string;
  lesson_date: string;
  attendance_type: string;
  reason: string;
}

export interface IAttendanceBySubjectReq {
  group_id: IGroup['id'];
  semster?: ISemester['code'];
}

export interface IAttendanceBySubjectRes {
  subjects: ISubject[];
  group_id: IGroup['id'];
}

export interface IAttendanceReportReq extends IAttendanceBySubjectReq {
  subject_id?: ISubject['subject_id'];
}

export interface IAttendanceReportRes {
  attendance: IAttendance[];
  group_id: IGroup['id'];
  semester: ISemester['code'];
  count: number;
}

export interface IDebtorsReq {
  group_id: IGroup['id'];
  education_year: IEducationYear['code'];
}

export interface IDebtor {
  id: number;
  contract_number: string;
  student: IStudent;
  group: IGroup['name'];
  contract_summa: number;
  paid_summa: number;
  debt_summa: number;
  payment_deadline: string;
}

export interface IDebtorsRes {
  debtors: IDebtor[];
  education_year: IEducationYear['name'];
  total_debtors: number;
  total_debt: number;
}

export enum ContractStatus {
  Active = 'ACTIVE',
}

export interface IContractListReq {
  group_id?: IGroup['id'];
  education_year?: IEducationYear['code'];
  status?: ContractStatus;
}

export interface IContractShortInfo {
  id: number;
  contract_number: string;
  contract_date: string;
  group: IGroup['name'];
  student: IStudent;
  contract_type: string;
  contract_status: unknown;
  contract_summa: number;
  paid_summa: number;
  debt_summa: number;
}

export interface IContract extends Omit<IContractShortInfo, 'group'> {
  end_date: string;
  education_year: string;
  group: IGroup;
}

export interface IContractListRes {
  contracts: IContractShortInfo[];
  education_year: string;
  count: number;
}

export interface IContractDetailsReq {
  id: IContractShortInfo['id'];
}

export interface IContractDetailsRes {
  contract: IContract;
}

export interface IGradeDebtorReq {
  group_id: IGroup['id'];
  semester?: ISemester['code'];
}

export interface IGradeDebt {
  subject: string;
  exam_type: string;
  grade: string;
  total_point: number;
}

export interface IGradeDebtor {
  student: IStudent;
  debts: IGradeDebt[];
  total_debts: number;
}

export interface IGradeDebtorRes {
  debtors: IGradeDebtor[];
  group_id: IGroup['id'];
  semester: ISemester['code'];
  total_debtors: number;
}

export interface IGradeRatingReq {
  group_id: IGroup['id'];
  semester?: ISemester['code'];
  subject_id?: ISubject['subject_id'];
}

export interface IRating {
  student: IStudent;
  subject: string;
  exam_type: string;
  grade: string;
  total_point: number;
  final_exam_point: number;
  midterm_point: number;
  credit: number;
}

export interface IGradeRatingRes {
  ratings: IRating[];
  group_id: IGroup['id'];
  semester: ISemester['code'];
  count: number;
}

export interface IStudentGradeReq {
  id: IStudent['id'];
  semester?: ISemester['code'];
}

export interface IStudentGradeRes {
  student: IStudent;
  grades: IRating[];
  semester: ISemester['code'];
}

export interface IGroupListReq {
  education_year?: IEducationYear['code'];
}

export interface IGroupListRes {
  groups: IGroupDetails[];
  education_year: IEducationYear['name'];
}

export enum GroupStudentStatus {
  Studied = 'STUDIED',
}

export interface IGroupStudentsReq {
  id: IGroup['id'];
  education_year?: IEducationYear['code'];
  status?: GroupStudentStatus;
}

export interface IGroupStudentsRes {
  students: IStudent[];
  group: IGroup;
  education_year: IEducationYear['name'];
  total_count: number;
}

export interface IGroupDetailsReq {
  id: IGroup['id'];
  education_year?: IEducationYear['code'];
}

export interface IGroupStats {
  total_students: number;
  active_students: number;
  male_students: number;
  female_students: number;
}

export interface IGroupDetailsRes {
  group: IGroupDetails;
  statistics: IGroupStats;
  education_year: IEducationYear['name'];
}

export interface IGroupSemestersRes {
  group: IGroup;
  semesters: ISemester[];
}

export interface IGroupSemestersReq {
  group_id: IGroup['id'];
  education_year?: IEducationYear['code'];
}
