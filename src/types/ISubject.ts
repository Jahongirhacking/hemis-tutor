import { ITaskList } from '@/services/dashboard/type';
import IResource from './IResource';
import ITest from './ITest';

export default interface ISubject {
  name: string;
  type?: string;
  teacher?: string;
}

export interface ISubjectAttendance extends ISubject {
  para: number;
  hours: number;
  withReason: boolean;
}

export interface ISubjectExtended extends ISubject {
  totalHours: number;
  credits: number;
  isMandatory: boolean;
  numberOfAllTasks: number;
  numberOfTasksDone: number;
  resources: IResource[];
  tasks: ITaskList[];
  tests: ITest[];
}
