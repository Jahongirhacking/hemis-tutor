import { IBaseLabel, IBaseName, IFaculty, ISemester } from '../dashboard/type';

export interface IDecree {
  id: number;
  number: string;
  name: string;
  department: IFaculty;
  decreeType: IBaseName;
  file: string;
  date: number;
}

export interface IReference {
  id: number;
  reference_number: string;
  department: IFaculty;
  semester: ISemester;
  level: IBaseName;
  file: string;
  reference_date: number;
}

export interface IDocument {
  type: string;
  id: number;
  name: string;
  attributes: IBaseLabel[];
  file: string;
}

export interface ICertificate {
  id: number;
  _student: number;
  ser_number: string;
  date_of_issue: number;
  valid_until: number;
  active: boolean;
  created_at: number;
  certificateName: {
    code: string;
    name: string;
  };
  certificateType: {
    code: string;
    name: string;
  };
  certificateGrade: {
    code: string;
    name: string;
  };
  certificateSubject: {
    code: string;
    name: string;
  };
}
