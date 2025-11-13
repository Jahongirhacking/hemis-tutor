import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = moment().unix();

const currentTimeSlice = createSlice({
  name: 'current-time',
  initialState,
  reducers: {
    setCurrentTime: () => {
      return moment().unix();
    },
  },
});

export const { setCurrentTime } = currentTimeSlice.actions;

export default currentTimeSlice.reducer;
