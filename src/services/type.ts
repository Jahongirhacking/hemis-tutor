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
