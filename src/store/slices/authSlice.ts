import { api } from '@/services/api';
import { authApi } from '@/services/auth';
import { profileApi } from '@/services/profile';
import { IGetProfileRes } from '@/services/profile/type';
import { IGroupDetails } from '@/services/student/type';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { AppDispatch } from '../store';

interface IAuth {
  access: string;
  isMobileNavBottom: boolean;
  isMobile: boolean;
  profile: IGetProfileRes;
  currentGroup: IGroupDetails;
}

const token = getLocalStorage(localStorageNames.HEMIS_TOKEN);

const initialState: IAuth = {
  access: token || '',
  isMobileNavBottom:
    getLocalStorage(localStorageNames.isMobileNavBottom) ?? false,
  isMobile: false,
  profile: null,
  currentGroup: null,
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
          state.currentGroup = payload?.result?.groups?.[0];
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
