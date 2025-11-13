import { App as AntApp } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from './router/routes';
import { setCurrentTime } from './store/slices/currentTimeSlice';
import { RootState } from './store/store';

export function App() {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(setCurrentTime());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <AntApp
      className={`${themeColor === 'dark' ? 'dark-theme' : 'light-theme'}`}
    >
      <Router />
    </AntApp>
  );
}
