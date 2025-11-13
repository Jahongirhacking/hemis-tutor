import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IAttendance } from '../dashboard/type';
import { IBaseDataRes } from '../type';
import { ILogin, ILoginRes, IProfile, ISemestr } from './type';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    //User login endpoint
    login: build.mutation<IBaseDataRes<ILoginRes>, ILogin>({
      query: body => ({
        url: getBaseUrl(`/auth/login`, false),
        method: 'POST',
        body,
      }),
    }),

    refreshToken: build.mutation<IBaseDataRes<ILoginRes>, void>({
      query: () => ({
        url: getBaseUrl(`/auth/refresh-token`, false),
        method: 'POST',
      }),
    }),

    //Get profile info endpoint
    getProfile: build.mutation<IBaseDataRes<IProfile>, void>({
      query: () => ({ url: getBaseUrl(`/account/me`) }),
    }),

    //Get semestrs info
    getSemestr: build.mutation<IBaseDataRes<ISemestr[]>, void>({
      query: () => ({ url: getBaseUrl(`/education/semesters`) }),
    }),

    //Get attendane
    getAllAttendeance: build.mutation<IBaseDataRes<IAttendance[]>, void>({
      query: () => ({
        url: getBaseUrl(`/education/attendance`),
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileMutation,
  useGetSemestrMutation,
  useGetAllAttendeanceMutation,
  useRefreshTokenMutation,
} = authApi;
