import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IBaseDataRes } from '../type';
import { ILoginReq } from './type';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<IBaseDataRes<{ token: string }>, ILoginReq>({
      query: body => ({
        url: `${getBaseUrl('/auth/login', false)}`,
        method: 'POST',
        body,
      }),
    }),

    refreshToken: build.mutation<IBaseDataRes<{ token: string }>, void>({
      query: () => ({
        url: `${getBaseUrl('/auth/refresh-token', false)}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
