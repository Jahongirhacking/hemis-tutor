export interface IBaseName {
  code: string;
  name: string;
}

export interface IBaseCode extends IBaseID {
  code: string;
}

export interface IBaseLabel {
  label: string;
  value?: string;
}

export interface IBaseID {
  id: number;
  name: string;
}

export interface IAuditorium {
  code: number;
  name: string;
  auditoriumType: IBaseName;
  building: IBaseID;
}

export interface IGroup extends IBaseID {
  educationLang: IBaseName;
}

export interface IOrganization extends IBaseName {
  id: number;
  structureType: IBaseName;
  localityType: IBaseName;
  parent: null | number;
  active: boolean;
}

export interface ISubject extends IBaseName {
  id: number;
}

export interface IFile {
  url: string;
  name: string;
  size: number;
}

export interface ISemester extends IBaseName {
  id: number;
  current: boolean;
  education_year: EducationYear;
}

export interface EducationYear extends IBaseName {
  current: boolean;
}

export interface ILessonPair extends IBaseName {
  start_time: string;
  end_time: string;
}

export interface IBaseID {
  id: number;
  name: string;
}

export type ITaskStatus = 'important' | 'marked' | 'new' | 'sent' | 'expired';

export interface ITaskList {
  id: number;
  subject: ISubject;
  name: string;
  comment: string;
  max_ball: number;
  deadline: number;
  trainingType: IBaseName;
  attempt_limit: number;
  attempt_count: number;
  files: IFile[];
  taskType: IBaseName;
  taskStatus: IBaseName;
  employee: IBaseID;
  updated_at: number;
  studentTaskActivity: IStudentTaskActivity;
  studentTaskActivities: IStudentTaskActivity[];
}

export interface ITaskUploadCheck {
  maxFiles: number;
  fileSize: number;
  postSize: number;
  extensions: string[];
  submit: boolean;
}

export interface IStudentTaskActivity {
  id: number;
  comment: string;
  _task: number;
  send_date: number;
  files: IFile[];
  mark: number;
  marked_comment: string;
  marked_date: number;
}

export interface ISubjectList {
  id: number;
  _semester: string;
  grades: IGrade[];
  curriculumSubject: ICurriculumSubject;
  overallScore: IOverallScore;
  gradesByExam: IOverallScore[];
}

export interface ISubjects {
  subject: {
    id: number;
    code: string;
    name: string;
  };
  subjectType: {
    code: string;
    name: string;
  };
  _semester: number;
  total_acload: number;
  credit: number;
}

export interface IGrade {
  id: number;
  _student: number;
  semester: IBaseName;
  _subject_schedule: number;
  subject: IBaseCode;
  trainingType: IBaseName;
  employee: IBaseID;
  lessonPair: ILessonPair;
  grade: number;
  lesson_date: number;
  created_at: number;
}

export interface ISubject {
  subject: ISubject;
  subjectType: IBaseName;
  _semester: string;
  total_acload: number;
  credit: number;
  tasks_count: number;
  submits_count: number;
  marked_count: number;
  resources_count: number;
  absent_count: number;
  tasks: ITaskList[];
  max_ball: number;
  subject_ball: number;
  student_ball: number;
  grades: unknown[];
}

export interface IGpaScore {
  id: number;
  educationYear: {
    code: string;
    name: string;
    current: boolean;
  };
  level: IBaseName;
  gpa: string;
  credit_sum: string;
  subjects: number;
  debt_subjects: number;
  method: 'one_year' | 'all_year';
}

export interface IResource {
  id: number;
  title: string;
  comment: string;
  trainingType: IBaseName;
  employee: IBaseID;
  url: unknown;
  subjectFileResourceItems: ISubjectResourceItem[];
  updated_at: number;
}

export interface ISubjectResourceItem {
  id: number;
  comment: string;
  resourceType: IBaseName;
  url: unknown;
  files: IFile[];
  updated_at: number;
}

export interface ICurriculumSubject {
  subject: ISubject;
  subjectType: IBaseName;
  _semester: string;
  total_acload: number;
  credit: number;
}

export interface IOverallScore {
  grade: number;
  max_ball: number;
  percent: number;
  label?: string;
  examType?: IBaseName;
}

export interface IAttendance {
  subject: IBaseCode;
  semester: ISemester;
  trainingType: IBaseName;
  lessonPair: ILessonPair;
  employee: IBaseID;
  absent_on: number;
  absent_off: number;
  lesson_date: number;
  explicable: boolean;
}

export interface ISchedule {
  id: number;
  subject: ISubject;
  semester: ISemester;
  educationYear: EducationYear;
  group: IGroup;
  faculty: IFaculty;
  department: IFaculty;
  auditorium: IAuditorium;
  trainingType: IBaseName;
  lessonPair?: ILessonPair;
  employee: IBaseID;
  weekStartTime: number;
  weekEndTime: number;
  lesson_date: number;
  _week: number;
}

export interface IGroup {
  id: number;
  name: string;
  educationLang: IBaseName;
}

export interface IFaculty {
  id: number;
  name: string;
  code: string;
  structureType: IBaseName;
  localityType: IBaseName;
  parent: unknown;
  active: boolean;
}
export interface IAuditorium {
  code: number;
  name: string;
  auditoriumType: IBaseName;
  building: IBaseID;
}

export interface IExamList {
  id: number;
  subject: ISubject;
  semester: ISemester;
  educationYear: EducationYear;
  group: IGroup;
  faculty: IFaculty;
  department: IBaseID;
  examType: IBaseName;
  finalExamType: IBaseName;
  employee: IBaseID;
  auditorium: IAuditorium;
  lessonPair?: ILessonPair;
  examDate: number;
}

export interface IUniversity {
  code: string;
  name: string;
  api_url: string;
  student_url: string;
  employee_url: string;
}

export interface IPublisherResource {
  id: number;
  resource_category_id: number;
  name: string;
  country_id: number;
  resource_field_id: number;
  resource_type_id: number;
  resource_modifier_id: number;
  authors: string;
  abstract_name: string;
  publisher_year: number;
  publisher_name: string;
  resource_category_name: string;
  country_name: string;
  resource_type_name: string;
  resource_language_name: string;
  resource_field_name: string;
  status: string;
  count_view: number;
  icon_file: string;
  publisher_file: string;
  created_by_organization: number;
  created_by: number;
  resource_language_id: number;
  publisher_resource_file: unknown;
  publisher_resource_icon: string;
  media: IMedia[];
}

export interface IPublisherResourceId {
  id: number;
  name: string;
  resource_category_id: number;
  resource_modifier_id: number;
  authors: string;
  abstract_name: string;
  keywords: string;
  country_id: number;
  journal_id: unknown;
  resource_type_id: number;
  resource_field_id: number;
  journal_name: string | null;
  publisher_name: string;
  publisher_name_info: string | null;
  publisher_year: number;
  isbn: string;
  resource_page_count: string;
  resource_intended_id: number;
  resource_intended_translation_name: string;
  resource_language_id: number;
  icon_file: string;
  publisher_file: string;
  status: string;
  count_view: number;
  count_download: number;
  resource_categories_name: string;
  country_name: string;
  resource_type_name: string;
  resource_language_name: string;
  resource_field_name: string;
  resource_modifier_name: string;
  created_by_organization: number;
  created_by: number;
  publisher_resource_file: string | null;
  publisher_resource_icon: string;
  access_other_resource: string | null;
  publisher_resource_university: IPublisherResourceUniversity[];
  media: IMedia[];
}

export interface IJournal {
  id: number;
  name: string;
  language: string;
  journal_type_id: number;
  university_id: number;
  country_id: number;
  resource_field_id: number;
  count_view: number;
  journal_type_name: string;
  university_name: string;
  country_name: string;
  resource_field_name: string;
  img: unknown;
  file_url_photo: string;
  media: IMedia[];
}

interface IUniversityTranslation {
  university_id: number;
  name: string;
  short_name: string;
  description: string;
  address: string;
}

interface IUniversityInfo {
  id: number;
  country_id: number;
  region_id: number;
  status: number;
  phone: string;
  email: string;
  website: string;
  university_translations: IUniversityTranslation[];
}

interface IPublisherResourceUniversity {
  publisher_resource_id: number;
  university_id: number;
  created_by: number;
  is_edited: number;
  university: IUniversityInfo;
}

export interface IMedia {
  id: number;
  disk: string;
  directory: string;
  filename: string;
  extension: string;
  mime_type: string;
  aggregate_type: string;
  size: number;
  created_at: string;
  updated_at: string;
  variant_name: unknown;
  original_media_id: unknown;
  pivot: {
    mediable_id: number;
    media_id: number;
    mediable_type: string;
    tag: string;
    order: number;
  };
}

export type ILangParam = 'uz' | 'en' | 'ru';

export interface IResourceGetParam {
  name?: string;
  page?: number;
  limit?: number;
  language?: ILangParam;
  sort?: 'desc' | 'asc';
  resource_category_id?: number;
}

export interface IResourceIdGetParam {
  id?: number;
  language?: ILangParam;
}

export interface IContractItem {
  id: number;
  key: string;
  _education_year: unknown;
  _student: number;
  _data: {
    year: string;
    status: string;
    eduForm: string;
    eduYear: string;
    fullName: string;
    statusId: number;
    eduCourse: string;
    eduFormId: number;
    contractId: number;
    eduCoursId: number;
    eduTypeCode: string;
    eduTypeName: string;
    facultyCode: string;
    facultyName: string;
    contractNumber: string;
    eduContractSum: string;
    eduOrganization: string;
    paidCreditAmount: number;
    eduSpecialityCode: string;
    eduSpecialityName: string;
    endRestDebetAmount: number;
    unPaidCreditAmount: number;
    vozvratDebetAmount: number;
    contractDebetAmount: number;
    eduContractTypeCode: string;
    eduContractTypeName: string;
    eduOrganizationCode: string;
    endRestCreditAmount: number;
    beginRestDebetAmount: number;
    beginRestCreditAmount: number;
    eduContractSumTypeCode: string;
    eduContractSumTypeName: string;
  };
  created_at: number;
  updated_at: number;
}

export interface ICurrentContractData {
  bankMfo: string;
  contractDate: string;
  contractNumber: string;
  credit: number;
  debet: number;
  debit: number;
  eduContractSum: number;
  eduContractType: string;
  eduContractTypeId: number;
  eduCourse: string;
  eduCourseId: number;
  eduForm: string;
  eduFormId: number;
  eduOrganization: string;
  eduOrganizationAccount: string;
  eduOrganizationId: number;
  eduOrganizationInn: string;
  eduPeriod: number;
  eduSpeciality: string;
  eduSpecialityId: number;
  eduType: string;
  eduTypeId: number;
  eduYear: string;
  fullName: string;
  gpa: string | number;
  institutionType: string;
  pdfLink: string;
  pinfl: string;
}

export interface IEduLoan {
  bankName: string;
  bankPhone: string;
  comment: string;
  creditSum: number;
  id: number;
  state: string;
}

export interface IGradeType {
  code: string;
  name: string;
  markingSystem: IMarkingSystem;
  position: number;
  min_border: number;
  max_border: number;
  active: boolean;
  updated_at: number;
}

export interface IMarkingSystem {
  code: MarkingSystemCodeEnum;
  name: string;
  count_final_exams: number;
  minimum_limit: number;
  gpa_limit: number;
  updated_at: number;
}

export enum MarkingSystemCodeEnum {
  Rating = '11',
  Grade = '12',
  Credit = '13',
}

export enum PaymentFormEnum {
  Grant = '11',
  Contract = '12',
}
