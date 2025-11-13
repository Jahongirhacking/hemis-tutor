import AppropriationInDrawer from '@/components/Appropriation/AppropriationInDrawer';
import AttendanceDetailInDrawer from '@/components/Attendance/AttendanceDetailInDrawer';
import AttendanceInDrawer from '@/components/Attendance/AttendanceInDrawer';
import BookResourceInDrawer from '@/components/Books/BookResourceInDrawer';
import JournalInDrawer from '@/components/Books/JournalInDrawer';
import Notifications from '@/components/Notifications';
import ResourceInDrawer from '@/components/Resource/ResourceInDrawer';
import ScheduleInDrawer from '@/components/Schedule/ScheduleInDrawer';
import TaskInDrawer from '@/components/Task/TaskInDrawer';
import ExtraOptions from '@/pages/auth/ExtraOptions';
import AiChat from '@/pages/dashboard/AiChat';
import GpaDetailsInDrawer from '@/pages/dashboard/EduPlan/_GpaScore/GpaDetailsInDrawer';
import SubjectInfoInDrawer from '@/pages/dashboard/EduPlan/components/SubjectInfoInDrawer';
import GpaCalculator from '@/pages/dashboard/GPA/GpaCalculator';
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
    case DrawerChildTypes.Task:
      return <TaskInDrawer />;
    case DrawerChildTypes.Attendance:
      return <AttendanceInDrawer />;
    case DrawerChildTypes.AttendanceDetail:
      return <AttendanceDetailInDrawer />;
    case DrawerChildTypes.Schedule:
      return <ScheduleInDrawer />;
    case DrawerChildTypes.Notifications:
      return <Notifications />;
    case DrawerChildTypes.AuthExtraOptions:
      return <ExtraOptions />;
    case DrawerChildTypes.Resource:
      return <ResourceInDrawer />;
    case DrawerChildTypes.SubjectInfo:
      return <SubjectInfoInDrawer />;
    case DrawerChildTypes.Appropriation:
      return <AppropriationInDrawer />;
    case DrawerChildTypes.BookResource:
      return <BookResourceInDrawer />;
    case DrawerChildTypes.JournalResource:
      return <JournalInDrawer />;
    case DrawerChildTypes.GpaDetail:
      return <GpaDetailsInDrawer />;
    case DrawerChildTypes.AiChat:
      return <AiChat />;
    case DrawerChildTypes.GpaCalculator:
      return <GpaCalculator />;
    default:
      return null;
  }
};

export const { onClose, setDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
