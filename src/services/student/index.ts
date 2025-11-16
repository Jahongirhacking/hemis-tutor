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
  IContractDetailsReq,
  IContractDetailsRes,
  IContractListReq,
  IContractListRes,
  IDebtorsReq,
  IDebtorsRes,
  IGradeDebtorReq,
  IGradeDebtorRes,
  IGradeRatingReq,
  IGradeRatingRes,
  IGroupDetailsReq,
  IGroupDetailsRes,
  IGroupListReq,
  IGroupListRes,
  IGroupSemestersReq,
  IGroupSemestersRes,
  IGroupStudentsReq,
  IGroupStudentsRes,
  IPagination,
  IStudent,
  IStudentGradeReq,
  IStudentGradeRes,
  IStudentListReq,
} from './type';

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

    getStudentGrade: build.query<
      IBaseDataRes<IStudentGradeRes>,
      IStudentGradeReq
    >({
      query: ({ id, ...params }) => ({
        url: `${getBaseUrl(`/grade/student/${id}`)}`,
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
      query: ({ id, ...params }) => ({
        url: `${getBaseUrl(`/group/view/${id}`)}`,
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
} = studentApi;
