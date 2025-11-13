export interface IBaseDataRes<TData> {
  code: number;
  error: null;
  success: boolean;
  data: TData;
}

export interface IBaseDataEdu<TData> {
  message: string;
  object: TData;
  statusCode: number;
  timeStamp: string;
}

export interface IBaseDataUniLib<TData> {
  result: {
    current_page: number;
    data: TData;
    from: number;
    last_page: number;
    per_page: string;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

export interface IUniversity {
  code: string;
  name: string;
  api_url: string;
  student_url: string;
  employee_url: string;
}

export interface IOverallScore {
  grade: number;
  max_ball: number;
  percent: number;
  label?: string;
  examType?: {
    name: string;
  };
}

export type ILangParam = 'uz' | 'en' | 'ru';
