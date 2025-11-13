import { dashboardApi } from '@/services/dashboard';
import { ITaskList } from '@/services/dashboard/type';
import { IBaseDataRes } from '@/services/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuth {
  taskList: IBaseDataRes<ITaskList[]> | null;
}
const initialState: IAuth = {
  taskList: null,
};

const taskListSlice = createSlice({
  name: 'taskListSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      dashboardApi.endpoints.getTaskList.matchFulfilled,
      (state, action: PayloadAction<IBaseDataRes<ITaskList[]>>) => {
        state.taskList = action.payload;
      }
    );
  },
});

export default taskListSlice.reducer;
