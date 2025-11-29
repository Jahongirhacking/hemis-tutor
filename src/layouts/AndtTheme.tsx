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
          colorInfo: '#14b8a6',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          borderRadius: 12,
          fontFamily:
            'Onest, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 40,
            fontSize: 15,
            fontWeight: 500,
            primaryShadow: '0 2px 0 rgba(20, 184, 166, 0.1)',
          },
          Card: {
            borderRadiusLG: 16,
            boxShadowTertiary:
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          },
          Input: {
            borderRadius: 10,
            controlHeight: 40,
          },
          Select: {
            borderRadius: 10,
            controlHeight: 40,
          },
          Table: {
            borderRadius: 12,
            headerBg: themeColor === 'dark' ? '#1f2937' : '#f9fafb',
          },
          Tabs: {
            borderRadius: 10,
          },
          Tag: {
            borderRadiusSM: 8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntConfigProvider;
