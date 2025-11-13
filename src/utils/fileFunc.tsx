import {
  FileExcelIcon,
  FileImageIcon,
  FileOtherIcon,
  FilePdfIcon,
  FilePowerpointIcon,
  FileTextIcon,
  FileWordIcon,
} from '@/assets/icon';

export type IFileExtensionName =
  | 'doc'
  | 'docx'
  | 'ppt'
  | 'pptx'
  | 'xls'
  | 'xlsx'
  | 'pdf'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'txt';

export const getFileIcon = (name: string) => {
  switch (getFileExtensionName(name)) {
    case 'doc':
    case 'docx':
      return <img src={FileWordIcon} alt="word fayl" />;
    case 'ppt':
    case 'pptx':
      return <img src={FilePowerpointIcon} alt="powerpoint fayl" />;
    case 'xls':
    case 'xlsx':
      return <img src={FileExcelIcon} alt="excel fayl" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <img src={FileImageIcon} alt="rasm fayl" />;
    case 'txt':
      return <img src={FileTextIcon} alt="text fayl" />;
    case 'pdf':
      return <img src={FilePdfIcon} alt="pdf fayl" />;
    default:
      return <img src={FileOtherIcon} alt="boshqa fayl" />;
  }
};

export const getFileSize = (sizeInBytes: number) => {
  const sizeNames = ['B', 'KB', 'MB', 'GB'];
  let count = 0;
  while (sizeInBytes >= 1024) {
    sizeInBytes /= 1024;
    count += 1;
  }
  return `${Math.ceil(sizeInBytes)} ${sizeNames[Math.min(count, sizeNames.length - 1)]}`;
};

export const getFileExtensionName = (name: string): IFileExtensionName => {
  const arr = name.split('.');
  return arr[arr.length - 1] as IFileExtensionName;
};
