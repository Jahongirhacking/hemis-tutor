import { getFileIcon, getFileSize } from '@/utils/fileFunc';
import { Button, Empty, List } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface IFile {
  url: string;
  name: string;
  size?: number;
  description?: string;
}

const FileList = ({
  files,
  showEmpty = true,
  className = '',
}: {
  files: IFile[];
  showEmpty?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();

  if (files?.length === 0 && !showEmpty) return null;

  return (
    <List
      className={`file-list ${className}`}
      itemLayout="horizontal"
      dataSource={files}
      locale={{
        emptyText: (
          <Empty description={`${t('const.file')} ${t('const.not_found')}`} />
        ),
      }}
      renderItem={file => (
        <List.Item
          actions={[
            <Button
              type="link"
              target="_blank"
              href={file.url}
              download
              style={{ textDecoration: 'underline' }}
            >
              {t('components.file_list.download_text')}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={getFileIcon(file?.name)}
            title={file?.name}
            description={
              file?.size ? getFileSize(file?.size) : file?.description || 'fayl'
            }
          />
        </List.Item>
      )}
    />
  );
};

export default FileList;
