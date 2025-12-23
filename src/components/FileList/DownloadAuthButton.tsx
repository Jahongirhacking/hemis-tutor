import { RootState } from '@/store/store';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

const DownloadAuthButton = ({
  href,
  filename,
  type = 'link',
  children,
  icon,
  style,
}: {
  href: string;
  filename: string;
  type?: 'link' | 'primary';
  children: string | ReactElement;
  icon?: ReactElement;
  style?: React.CSSProperties;
}) => {
  const token = useSelector((store: RootState) => store.authSlice?.access);
  const handleDownload = async () => {
    try {
      const response = await fetch(href, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Tarmoqdan kelgan natijada xatolik');
      }

      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      console.error("Ma'lumotni tashishda xatolik:", error);
    }
  };

  return (
    <Button type={type} onClick={handleDownload} style={style} icon={icon}>
      {children}
    </Button>
  );
};

export default DownloadAuthButton;
