import IFile from './IFile';

export type ResourceKeyNames =
  | 'lecture'
  | 'practical'
  | 'lab'
  | 'seminar'
  | 'courseWork';

export default interface IResource {
  id: number;
  title: string;
  files: IFile[];
  type: ResourceKeyNames;
}
