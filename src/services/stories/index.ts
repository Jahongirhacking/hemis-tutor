import { storyBaseApi } from './storyBaseApi';
import { IStoryData } from './type';

export const storyApi = storyBaseApi.injectEndpoints({
  endpoints: build => ({
    getStories: build.query<IStoryData[], void>({
      query: () => `/api/stories`,
      providesTags: ['stories'],
    }),
  }),
});

export const { useGetStoriesQuery } = storyApi;
