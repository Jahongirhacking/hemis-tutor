import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { TYUTOR_API_URL } from './const';

type ApiFileItem = {
  id: number;
  title?: string;
  file?: string;
  order_name?: string;
};

type ApiNewsItem = {
  id: number;
  created_at?: string;
  title?: string;
  content?: string;
  hashtag?: string;
  image?: string;
};

type TutorDeskItem = {
  id: number;
  title?: string;
  avatar?: string;
  full_name?: string;
  workplace?: string;
};

const publicBaseQuery = fetchBaseQuery({
  baseUrl: TYUTOR_API_URL,
});

const publicBaseQueryWithRetry = retry(publicBaseQuery, { maxRetries: 0 });

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: publicBaseQueryWithRetry,
  endpoints: build => ({
    getFiles: build.query<ApiFileItem[], void>({
      query: () => '/api/v1/files',
    }),
    getNews: build.query<ApiNewsItem[], void>({
      query: () => '/api/v1/news',
    }),
    getTutorDesk: build.query<TutorDeskItem[], void>({
      query: () => '/api/v1/tutor-desk',
    }),
  }),
  tagTypes: ['Files', 'News', 'TutorDesk'],
});

export const {
  useGetFilesQuery,
  useGetNewsQuery,
  useGetTutorDeskQuery,
} = publicApi;

