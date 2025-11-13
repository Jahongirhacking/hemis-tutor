import { api } from '@/services/api';
import { rtkQueryErrorLogger } from '@/services/api/middlewares';
import { chatBaseApi } from '@/services/chat/chatBaseApi.ts';
import { storyBaseApi } from '@/services/stories/storyBaseApi.ts';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import currentTimeSlice from './slices/currentTimeSlice.ts';
import dashboardCardSlice from './slices/dashboardCardSlice.ts';
import drawerSlice from './slices/drawerSlice.tsx';
import taskListSlice from './slices/taskListSlice';
import themeSlice from './slices/themeSlice.ts';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [chatBaseApi.reducerPath]: chatBaseApi.reducer,
    [storyBaseApi.reducerPath]: storyBaseApi.reducer,
    themeSlice,
    authSlice,
    drawerSlice,
    taskListSlice,
    currentTimeSlice,
    dashboardCardSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      api.middleware,
      chatBaseApi.middleware,
      storyBaseApi.middleware,
      rtkQueryErrorLogger
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
