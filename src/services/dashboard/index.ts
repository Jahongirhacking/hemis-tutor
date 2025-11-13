import { api } from '../api';
import { getBaseUrl, uniLibraryBaseApi } from '../api/const';
import { IBaseDataEdu, IBaseDataRes, IBaseDataUniLib } from '../type';
import {
  IAttendance,
  ICurrentContractData,
  IEduLoan,
  IExamList,
  IGpaScore,
  IGradeType,
  IJournal,
  IPublisherResource,
  IPublisherResourceId,
  IResource,
  IResourceGetParam,
  IResourceIdGetParam,
  ISchedule,
  ISubject,
  ISubjectList,
  ISubjects,
  ITaskList,
  ITaskUploadCheck,
} from './type';

export const semester = 16;
export const week = 3069;

export const dashboardApi = api.injectEndpoints({
  endpoints: build => ({
    //Get Tasklist
    getTaskList: build.mutation<
      IBaseDataRes<ITaskList[]>,
      { semester: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/task-list`),
        params: {
          limit: 200,
          semester: params.semester,
        },
      }),
    }),

    //Get Tasklist
    getTaskDetail: build.mutation<IBaseDataRes<ITaskList>, { id: number }>({
      query: params => ({
        url: getBaseUrl(`/education/task-detail`),
        params: {
          task: params.id,
        },
      }),
    }),

    //Get Tasklist
    getTaskUploadCheck: build.mutation<
      IBaseDataRes<ITaskUploadCheck>,
      { id: number }
    >({
      query: params => ({
        url: getBaseUrl(`/education/task-upload-check`),
        params: {
          task: params.id,
        },
      }),
    }),

    //Get SubjectList
    getSubjectList: build.mutation<
      IBaseDataRes<ISubjectList[]>,
      { semester: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/subject-list`),
        params: {
          semester: params.semester,
        },
      }),
    }),

    //Get SubjectList
    fetchSubjectList: build.query<
      IBaseDataRes<ISubjectList[]>,
      { semester: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/subject-list`),
        params,
      }),
    }),

    //Get Subjects
    getSubjects: build.mutation<
      IBaseDataRes<ISubjects[]>,
      { semester: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/subjects`),
        params: {
          semester: params.semester,
        },
      }),
    }),

    fetchSubjects: build.query<IBaseDataRes<ISubjects[]>, { semester: string }>(
      {
        query: params => ({
          url: getBaseUrl(`/education/subjects`),
          params,
        }),
      }
    ),

    //Get SubjectList
    getSubjectID: build.mutation<
      IBaseDataRes<ISubject>,
      { semestr: string; subject: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/subject`),
        params: {
          semester: params?.semestr,
          subject: params?.subject,
        },
      }),
    }),

    //Get SubjectList
    getGpaScore: build.query<IBaseDataRes<IGpaScore[]>, void>({
      query: () => ({
        url: getBaseUrl(`/education/gpa-list`),
      }),
    }),

    //Get Subject resources
    getSubjectResource: build.mutation<
      IBaseDataRes<IResource[]>,
      { semestr: string; subject: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/resources`),
        params: {
          semester: params?.semestr,
          subject: params?.subject,
        },
      }),
    }),

    //Get attendane
    getAttendeanceList: build.mutation<
      IBaseDataRes<IAttendance[]>,
      { semester?: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/attendance`),
        params: {
          semester: params.semester,
        },
      }),
    }),

    //Get attendane
    getScheduleList: build.mutation<
      IBaseDataRes<ISchedule[]>,
      { week?: string; semester?: string }
    >({
      query: params => {
        return {
          url: getBaseUrl(`/education/schedule`),
          params:
            params.semester || params.week
              ? {
                  semester: params?.semester,
                  week: params?.week,
                }
              : {},
        };
      },
    }),

    //Get Schedules
    getSchedules: build.query<
      IBaseDataRes<ISchedule[]>,
      { week?: string; semester?: string }
    >({
      query: params => {
        return {
          url: getBaseUrl(`/education/schedule`),
          params:
            params.semester || params.week
              ? {
                  semester: params?.semester,
                  week: params?.week,
                }
              : {},
        };
      },
    }),

    //Get attendane
    getExamTableList: build.mutation<
      IBaseDataRes<IExamList[]>,
      { semester: string }
    >({
      query: params => ({
        url: getBaseUrl(`/education/exam-table`),
        params: {
          semester: params?.semester,
        },
      }),
    }),

    //Get Books
    getBookList: build.mutation<
      IBaseDataUniLib<IPublisherResource[]>,
      IResourceGetParam
    >({
      query: params => ({
        url: `${uniLibraryBaseApi}/api/user/guest-publisher-resources-with-media`,
        params: {
          name: params?.name,
          page: params?.page,
          limit: params?.limit,
          language: params?.language,
          sort: params?.sort,
          resource_category_id: params?.resource_category_id,
        },
      }),
    }),

    //Get Books
    getBookId: build.mutation<
      { result: IPublisherResourceId[] },
      IResourceIdGetParam
    >({
      query: params => ({
        url: `${uniLibraryBaseApi}/api/user/guest-publisher-resources/${params?.id}`,
        params: {
          language: params?.language,
        },
      }),
    }),

    //Get Books
    getJournalList: build.mutation<
      IBaseDataUniLib<IJournal[]>,
      IResourceGetParam
    >({
      query: params => ({
        url: `${uniLibraryBaseApi}/api/user/guest-journals`,
        params: {
          name: params?.name,
          page: params?.page,
          limit: params?.limit,
          language: params?.language,
          sort: params?.sort,
          resource_category_id: params?.resource_category_id,
        },
      }),
    }),

    //Get Contract
    getContractInfo: build.query<IBaseDataRes<ICurrentContractData>, void>({
      query: () => ({
        url: getBaseUrl('/student/contract'),
      }),
    }),

    // Post Loan Info
    postEduLoanInfo: build.mutation<
      IBaseDataEdu<IEduLoan>,
      { pinfl: string; hesh: string }
    >({
      query: ({ pinfl, hesh }) => ({
        url: 'https://billing.e-edu.uz/api/student/educationCredit/appInfoByPinfl',
        method: 'POST',
        body: {
          pinfl,
          hesh,
        },
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set correctly
        },
      }),
    }),

    getGradeTypeList: build.query<IBaseDataRes<IGradeType[]>, void>({
      query: () => getBaseUrl(`/education/grade-type-list`),
    }),
  }),
});

export const {
  useGetTaskListMutation,
  useGetSubjectListMutation,
  useGetAttendeanceListMutation,
  useGetSubjectIDMutation,
  useGetSubjectResourceMutation,
  useGetScheduleListMutation,
  useGetExamTableListMutation,
  useGetTaskDetailMutation,
  useGetTaskUploadCheckMutation,
  useGetSubjectsMutation,
  useGetBookListMutation,
  useGetJournalListMutation,
  useGetBookIdMutation,
  useGetGpaScoreQuery,
  useGetContractInfoQuery,
  useLazyGetContractInfoQuery,
  usePostEduLoanInfoMutation,
  useGetSchedulesQuery,
  useGetGradeTypeListQuery,
  useFetchSubjectListQuery,
  useFetchSubjectsQuery,
} = dashboardApi;
