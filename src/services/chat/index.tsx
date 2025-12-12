import { encodeTutorId } from '@/utils/stringFunc';
import { chatBaseUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import { chatBaseApi } from './chatBaseApi';
import { IChatHistoryRes, IChatReqBody, IRent, IScholarship } from './type';

const FINANCE_API_URL = `https://stat.edu.uz/api/integration/hemis/student`;
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteV9oZW1pcyIsInJvbGVzIjoiUk9MRV9TVVBFUkFETUlOIiwiZXhwIjoxNzYyODAwMjc2LCJpYXQiOjE3NjI3MTM4NzZ9.fH6v0JlgjHD87oydg9QxwM0LNPKeCYTG9jUGXueiE3k';

export const chatApi = chatBaseApi.injectEndpoints({
  endpoints: build => ({
    generateChatResponse: build.mutation<{ answer: string }, IChatReqBody>({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/tyutor/chatbot`,
        method: 'POST',
        body,
        params: { token: encodeTutorId(token) },
      }),
      invalidatesTags: ['ai-chat'],
    }),

    getChatHistory: build.query<IChatHistoryRes, Pick<IChatReqBody, 'token'>>({
      query: ({ token }) => ({
        url: `${chatBaseUrl}/tyutor/history`,
        params: { token: encodeTutorId(token) },
      }),
      providesTags: ['ai-chat'],
    }),

    deleteChatHistory: build.mutation<void, Pick<IChatReqBody, 'token'>>({
      query: params => ({
        url: `${chatBaseUrl}/tyutor/history`,
        params: { token: encodeTutorId(params?.token) },
        method: 'DELETE',
      }),
      invalidatesTags: ['ai-chat'],
    }),

    generateAttendanceResponse: build.mutation<
      { answer: string },
      IChatReqBody
    >({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/tyutor/student-attendance`,
        method: 'POST',
        body,
        params: { token: encodeTutorId(token) },
      }),
    }),

    generateAttendancePatternResponse: build.mutation<
      { answer: string },
      IChatReqBody
    >({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/tyutor/student-attendance-pattern`,
        method: 'POST',
        body,
        params: { token: encodeTutorId(token) },
      }),
    }),

    generateVisitAnomalyResponse: build.mutation<
      { answer: string },
      IChatReqBody
    >({
      query: ({ token, ...body }) => ({
        url: `${chatBaseUrl}/tyutor/detecting-student-visit-anomaly`,
        method: 'POST',
        body,
        params: { token: encodeTutorId(token) },
      }),
    }),

    // old api

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

    getRentInfo: build.query<IBaseDataRes<IRent[]>, { studentId: string }>({
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
  useGetChatHistoryQuery,
  useGenerateChatResponseMutation,
  useDeleteChatHistoryMutation,
  useGetScholarshipInfoQuery,
  useGetRentInfoQuery,
  useGenerateAttendancePatternResponseMutation,
  useGenerateAttendanceResponseMutation,
  useGenerateVisitAnomalyResponseMutation,
} = chatApi;
