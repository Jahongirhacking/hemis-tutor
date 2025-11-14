import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import {
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
  }),
});

export const {
  useGetGroupsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
