import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import {
  IDashboardStatisticsRes,
  IGetGroupReq,
  IGetGroupRes,
  IGetProfileRes,
  IUpdateProfileReq,
  IUpdateProfileRes,
} from './type';

export const profileApi = api.injectEndpoints({
  endpoints: build => ({
    getGroups: build.query<IBaseDataRes<IGetGroupRes>, IGetGroupReq>({
      query: params => ({
        url: `${getBaseUrl('/profile/groups')}`,
        params,
      }),
    }),

    getProfile: build.query<IBaseDataRes<IGetProfileRes>, void>({
      query: () => ({
        url: `${getBaseUrl('/profile/index')}`,
      }),
      providesTags: ['profile'],
    }),

    updateProfile: build.mutation<
      IBaseDataRes<IUpdateProfileRes>,
      IUpdateProfileReq
    >({
      query: body => ({
        url: `${getBaseUrl('/profile/update')}`,
        body,
      }),
      invalidatesTags: ['profile'],
    }),

    getDashboardStatistics: build.query<
      IBaseDataRes<IDashboardStatisticsRes>,
      { education_year?: string; semester?: string; expand: string }
    >({
      query: params => ({
        url: `${getBaseUrl('/statistics/dashboard')}`,
        params,
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetDashboardStatisticsQuery,
} = profileApi;
