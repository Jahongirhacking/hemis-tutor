import { api } from '@/services/api';
import { dashboardApi } from '@/services/dashboard';
import { IAttendance } from '@/services/dashboard/type';
import { IBaseDataRes } from '@/services/type';
import { authApi } from '@/services/users';
import { token } from '@/services/users/const';
import { IProfile, ISemestr } from '@/services/users/type';
import { getCurrentSemester } from '@/utils/dateFunc';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface IAuth {
  isLogged: boolean;
  access: string;
  profile: IBaseDataRes<IProfile>;
  semestrs: IBaseDataRes<ISemestr[]>;
  attendance: IBaseDataRes<IAttendance[]>;
  currentSemester: ISemestr | null;
  isMobileNavBottom: boolean;
  isMobile: boolean;
  pinfl?: string;
}
const initialState: IAuth = {
  profile: null,
  access: token || '',
  isLogged: token ? true : false,
  semestrs: null,
  attendance: null,
  currentSemester: null,
  isMobileNavBottom:
    getLocalStorage(localStorageNames.isMobileNavBottom) ?? false,
  isMobile: false,
  pinfl: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    logout: state => {
      state.access = '';
      state.profile = undefined;
      state.isLogged = false;
      localStorage.removeItem(localStorageNames.HEMIS_TOKEN);
      // window.location.href = '/';
    },
    setCurrentSemester: (state: IAuth, action: PayloadAction<ISemestr>) => {
      state.currentSemester = action.payload;
    },
    register: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      state.isLogged = true;
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
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isLogged = true;
        state.access = action.payload.data.token;
        setLocalStorage(
          localStorageNames.HEMIS_TOKEN,
          action.payload.data.token
        );
      })
      .addMatcher(authApi.endpoints.login.matchRejected, state => {
        state.access = undefined;
        state.isLogged = false;
      })
      .addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.profile = action.payload;
          state.currentSemester =
            state?.profile && state?.profile?.data?.semester;
          // const data = action.payload?.data;
          // if (
          //   data &&
          //   !devtools.isOpen &&
          //   !getLocalStorage(localStorageNames.notFirstTime)
          // ) {
          //   sendMessage({
          //     message: {
          //       fullname: data?.full_name,
          //       id: data?.student_id_number,
          //       year: moment.unix(data?.birth_date).format('DD.MM.YYYY'),
          //       course: data?.level?.name,
          //       specialty: data?.specialty?.name,
          //       group: data?.group?.name,
          //       eduType: data?.educationType?.name,
          //       email: data?.email,
          //       phone: data?.phone,
          //       univ: data?.university,
          //       province: data?.province?.name,
          //       district: data?.district?.name,
          //       address: data?.address,
          //       token: getLocalStorage(localStorageNames.HEMIS_TOKEN) ?? '',
          //       image: data?.image,
          //     },
          //   }).then(res => {
          //     if (res) {
          //       setLocalStorage(localStorageNames.notFirstTime, true);
          //     }
          //   });
          // }
        }
      )
      .addMatcher(
        authApi.endpoints.getSemestr.matchFulfilled,
        (state, action) => {
          state.semestrs = action.payload;
          if (!state.currentSemester)
            state.currentSemester =
              state?.profile && state?.profile?.data?.semester
                ? state?.profile?.data?.semester
                : getCurrentSemester(action?.payload?.data);
        }
      )
      .addMatcher(
        authApi.endpoints.getAllAttendeance.matchFulfilled,
        (state, action) => {
          state.attendance = action.payload;
        }
      )
      .addMatcher(
        dashboardApi.endpoints.getContractInfo.matchFulfilled,
        (state, action) => {
          state.pinfl = action?.payload?.data?.pinfl;
        }
      );
  },
});

export const logoutThunk = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.logout());
  dispatch(api.util.resetApiState());
};

export const {
  logout,
  setCurrentSemester,
  register,
  setMobileNavBottom,
  setStateIsMobile,
} = authSlice.actions;
export default authSlice.reducer;
