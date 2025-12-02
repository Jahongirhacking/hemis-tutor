export interface IGroup {
  id: number;
  name: string;
}

export interface IGroupDetails extends IGroup {
  department: IDepartmentMeta;
  education_lang: ICodeName;
  education_type: ICodeName;
  education_form: ICodeName;
  curriculum: ICurriculumMeta & {
    _department?: number;
    _education_type?: string;
    _education_form?: string;
    _marking_system?: string;
    _education_year?: string;
    semester_count?: number;
    education_period?: number;
    autumn_start_date?: IDateTimeMeta;
    autumn_end_date?: IDateTimeMeta;
    spring_start_date?: IDateTimeMeta;
    spring_end_date?: IDateTimeMeta;
    accepted?: boolean;
    position?: number | null;
    active?: boolean;
    _translations?: Record<string, string>;
    updated_at?: IDateTimeMeta;
    created_at?: IDateTimeMeta;
    _specialty_id?: number;
    _qualification?: number;
  };
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
  first_name: string;
  second_name: string;
  third_name: string;
  full_name: string;
  student_id_number: string;
  email: string;
  phone: string;
  person_phone: string;
  parent_phone: string;
  passport_number: string;
  passport_pin: string;
  birth_date: string;
  gender: ICodeName;
  image: string | null;
  home_address: string;
  current_address: string;
  geo_location: string;
  roommate_count: number | null;
  student_roommate_type: string | null;
  accommodation: ICodeName;
  province: ICodeName & { _parent: string };
  district: ICodeName & { _parent: string };
  current_province: ICodeName & { _parent: string };
  current_district: ICodeName & { _parent: string };
  terrain: ICodeName;
  current_terrain: ICodeName;
  country: ICodeName;
  social_category: ICodeName;
  student_living_status: {
    name: string;
    code: StudentLivingStatus;
  };
  student_status?: ICodeName;
  _accommodation: string;
  _country: string;
  _province: string;
  _district: string;
  _current_province: string;
  _current_district: string;
  _current_terrain: string;
  _terrain: string;
  _social_category: string;
  _student_living_status: string;
  _student_roommate_type: string | null;
}

export interface IEducationYear {
  code: string;
  name: string;
  id?: string;
}

export interface IAttendance {
  id: number;
  student: IStudent;
  subject: string;
  lesson_date: string;
  attendance_type: string;
  absent_off: number;
  absent_on: number;
}

export interface IAttendanceBySubjectReq {
  group_id?: IGroup['id'];
  semester?: ISemester['code'];
}

export interface IAttendanceBySubjectStudent {
  student_id: number;
  full_name: string;
  student_id_number: string;
  group_id: number;
}

export interface IAttendanceBySubjectSubject {
  curriculum_subject_id: number;
  subject_id: number;
  subject_name: string;
}

export interface IAttendanceBySubjectRecord {
  id: number;
  student_id: number;
  student_name: string;
  student_id_number: string;
  subject_id: number;
  subject_name: string;
  lesson_date: string;
  start_time: string | null;
  absent_on: number;
  absent_off: number;
  training_type: string;
  group_id: number;
}

export interface IAttendanceBySubjectRes {
  students: IAttendanceBySubjectStudent[];
  subjects: IAttendanceBySubjectSubject[];
  attendance_records: IAttendanceBySubjectRecord[];
  group_id: IGroup['id'] | null;
  group_ids: IGroup['id'][];
  semester: ISemester['code'] | null;
  group_semesters: Record<string, ISemester['code']>;
  education_year: IEducationYear['code'];
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

export interface IAttendanceStatisticsReq extends IAttendanceBySubjectReq {
  subject_id?: ISubject['subject_id'];
}

export interface IStudentStats {
  absent_with_reason_count: number;
  absent_with_reason_percent: number;
  absent_without_reason_count: number;
  absent_without_reason_percent: number;
  full_name: string;
  present_count: number;
  present_percent: number;
  student_id: number;
  student_id_number: IStudent['student_id_number'];
  total_lessons: number;
}

export interface IAttendanceStatisticsRes {
  summary: unknown;
  students: IStudentStats[];
  group_id: IGroup['id'];
  semester: ISemester['name'];
  subject_id: ISubject['subject_id'];
}

export interface IDebtorsReq {
  group_id?: IGroup['id'];
  education_year?: IEducationYear['code'];
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
  _student: string;
  _group: string;
  _subject: string;
  credit: number | string;
  level: string;
  specialty: string;
  _education_year: string;
  _semester: string;
  student_id: number;
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

export interface IGradeSummarySubject {
  subject: string;
  exam_type: string;
  grade: string;
  total_point: number;
  credit: number;
}

export interface IGradeSummaryStudent {
  id: IStudent['id'];
  full_name: IStudent['full_name'];
  student_id_number: IStudent['student_id_number'];
}

export interface IGradeSummaryItem {
  student: IGradeSummaryStudent;
  subjects: IGradeSummarySubject[];
  total_subjects: number;
  total_credit: number;
  average_grade: number;
  status: string;
}

export interface IGradeSummaryRatingRes {
  summary: IGradeSummaryItem[];
  group_id: IGroup['id'];
  semester: ISemester['code'];
  total_students: number;
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

export interface IStudentGpaRecord {
  student: Pick<IStudent, 'id' | 'full_name' | 'student_id_number'>;
  gpa: number;
  credit: number;
  total_subjects: number;
  semester: ISemester['code'];
  status: string;
}

export interface IStudentGpaRes {
  gpa_records: IStudentGpaRecord[];
  group_id: IGroup['id'];
  semester: ISemester['code'];
  total_students: number;
}

export interface IGroupListReq {
  education_year?: IEducationYear['code'];
  semester?: ISemester['code'];
  group_id?: IGroup['id'];
  faculty_id?: Faculty['id'];
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

export interface IPaginationProps {
  search?: string;
  page: number;
  per_page: number;
}

export interface IStudentListReq extends IPaginationProps {
  pinfl?: string;
  level?: string;
  group?: IGroup['id'];
  specialty?: number;
  student_status?: IStudent['student_status'];
}

export interface IPagination {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface IDateTimeMeta {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface ICodeName {
  code: string;
  name: string;
}

export interface IGroupMeta {
  id: number;
  name: string;
  _department?: number;
  _education_type?: string;
  _education_form?: string;
  _curriculum?: number;
  position?: number | null;
  active?: boolean;
  _translations?: Record<string, string>;
  updated_at?: IDateTimeMeta;
  created_at?: IDateTimeMeta;
  _education_lang?: string;
  _specialty_id?: number;
  _qid?: string | null;
  _uid?: string;
  _sync?: boolean;
  _sync_diff?: unknown;
  _sync_date?: IDateTimeMeta;
  _sync_status?: string;
}

export interface IDepartmentMeta {
  id: number;
  code: string;
  name: string;
  _university?: number;
  _structure_type?: string;
  parent?: number | null;
  position?: number | null;
  active?: boolean;
  _translations?: Record<string, string>;
  updated_at?: IDateTimeMeta;
  created_at?: IDateTimeMeta;
  _type?: string;
  _sync?: boolean;
  _qid?: unknown;
  _sync_diff?: unknown;
  _sync_date?: IDateTimeMeta;
  _sync_status?: string;
}

export interface ISpecialtyMeta {
  id?: number;
  code: string;
  name: string;
  parent_code?: string | null;
  _department?: number;
  _education_type?: string;
  _knowledge_type?: unknown;
  position?: number | null;
  active?: boolean;
  _translations?: Record<string, string>;
  updated_at?: IDateTimeMeta;
  created_at?: IDateTimeMeta;
  _type?: string;
  _bachelor_specialty?: string | null;
  _master_specialty?: unknown;
  _doctorate_specialty?: unknown;
  _qid?: unknown;
  _uid?: string;
  _sync?: boolean;
  _sync_diff?: unknown;
  _sync_date?: IDateTimeMeta;
  _sync_status?: string;
  _ordinature_specialty?: unknown;
  description?: string;
}

export interface ICurriculumMeta {
  id: number;
  name: string;
  education_year: string;
}

export interface ISemesterMeta {
  id?: number;
  code: string;
  name: string;
  _curriculum?: number;
  _education_year?: string;
  start_date?: IDateTimeMeta;
  end_date?: IDateTimeMeta;
  accepted?: boolean;
  position?: number;
  active?: boolean;
  _translations?: Record<string, string>;
  updated_at?: IDateTimeMeta;
  created_at?: IDateTimeMeta;
  last?: boolean;
  _level?: string;
}

export interface IStudentMeta {
  id: number;
  group: IGroupMeta;
  department?: IDepartmentMeta;
  specialty?: ISpecialtyMeta;
  curriculum?: ICurriculumMeta;
  education_year?: string;
  education_type?: ICodeName;
  education_form?: ICodeName;
  payment_form?: ICodeName;
  student_status?: ICodeName;
  level?: ICodeName;
  semester?: ISemesterMeta;
}

export interface IStudentDetailsRes {
  student: IStudent;
  meta: IStudentMeta;
}

export interface IScheduleItem {
  lesson_pair: string;
  subject: string;
  training_type: string;
  employee: string;
  auditorium: string;
  lesson_date: string;
}

export interface IScheduleGroupDay {
  day_id: number;
  day_label: string;
  items: IScheduleItem[];
}

export interface IScheduleGroup {
  group_id: number;
  group_name: string;
  days: IScheduleGroupDay[];
}

export interface IScheduleWeekMeta {
  id: number;
  name: string;
  curriculum_id: number;
  semester: string;
  start_date: string;
  end_date: string;
}

export interface IScheduleWeekday {
  day_id: number;
  day_label: string;
}

export interface IScheduleByWeekRes {
  week: IScheduleWeekMeta;
  weekdays: IScheduleWeekday[];
  groups: IScheduleGroup[];
}

export interface IScheduleOptionRes {
  faculties: Faculty[];
  curriculums: Curriculum[];
  educationYears: IEducationYear[];
  semesters: ISemester[];
  groups: IGroup[];
  weeks: Week[];
}

export interface Faculty {
  id: number;
  name: string;
}

export interface Curriculum {
  id: number;
  name: string;
}

export interface Week {
  id: number;
  name: string;
}

export interface IExam {
  id: number;
  group: string;
  subject: string;
  exam_type: string;
  exam_name: string | null;
  exam_date: string;
  start_time: string;
  finish_time: string;
  auditorium: string;
}

export interface IExamsRes {
  exams: IExam[];
  pagination: IPagination;
  semester: ISemester['code'];
  group_semesters: Record<string, ISemester['code']>;
  groups_count: number;
}

export interface ICheckedAddress {
  full_address?: string;
  province?: string;
  district?: string;
}

export interface IVerification {
  status: boolean;
  status_text?: string;
  match_percentage?: number;
}

export interface ICheckedStudent {
  student: Pick<IStudent, 'id' | 'full_name' | 'student_id_number' | 'image'>;
  group: Pick<IGroup, 'id' | 'name'>;
  registered_address?: ICheckedAddress;
  current_address?: { full_address?: string };
  verification: IVerification;
  phone?: string;
}

export interface ITutorVisit {
  id: number;
  _student: number;
  _student_living_status: StudentLivingStatus;
  _accommodation: string;
  _current_province: string;
  _current_district: string;
  _current_terrain: string;
  current_address: string;
  geolocation: string;
  comment: string;
  position: number;
  active: boolean;
  updated_at: string;
  created_at: string;
}

export enum StudentLivingStatus {
  GREEN = '11',
  YELLOW = '12',
  RED = '13',
}

export const getLivingStatusName = (code: StudentLivingStatus) => {
  switch (code) {
    case StudentLivingStatus.GREEN:
      return 'Yashil hudud';
    case StudentLivingStatus.YELLOW:
      return 'Sariq hudud';
    case StudentLivingStatus.RED:
      return 'Qizil hudud';
  }
};

export const getLivingStatusCode = (name: string): StudentLivingStatus => {
  switch (name) {
    case 'Yashil hudud':
      return StudentLivingStatus.GREEN;
    case 'Sariq hudud':
      return StudentLivingStatus.YELLOW;
    case 'Qizil hudud':
      return StudentLivingStatus.RED;
  }
};

export interface ICheckStudentAddressItem {
  id: number;
  first_name: string;
  second_name: string;
  third_name: string;
  _accommodation: string;
  _student_living_status: string;
  group: {
    name: string;
  };
  tutorVisits: ITutorVisit[];
  currentProvince: {
    code: string;
    name: string;
    _parent: string;
  };
  currentDistrict: {
    code: string;
    name: string;
    _parent: string;
  };
  currentTerrain: {
    code: string;
    name: string;
  };
  accommodation: {
    code: string;
    name: string;
  };
  studentLivingStatus: {
    code: string;
    name: string;
  };
}

export interface ICheckAddressRes {
  items: ICheckStudentAddressItem[];

  _links: {
    self: { href: string };
    first: { href: string };
    last: { href: string };
    [key: string]: { href: string } | undefined;
  };
  _meta: {
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
  };
}

export interface IHistory {
  id: number;
  full_name: string;
  group: string;
  level: string;
  status_change: string;
  date: string;
  comment: string;
  active: boolean;
}

export interface IStudentHistoryRes {
  history: IHistory[];
  pagination: IPagination;
}

export interface IProfileHistoryItem {
  id: number;
  group: string;
  department: string;
  specialty: string;
  curriculum: string;
  education_year: string;
  education_type: string;
  education_form: string;
  payment_form: string;
  student_status: string;
  level: string;
  semester: string;
  active: boolean;
  created_at: string;
}

export interface IProfileHistoryRes {
  student: Pick<IStudent, 'id' | 'full_name' | 'student_id_number'>;
  history: IProfileHistoryItem[];
}

export interface ICreateVisitReq {
  id: IStudent['id'];
  _student_living_status?: string;
  _accommodation?: string;
  _current_province?: string;
  _current_district?: string;
  _current_terrain?: string;
  current_address?: string;
  geolocation?: string;
  comment?: string;
}
export enum MessageType {
  INBOX = 'inbox',
  OUTBOX = 'outbox',
  DRAFT = 'draft',
  TRASH = 'trash',
}

export interface IMessageUser {
  id: number;
  name: string;
}

export interface IMessage {
  id: number;
  title: string;
  type: MessageType;
  opened: boolean;
  starred: boolean;
  deleted: boolean;
  created_at: string;
  opened_at: string | null;
  message_preview: string;
  sender: IMessageUser;
  recipient: IMessageUser;
}

export interface IMessageCounters {
  inbox: number;
  outbox: number;
  draft: number;
  trash: number;
  unread_inbox: number;
  [key: string]: number;
}

export interface IMessageListRes {
  messages: IMessage[];
  pagination: IPagination;
  counters: IMessageCounters;
}

export interface IMessageDetail {
  id: number;
  title: string;
  type: MessageType;
  opened: boolean;
  starred: boolean;
  deleted: boolean;
  created_at: string;
  opened_at: string | null;
  message: string;
  files: unknown;
  recipients: IMessageUser[];
  send_on: string;
  sender: IMessageUser;
  recipient: IMessageUser;
}

export enum RecipientType {
  ALL = 'all',
  STUDENT = 'student',
  EMPLOYEE = 'employee',
}

export interface IRecipient {
  id: number;
  name: string;
  label: string;
  type: RecipientType;
}

export interface IRecipientsRes {
  recipients: IRecipient[];
  pagination: IPagination;
}
