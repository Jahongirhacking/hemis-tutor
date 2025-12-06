import { encodeStudentId } from '@/utils/stringFunc';
import { chatBaseUrl, ttsUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import { chatBaseApi } from './chatBaseApi';
import {
  IChatHistoryRes,
  IChatReqBody,
  IRent,
  IScholarship,
  ITtsRequest,
} from './type';

const FINANCE_API_URL = `https://stat.edu.uz/api/integration/hemis/student`;
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteV9oZW1pcyIsInJvbGVzIjoiUk9MRV9TVVBFUkFETUlOIiwiZXhwIjoxNzYyODAwMjc2LCJpYXQiOjE3NjI3MTM4NzZ9.fH6v0JlgjHD87oydg9QxwM0LNPKeCYTG9jUGXueiE3k';

export const chatApi = chatBaseApi.injectEndpoints({
  endpoints: build => ({
    generateGpaSummary: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/student-gpa-summary`,
        method: 'POST',
        body,
        params: { token: encodeStudentId(token) },
      }),
      invalidatesTags: ['ai-chat'],
    }),

    generateAttendanceSummary: build.mutation<{ answer: string }, IChatReqBody>(
      {
        query: ({ token, ...body }) => ({
          url: `${chatBaseUrl}/student-attendance-summary`,
          method: 'POST',
          body,
          params: { token: encodeStudentId(token) },
        }),
        invalidatesTags: ['ai-chat'],
      }
    ),

    generateTimetableSummary: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/student-timetable-summary`,
        method: 'POST',
        body,
        params: { token: encodeStudentId(token) },
      }),
      invalidatesTags: ['ai-chat'],
    }),

    generateChatResponse: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/`,
        method: 'POST',
        body,
        params: { token: encodeStudentId(token) },
      }),
      invalidatesTags: ['ai-chat'],
    }),

    getChatHistory: build.query<IChatHistoryRes, Pick<IChatReqBody, 'token'>>({
      query: ({ token }) => ({
        url: `${chatBaseUrl}/history`,
        params: { token: encodeStudentId(token) },
      }),
      providesTags: ['ai-chat'],
    }),

    deleteChatHistory: build.mutation<void, Pick<IChatReqBody, 'token'>>({
      query: params => ({
        url: `${chatBaseUrl}/history`,
        params: { token: encodeStudentId(params?.token) },
        method: 'DELETE',
      }),
      invalidatesTags: ['ai-chat'],
    }),

    getTextToSpeech: build.mutation<Blob, ITtsRequest>({
      query: body => ({
        url: `${ttsUrl}`,
        body,
        method: 'POST',
      }),
    }),

    getCourseRecommendation: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/course-recommendation`,
        body,
        params: { token: encodeStudentId(token) },
        method: 'POST',
      }),
    }),

    checkPlagiarism: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/check-plagiarism`,
        body,
        params: { token: encodeStudentId(token) },
        method: 'POST',
      }),
    }),

    checkPlagiarismFile: build.mutation<
      { answer: string },
      Pick<IChatReqBody, 'token'> & { file: FormData }
    >({
      query: ({ token, file }) => ({
        url: `${chatBaseUrl}/check-plagiarism-file`,
        body: file,
        params: { token: encodeStudentId(token) },
        method: 'POST',
      }),
    }),

    getContractSummary: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/contract-info`,
        body,
        params: { token: encodeStudentId(token) },
        method: 'POST',
      }),
    }),

    getScholarshipInfo: build.query<
      IBaseDataRes<IScholarship>,
      { studentId: string }
    >({
      query: ({ studentId }) => ({
        url: `${FINANCE_API_URL}/scholarship/${studentId}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'x-skip-error-logger': 'true',
        },
      }),
    }),

    getRentInfo: build.query<
      IBaseDataRes<IRent[]>,
      { studentId: string }
    >({
      query: ({ studentId }) => ({
        url: `${FINANCE_API_URL}/rent/${studentId}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'x-skip-error-logger': 'true',
        },
      }),
    }),
  }),
});

export const {
  useGenerateGpaSummaryMutation,
  useGetChatHistoryQuery,
  useGenerateChatResponseMutation,
  useDeleteChatHistoryMutation,
  useGenerateAttendanceSummaryMutation,
  useGenerateTimetableSummaryMutation,
  useGetTextToSpeechMutation,
  useGetCourseRecommendationMutation,
  useCheckPlagiarismMutation,
  useGetContractSummaryMutation,
  useGetScholarshipInfoQuery,
  useGetRentInfoQuery,
  useCheckPlagiarismFileMutation,
} = chatApi;
