import { api } from '@/services/api';
import { authApi } from '@/services/auth';
import { profileApi } from '@/services/profile';
import { IGetProfileRes } from '@/services/profile/type';
import { ISemester } from '@/services/student/type';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import moment from 'moment';
import { AppDispatch } from '../store';

interface IAuth {
  access: string;
  isMobileNavBottom: boolean;
  isMobile: boolean;
  profile: IGetProfileRes;
}

const token = getLocalStorage(localStorageNames.HEMIS_TOKEN);

const initialState: IAuth = {
  access: token || '',
  isMobileNavBottom:
    getLocalStorage(localStorageNames.isMobileNavBottom) ?? false,
  isMobile: false,
  profile: null,
};

const DATE_FORMAT = 'YYYY-MM-DD';

export const getCurrentSemester = (semesters: ISemester[]) => {
  return (
    semesters?.find(s =>
      moment().isBetween(
        moment(s.start_date, DATE_FORMAT),
        moment(s.end_date, DATE_FORMAT),
        undefined,
        '[]'
      )
    ) || semesters?.[0]
  );
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.access = '';
      localStorage.removeItem(localStorageNames.HEMIS_TOKEN);
    },
    register: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      setLocalStorage(localStorageNames.HEMIS_TOKEN, action.payload);
    },
    setMobileNavBottom: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavBottom = action.payload;
      setLocalStorage(localStorageNames.isMobileNavBottom, action.payload);
    },
    setStateIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.access = payload?.result?.token;
          setLocalStorage(
            localStorageNames.HEMIS_TOKEN,
            payload?.result?.token
          );
          setLocalStorage(
            localStorageNames.REFRESH_TOKEN,
            payload?.result?.refresh_token
          );
          message.destroy();
          message.success(payload?.result?.message);
        }
      )
      .addMatcher(
        profileApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }) => {
          state.profile = payload?.result;
        }
      );
  },
});

export const logoutThunk = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.logout());
  dispatch(api.util.resetApiState());
};

export const { logout, register, setMobileNavBottom, setStateIsMobile } =
  authSlice.actions;
export default authSlice.reducer;
