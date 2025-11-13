import { App as AntApp } from 'antd';
import { useSelector } from 'react-redux';
import { Router } from './router/routes';
import { RootState } from './store/store';

export function App() {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  return (
    <AntApp
      className={`${themeColor === 'dark' ? 'dark-theme' : 'light-theme'}`}
    >
      <Router />
    </AntApp>
  );
}
