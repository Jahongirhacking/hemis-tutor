import { api } from '../api';
import { getBaseUrl } from '../api/const';
import { ISemester } from '../dashboard/type';
import { IBaseDataRes } from '../type';
import { IExam, IExamAnswer, IExamResult, IStartExamRes } from './type';

export const examApi = api.injectEndpoints({
  endpoints: build => ({
    getExamsList: build.query<
      IBaseDataRes<IExam[]>,
      { semester?: ISemester['code'] }
    >({
      query: params => ({
        url: getBaseUrl(`/exam/list`),
        params,
      }),
      providesTags: ['exams-list'],
    }),

    startExam: build.mutation<
      IBaseDataRes<IStartExamRes>,
      { exam: IExam['id']; device_id: string }
    >({
      query: body => ({
        url: getBaseUrl(`/exam/start`),
        method: 'POST',
        body,
      }),
    }),

    answerExam: build.mutation<
      IBaseDataRes<IExamAnswer>,
      {
        exam: number;
        question: number;
        option: number | number[];
        selected: boolean;
        device_id: string;
      }
    >({
      query: body => ({
        url: `/exam/answer`,
        method: 'POST',
        body,
      }),
    }),

    finishExam: build.mutation<
      IBaseDataRes<IExamResult>,
      { exam: IExam['id']; device_id: string }
    >({
      query: body => ({
        url: `/exam/finish`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetExamsListQuery,
  useStartExamMutation,
  useAnswerExamMutation,
  useFinishExamMutation,
} = examApi;
