import { RootState } from '@/store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { paths } from './paths';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(
    (store: RootState) => store.authSlice?.access
  );

  if (!isAuthenticated) {
    return <Navigate to={paths.base} replace />;
  }

  return children;
}
