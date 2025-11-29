import { RootState } from '@/store/store';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';

export interface ProviderProps {
  children: JSX.Element;
}

function AntConfigProvider({ children }: ProviderProps) {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeColor === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntConfigProvider;
