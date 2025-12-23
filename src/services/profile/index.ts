import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IGroup, IPagination, IPaginationProps } from '../student/type';
import { IBaseDataRes } from '../type';
import {
  ICreateTaskReq,
  IDashboardStatisticsRes,
  IGetGroupReq,
  IGetGroupRes,
  IGetProfileRes,
  ITask,
  ITaskDetailRes,
  IUpdateProfileReq,
  IUpdateProfileRes,
  TaskStatus,
} from './type';

export const profileApi = api.injectEndpoints({
  endpoints: build => ({
    getGroups: build.query<IBaseDataRes<IGetGroupRes>, IGetGroupReq>({
      query: params => ({
        url: `${getBaseUrl('/profile/groups')}`,
        params,
      }),
    }),

    getProfile: build.query<IBaseDataRes<IGetProfileRes>, void>({
      query: () => ({
        url: `${getBaseUrl('/profile/index')}`,
      }),
      providesTags: ['profile'],
    }),

    updateProfile: build.mutation<
      IBaseDataRes<IUpdateProfileRes>,
      IUpdateProfileReq
    >({
      query: body => ({
        url: `${getBaseUrl('/profile/update')}`,
        body,
      }),
      invalidatesTags: ['profile'],
    }),

    getDashboardStatistics: build.query<
      IBaseDataRes<IDashboardStatisticsRes>,
      {
        education_year?: string;
        semester?: string;
        group_id?: IGroup['id'];
        expand: string;
      }
    >({
      query: params => ({
        url: `${getBaseUrl('/statistics/dashboard')}`,
        params,
      }),
    }),

    // tasks
    createTask: build.mutation<void, ICreateTaskReq>({
      query: body => ({
        url: `${getBaseUrl('/task/create')}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['tasks'],
    }),

    getTaskDetail: build.query<
      IBaseDataRes<ITaskDetailRes>,
      { id: ITask['id'] }
    >({
      query: params => ({
        url: getBaseUrl(`/task/detail`),
        params,
      }),
      providesTags: (_, __, { id }) => [{ type: 'tasks', id }],
    }),

    uploadTaskFile: build.mutation<IBaseDataRes<{ file: object }>, FormData>({
      query: body => ({
        url: `${getBaseUrl('/task/file-upload')}`,
        body,
        method: 'POST',
      }),
    }),

    getTaskList: build.query<
      IBaseDataRes<{ tasks: ITask[]; pagination: IPagination }>,
      Partial<Omit<IPaginationProps, 'search'>> & {
        status?: TaskStatus;
        from_date: string;
        to_date: string;
        date_type: 'created_at' | 'due_at';
      }
    >({
      query: params => ({
        url: getBaseUrl(`/task/list`),
        params,
      }),
      providesTags: ['tasks'],
    }),

    updateTask: build.mutation<
      void,
      {
        id: ITask['id'];
        result_note?: string;
        status?: TaskStatus;
        file?: object;
      }
    >({
      query: body => ({
        url: getBaseUrl('/task/update'),
        body,
        method: 'POST',
      }),
      invalidatesTags: (_, __, { status }) => {
        if (status) {
          return ['tasks'];
        }
      },
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetDashboardStatisticsQuery,
  useCreateTaskMutation,
  useGetTaskDetailQuery,
  useGetTaskListQuery,
  useUploadTaskFileMutation,
  useUpdateTaskMutation,
} = profileApi;
