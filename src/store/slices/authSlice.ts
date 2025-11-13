import { api } from '@/services/api';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface IAuth {
  access: string;
  isMobileNavBottom: boolean;
  isMobile: boolean;
}

const token = getLocalStorage(localStorageNames.HEMIS_TOKEN);

const initialState: IAuth = {
  access: token || '',
  isMobileNavBottom:
    getLocalStorage(localStorageNames.isMobileNavBottom) ?? false,
  isMobile: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.access = '';
      localStorage.removeItem(localStorageNames.HEMIS_TOKEN);
      // window.location.href = '/';
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
  extraReducers: () => {},
});

export const logoutThunk = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.logout());
  dispatch(api.util.resetApiState());
};

export const { logout, register, setMobileNavBottom, setStateIsMobile } =
  authSlice.actions;
export default authSlice.reducer;
