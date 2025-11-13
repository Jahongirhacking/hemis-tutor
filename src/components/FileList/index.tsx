import { IFile } from '@/services/dashboard/type';
import { getFileIcon, getFileSize } from '@/utils/fileFunc';
import { Button, Empty, List } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';

const FileList = ({ files }: { files: IFile[] }) => {
  const { t } = useTranslation();

  return (
    <List
      className="file-list"
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
            avatar={getFileIcon(file.name)}
            title={file.name}
            description={getFileSize(file.size)}
          />
        </List.Item>
      )}
    />
  );
};

export default FileList;
