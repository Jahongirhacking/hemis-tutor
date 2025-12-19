import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { IGroup, IPagination, IPaginationProps } from '../student/type';
import { IBaseDataRes } from '../type';
import {
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
    createTask: build.mutation<
      void,
      {
        title: string;
        description: string;
        due_at: string;
        priority: string;
      }
    >({
      query: body => ({
        url: `${getBaseUrl('/task/create')}`,
        body,
      }),
      invalidatesTags: ['tasks'],
    }),

    getTaskDetail: build.query<
      IBaseDataRes<ITaskDetailRes>,
      { id: ITask['id'] }
    >({
      query: params => ({
        url: `/task/detail`,
        params,
      }),
    }),

    uploadTaskFile: build.mutation<void, FormData>({
      query: body => ({
        url: `${getBaseUrl('/task/file-upload')}`,
        body,
      }),
    }),

    getTaskList: build.query<
      IBaseDataRes<{ tasks: ITask[]; pagination: IPagination }>,
      Omit<IPaginationProps, 'search'> & { status: TaskStatus }
    >({
      query: params => ({
        url: `/task/list`,
        params,
      }),
      providesTags: ['tasks'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetDashboardStatisticsQuery,
} = profileApi;
