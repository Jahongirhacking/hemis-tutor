import { encodeStudentId } from '@/utils/stringFunc';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/store/store';
import { IStudentExtraInfoRes, IStudentPassportRes } from '../type';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://stat.edu.uz/api/ministry-ui',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.access;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const statApi = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: 'stat',
  endpoints: build => ({
    getStudentProfile: build.query<
      { data: IStudentPassportRes },
      { student_id_number: string }
    >({
      query: ({ student_id_number }) => ({
        url: `/student`,
        params: {
          hash: encodeStudentId(student_id_number),
        },
      }),
    }),

    getStudentExtraInfo: build.query<
      IStudentExtraInfoRes,
      { student_hash_number: string }
    >({
      query: ({ student_hash_number }) => ({
        url: `https://stat.edu.uz/api/uzasbohemis/student-sync-data`,
        params: {
          hash: encodeStudentId(student_hash_number),
        },
      }),
    }),
  }),
  tagTypes: [],
});

export const { useGetStudentExtraInfoQuery, useGetStudentProfileQuery } =
  statApi;
