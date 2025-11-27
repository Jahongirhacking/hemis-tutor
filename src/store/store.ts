import { api } from '@/services/api';
import { rtkQueryErrorLogger } from '@/services/api/middlewares';
import { publicApi } from '@/services/api/public';
import { statApi } from '@/services/api/statApi.ts';
import { storyBaseApi } from '@/services/stories/storyBaseApi.ts';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import drawerSlice from './slices/drawerSlice.tsx';
import themeSlice from './slices/themeSlice.ts';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [statApi.reducerPath]: statApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [storyBaseApi.reducerPath]: storyBaseApi.reducer,
    themeSlice,
    authSlice,
    drawerSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      api.middleware,
      storyBaseApi.middleware,
      statApi.middleware,
      publicApi.middleware,
      rtkQueryErrorLogger
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
