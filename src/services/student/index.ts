import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import {
  IAttendanceBySubjectReq,
  IAttendanceBySubjectRes,
  IAttendanceReportReq,
  IAttendanceReportRes,
  IAttendanceStatisticsReq,
  IAttendanceStatisticsRes,
  ICheckAddressRes,
  ICodeName,
  IContractDetailsReq,
  IContractDetailsRes,
  IContractListReq,
  IContractListRes,
  ICreateVisitReq,
  IDebtorsReq,
  IDebtorsRes,
  IEducationYear,
  IExamsRes,
  IGradeDebtorReq,
  IGradeDebtorRes,
  IGradeRatingReq,
  IGradeRatingRes,
  IGradeSummaryRatingRes,
  IGroup,
  IGroupDetailsReq,
  IGroupDetailsRes,
  IGroupListReq,
  IGroupListRes,
  IGroupSemestersReq,
  IGroupSemestersRes,
  IGroupStudentsReq,
  IGroupStudentsRes,
  IMessage,
  IMessageDetail,
  IMessageListRes,
  IPagination,
  IProfileHistoryRes,
  IRecipient,
  IRecipientsRes,
  IScheduleByWeekRes,
  IScheduleOptionRes,
  ISemester,
  IStudent,
  IStudentDetailsRes,
  IStudentGpaRes,
  IStudentGradeReq,
  IStudentGradeRes,
  IStudentHistoryRes,
  IStudentListReq,
  RecipientType,
  StudentLivingStatus,
} from './type';

const DEFAULT_EXPAND =
  'tutorVisits,group,currentProvince,currentDistrict,currentTerrain,studentLivingStatus,accommodation, meta.educationType, meta.educationForm, meta.educationYear, meta.semestr';
const DEFAULT_FIELDS =
  'id,first_name,second_name,third_name,passport_pin,group.name,_student_living_status,_current_province,_accommodation, meta.id';

export const studentApi = api.injectEndpoints({
  endpoints: build => ({
    // Attendance
    getAttendanceBySubject: build.query<
      IBaseDataRes<IAttendanceBySubjectRes>,
      IAttendanceBySubjectReq
    >({
      query: params => ({
        url: `${getBaseUrl('/attendance/by-subject')}`,
        params,
      }),
    }),

    getAttendanceReport: build.query<
      IBaseDataRes<IAttendanceReportRes>,
      IAttendanceReportReq
    >({
      query: params => ({
        url: `${getBaseUrl('/attendance/report')}`,
        params,
      }),
    }),

    getAttendanceStatistics: build.query<
      IBaseDataRes<IAttendanceStatisticsRes>,
      IAttendanceStatisticsReq
    >({
      query: params => ({
        url: `${getBaseUrl('/attendance/statistic')}`,
        params,
      }),
    }),

    // Contract
    getDebtors: build.query<IBaseDataRes<IDebtorsRes>, IDebtorsReq>({
      query: params => ({
        url: `${getBaseUrl('/contract/debtors')}`,
        params,
      }),
    }),

    getContractList: build.query<
      IBaseDataRes<IContractListRes>,
      IContractListReq
    >({
      query: params => ({
        url: `${getBaseUrl('/contract/list')}`,
        params,
      }),
    }),

    getContractDetails: build.query<
      IBaseDataRes<IContractDetailsRes>,
      IContractDetailsReq
    >({
      query: params => ({
        url: `${getBaseUrl(`/contract/view/${params?.id}`)}`,
      }),
    }),

    // Grades
    getGradeDebtors: build.query<
      IBaseDataRes<IGradeDebtorRes>,
      IGradeDebtorReq
    >({
      query: params => ({
        url: `${getBaseUrl('/grade/debtors')}`,
        params,
      }),
    }),

    getGradeRating: build.query<IBaseDataRes<IGradeRatingRes>, IGradeRatingReq>(
      {
        query: params => ({
          url: `${getBaseUrl('/grade/rating')}`,
          params,
        }),
      }
    ),

    getGradeSummaryRating: build.query<
      IBaseDataRes<IGradeSummaryRatingRes>,
      IGradeRatingReq
    >({
      query: params => ({
        url: `${getBaseUrl('/grade/summary')}`,
        params,
      }),
    }),

    getStudentGrade: build.query<
      IBaseDataRes<IStudentGradeRes>,
      IStudentGradeReq
    >({
      query: ({ ...params }) => ({
        url: `${getBaseUrl(`/grade/student`)}`,
        params,
      }),
    }),

    getStudentGpa: build.query<
      IBaseDataRes<IStudentGpaRes>,
      { group_id: IGroup['id']; semester: ISemester['code'] }
    >({
      query: params => ({
        url: `${getBaseUrl(`/grade/gpa`)}`,
        params,
      }),
    }),

    // Groups
    getGroupList: build.query<IBaseDataRes<IGroupListRes>, IGroupListReq>({
      query: params => ({
        url: `${getBaseUrl(`/group/list`)}`,
        params,
      }),
    }),

    getGroupStudents: build.query<
      IBaseDataRes<IGroupStudentsRes>,
      IGroupStudentsReq
    >({
      query: ({ id, ...params }) => ({
        url: `${getBaseUrl(`/group/students/${id}`)}`,
        params,
      }),
    }),

    getGroupDetails: build.query<
      IBaseDataRes<IGroupDetailsRes>,
      IGroupDetailsReq
    >({
      query: ({ ...params }) => ({
        url: `${getBaseUrl(`/group/view`)}`,
        params,
      }),
    }),

    getGroupSemesters: build.query<
      IBaseDataRes<IGroupSemestersRes>,
      IGroupSemestersReq
    >({
      query: params => ({
        url: `${getBaseUrl('/group/semesters')}`,
        params,
      }),
    }),

    // Students
    getStudentList: build.query<
      IBaseDataRes<{ students: IStudent[]; pagination: IPagination }>,
      IStudentListReq
    >({
      query: params => ({
        url: `${getBaseUrl('/student/list')}`,
        params,
      }),
    }),

    getStudentHistory: build.query<
      IBaseDataRes<IProfileHistoryRes>,
      { id: IStudent['id'] }
    >({
      query: params => ({
        url: `${getBaseUrl('/student/history')}`,
        params,
      }),
    }),

    getStudentDetails: build.query<
      IBaseDataRes<IStudentDetailsRes>,
      { id: IStudent['id'] }
    >({
      query: params => ({
        url: `${getBaseUrl(`/student/view`)}`,
        params,
      }),
    }),

    getStudentHistoryList: build.query<
      IBaseDataRes<IStudentHistoryRes>,
      {
        search?: string;
        pinfl?: string;
        level?: string;
        group?: IGroup['id'];
        specialty?: number;
        education_year?: IEducationYear['code'];
        page?: number;
        per_page?: number;
      }
    >({
      query: params => ({
        url: `${getBaseUrl('/student/history-list')}`,
        params,
      }),
    }),

    // Schedules
    getSchedulesByWeek: build.query<
      IBaseDataRes<IScheduleByWeekRes>,
      { week_id: number; group_id?: IGroup['id'] }
    >({
      query: params => ({
        url: `${getBaseUrl(`/schedule/weekly`)}`,
        params,
      }),
    }),

    getScheduleOptions: build.query<
      IBaseDataRes<IScheduleOptionRes>,
      {
        faculty_id?: number;
        group_id?: number;
        education_year?: IEducationYear['code'];
        semester?: ISemester['code'];
        expand?: string;
      }
    >({
      query: params => ({
        url: `${getBaseUrl(`/schedule/filter-options`)}`,
        params,
      }),
    }),

    getExams: build.query<
      IBaseDataRes<IExamsRes>,
      {
        group_id?: IGroup['id'];
        semester?: ISemester['code'];
        page?: number;
        per_page?: number;
      }
    >({
      query: params => ({
        url: `${getBaseUrl(`/schedule/exams`)}`,
        params,
      }),
    }),

    // address
    getVisitList: build.query<
      IBaseDataRes<ICheckAddressRes>,
      {
        group_id?: IGroup['id'];
        page?: number;
        student_id?: IStudent['id'];
        per_page?: number;
        search?: string;
        _student_living_status?: string;
        _current_district?: string;
        expand?: string;
        fields?: string;
      }
    >({
      query: params => ({
        url: `${getBaseUrl(`/student/visit-list`)}`,
        params: {
          fields: DEFAULT_FIELDS,
          expand: DEFAULT_EXPAND,
          ...params,
        },
      }),
      providesTags: ['visits'],
    }),

    createVisit: build.mutation<void, ICreateVisitReq>({
      query: ({ id, ...body }) => ({
        url: `${getBaseUrl(`/student/visit-create`)}`,
        method: 'POST',
        params: { id },
        body,
      }),
      invalidatesTags: ['visits'],
    }),

    // classifiers
    getCountries: build.query<IBaseDataRes<{ items: ICodeName[] }>, void>({
      query: () => ({
        url: `${getBaseUrl(`/reference/countries`)}`,
      }),
    }),

    getAccommodations: build.query<IBaseDataRes<{ items: ICodeName[] }>, void>({
      query: () => ({
        url: `${getBaseUrl(`/reference/accommodations`)}`,
      }),
    }),

    getDistricts: build.query<
      IBaseDataRes<{ items: ICodeName[] }>,
      { province: number }
    >({
      query: params => ({
        url: `${getBaseUrl(`/reference/districts`)}`,
        params,
      }),
    }),

    getEducationYears: build.query<
      IBaseDataRes<{ items: IEducationYear[] }>,
      void
    >({
      query: () => ({
        url: `${getBaseUrl(`/reference/education-years`)}`,
      }),
    }),

    getProvinces: build.query<IBaseDataRes<{ items: ICodeName[] }>, void>({
      query: () => ({
        url: `${getBaseUrl(`/reference/provinces`)}`,
      }),
    }),

    getSpecalities: build.query<
      IBaseDataRes<{ items: (ICodeName & { id: number })[] }>,
      void
    >({
      query: () => ({
        url: `${getBaseUrl(`/reference/specialties`)}`,
      }),
    }),

    getLivingStatuses: build.query<
      IBaseDataRes<{ items: { name: string; code: StudentLivingStatus }[] }>,
      void
    >({
      query: () => ({
        url: `${getBaseUrl(`/reference/student-living-statuses`)}`,
      }),
    }),

    getRoommateTypes: build.query<void, void>({
      query: () => ({
        url: `${getBaseUrl(`/reference/student-roommate-types`)}`,
      }),
    }),

    getStudentStatuses: build.query<IBaseDataRes<{ items: ICodeName[] }>, void>(
      {
        query: () => ({
          url: `${getBaseUrl(`/reference/student-statuses`)}`,
        }),
      }
    ),

    getTerrains: build.query<
      IBaseDataRes<{ items: ICodeName[] }>,
      { district: number }
    >({
      query: params => ({
        url: `${getBaseUrl(`/reference/terrains`)}`,
        params,
      }),
    }),

    // Messages
    getMessages: build.query<
      IBaseDataRes<IMessageListRes>,
      { type: string; search?: string; page: number; per_page: number }
    >({
      query: params => ({
        url: `${getBaseUrl(`/message/list`)}`,
        params,
      }),
      providesTags: ['messages'],
    }),

    getMessageDetails: build.query<
      IBaseDataRes<IMessageDetail>,
      { id: string }
    >({
      query: params => ({
        url: `${getBaseUrl(`/message/view`)}`,
        params,
      }),
      providesTags: (_, __, { id }) => [{ type: 'messages', id }],
    }),

    markAsRead: build.mutation<void, { id: IMessage['id'] }>({
      query: body => ({
        url: `${getBaseUrl(`/message/mark-as-read`)}`,
        body,
        method: 'POST',
      }),
    }),

    getRecipients: build.query<
      IBaseDataRes<IRecipientsRes>,
      {
        type?: RecipientType;
        search?: string;
        group_id?: IGroup['id'];
        department_id?: number;
        page?: number;
        per_page?: number;
      }
    >({
      query: params => ({
        url: `${getBaseUrl(`/message/recipients`)}`,
        params,
      }),
    }),

    sendMessage: build.mutation<
      void,
      {
        title: string;
        message: string;
        recipients: IRecipient['id'][];
        save_as_draft: boolean;
      }
    >({
      query: body => ({
        url: `${getBaseUrl(`/message/send`)}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['messages'],
    }),
  }),
});

export const {
  useGetAttendanceBySubjectQuery,
  useGetAttendanceReportQuery,
  useGetContractDetailsQuery,
  useGetContractListQuery,
  useGetDebtorsQuery,
  useGetGradeDebtorsQuery,
  useGetGradeRatingQuery,
  useGetGroupDetailsQuery,
  useGetGroupListQuery,
  useGetGroupStudentsQuery,
  useGetStudentGradeQuery,
  useGetGroupSemestersQuery,
  useGetAttendanceStatisticsQuery,
  useGetStudentListQuery,
  useGetStudentDetailsQuery,
  useGetScheduleOptionsQuery,
  useGetSchedulesByWeekQuery,
  useGetExamsQuery,
  useGetStudentGpaQuery,
  useGetGradeSummaryRatingQuery,
  useGetVisitListQuery,
  useGetStudentHistoryListQuery,
  useGetStudentHistoryQuery,
  useCreateVisitMutation,
  useGetLivingStatusesQuery,
  useGetCountriesQuery,
  useGetDistrictsQuery,
  useGetEducationYearsQuery,
  useGetProvincesQuery,
  useGetSpecalitiesQuery,
  useGetRoommateTypesQuery,
  useGetStudentStatusesQuery,
  useGetTerrainsQuery,
  useGetAccommodationsQuery,
  useGetMessagesQuery,
  useGetMessageDetailsQuery,
  useMarkAsReadMutation,
  useGetRecipientsQuery,
  useLazyGetRecipientsQuery,
  useSendMessageMutation,
} = studentApi;
