import { LoadingOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DownloadRegularButton = ({
  href,
  filename,
  type = 'link',
  children,
  mimeType = 'application/pdf',
  icon,
  loadingText = 'Yuklab olinmoqda',
  style,
}: {
  href: string;
  filename: string;
  type?: 'link' | 'primary';
  children: string | ReactElement;
  mimeType?: string;
  icon?: ReactElement;
  loadingText?: string;
  style?: React.CSSProperties;
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      // Make a GET request with `responseType` set to `blob` to handle binary data
      const response = await axios.get(href, { responseType: 'blob' });

      // Create a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: mimeType });

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      // Programmatically click the link to trigger the download
      link.click();
      // Clean up the URL and remove the link element
      URL.revokeObjectURL(pdfUrl);
      document.body.removeChild(link);
    } catch (error) {
      message.warning(t('components.message.error_on_file_download_text'));
      console.error(t('components.message.error_on_file_download_text'), error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type={type}
      onClick={handleDownload}
      style={style}
      icon={isLoading ? <LoadingOutlined /> : icon}
      disabled={isLoading}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default DownloadRegularButton;
