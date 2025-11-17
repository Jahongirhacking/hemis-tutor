import Notifications from '@/components/Notifications';
import ExtraOptions from '@/pages/auth/ExtraOptions';
import StudentDetails from '@/pages/dashboard/students/components/StudentDetails';
import StudentPassport from '@/pages/dashboard/students/components/StudentPassport';
import { DrawerChildTypes } from '@/utils/config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

type IChildType = DrawerChildTypes | null;

export interface IDrawerProps {
  title?: string | 'ai';
  isOpen?: boolean;
  childType?: IChildType;
  props?: object;
}

const initialState: IDrawerProps = {
  title: '',
  isOpen: false,
  childType: null,
  props: {},
};

const drawerSlice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    onClose: () => {
      return initialState;
    },
    setDrawer: (state, action: PayloadAction<IDrawerProps>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const getChildElement = (childType: IChildType): ReactElement | null => {
  switch (childType) {
    case DrawerChildTypes.Notifications:
      return <Notifications />;
    case DrawerChildTypes.AuthExtraOptions:
      return <ExtraOptions />;
    case DrawerChildTypes.StudentDetails:
      return <StudentDetails />;
    case DrawerChildTypes.StudentPassport:
      return <StudentPassport />;
    default:
      return null;
  }
};

export const { onClose, setDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
