import IFile from './IFile';
import ISubject from './ISubject';

export default interface ITask {
  type: string;
  subject: ISubject;
  status: ITaskStatus;
  deadline: Date;
  score: {
    max: number;
    individual: number;
  };
  comment: string;
  files: IFile[];
}

export type ITaskStatus =
  | 'Topshirdi'
  | 'Muddati tugagan'
  | 'Berildi'
  | 'Tezroq topshiring'
  | 'Baholandi';
