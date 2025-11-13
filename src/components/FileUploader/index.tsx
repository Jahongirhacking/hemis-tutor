import { UploadIconSVG, UploadImageSVG } from '@/assets/icon';
import { IFile, ITaskList } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { getFileSize } from '@/utils/fileFunc';
import { LoadingOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Flex, message, Typography, Upload, UploadFile } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FileList from '../FileList';

const FileUploader = ({
  url,
  task,
  maxNumberOfFiles,
  maxSizeOfFile,
  submittable,
  extensions,
}: {
  url: string;
  task?: ITaskList;
  maxNumberOfFiles: number;
  maxSizeOfFile: number;
  submittable: boolean;
  extensions: string[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>(
    task?.studentTaskActivities[0]?.files
  );
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [attemptCount, setAttemptCount] = useState<number>(task?.attempt_count);
  const [isLoading, setIsLoading] = useState(false);
  const now = useSelector((store: RootState) => store.currentTimeSlice);
  const token = useSelector((store: RootState) => store.authSlice?.access);
  const { t } = useTranslation();

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > maxNumberOfFiles) {
      message.error(
        `${t('components.message.max_number_of_files_warning_text')}: ${maxNumberOfFiles}`
      );
      return;
    }
    if (fileList.find(file => file.size > maxSizeOfFile)) {
      message.error(
        `${t('components.message.max_size_of_files_warning_text')}: ${getFileSize(maxSizeOfFile)}`
      );
      return;
    }
    if (
      fileList.find(file => {
        const nameArr = file.name.split('.');
        return !extensions.includes(nameArr[nameArr.length - 1]);
      })
    ) {
      message.warning(
        t('components.message.extensions_warning_text', {
          extensions: extensions.join(', '),
        })
      );
      return;
    }

    setUploadedFiles(fileList);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    uploadedFiles.forEach(file =>
      formData.append('filename[]', file.originFileObj, file.name)
    );
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      message.success(t('components.message.upload_files_success_text'));
      setFiles(response?.data?.data?.files);
      setUploadedFiles([]);
      setAttemptCount(prev => {
        const count = prev + 1;
        if (count === task?.attempt_limit)
          message.warning(
            t('components.message.number_of_attempts_warning_text')
          );
        return count;
      });
    } catch (err) {
      message.error(t('components.message.error_on_file_upload_text'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FileList
        files={(uploadedFiles.length ? uploadedFiles : files) as IFile[]}
      />
      {submittable &&
        now < task?.deadline &&
        attemptCount < task?.attempt_limit &&
        (uploadedFiles.length === 0 ? (
          <Flex vertical align="center" gap={16} style={{ marginTop: '20px' }}>
            <Upload
              multiple
              beforeUpload={() => false}
              onChange={handleChange}
              fileList={uploadedFiles}
              showUploadList={false}
            >
              <UploadImageSVG />
            </Upload>
            <Flex vertical style={{ marginTop: '8px', textAlign: 'center' }}>
              <Typography.Text style={{ fontSize: '12px' }}>
                {t('components.file_uploader.max_size_of_files_text')}:{' '}
                <strong>{getFileSize(maxSizeOfFile)}</strong>
              </Typography.Text>
              <Typography.Text style={{ fontSize: '12px' }}>
                {t('components.file_uploader.max_number_of_files_text')}:{' '}
                <strong>{maxNumberOfFiles}</strong>
              </Typography.Text>
              <Typography.Text style={{ fontSize: '12px' }}>
                {t('components.file_uploader.max_size_of_overall_text')}:{' '}
                <strong>{getFileSize(maxNumberOfFiles * maxSizeOfFile)}</strong>
              </Typography.Text>
            </Flex>
            <Upload
              multiple
              beforeUpload={() => false}
              onChange={handleChange}
              fileList={uploadedFiles}
              showUploadList={false}
            >
              <Button type="primary" icon={<UploadIconSVG />}>
                {`${t('components.file_uploader.upload_file_text')} (${task?.attempt_limit - attemptCount})`}
              </Button>
            </Upload>
          </Flex>
        ) : (
          <Flex vertical gap={10} style={{ marginTop: '10px' }}>
            <Button
              disabled={isLoading}
              type="primary"
              onClick={handleSubmit}
              icon={isLoading ? <LoadingOutlined /> : <UploadIconSVG />}
            >
              {t('const.send')}
            </Button>
            <Button
              onClick={() => setUploadedFiles([])}
              icon={<StopOutlined />}
            >
              {t('const.cancel')}
            </Button>
          </Flex>
        ))}
    </>
  );
};

export default FileUploader;
