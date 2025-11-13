import { Navigate, type RouteObject } from 'react-router-dom';

import CallbackPage from '@/pages/auth/Callback';
import CancelPasswordPage from '@/pages/auth/CancelPassword';
import LoginPage from '@/pages/auth/Login';
import RootLayout from '@/pages/auth/RootLayout';
import StatisticsDashboard from '@/pages/auth/StatisticsDashboard';
import HelpPage from '@/pages/dashboard/help/HelpPage';
import { paths } from '../paths';

export const publicRoutes: RouteObject[] = [
  {
    path: paths.base,
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: paths.login,
        element: <Navigate to={paths.base} />,
      },
      {
        path: paths.cancelPassword,
        element: <CancelPasswordPage />,
      },
      {
        path: paths.help,
        element: <HelpPage />,
      },
      {
        path: paths.callback,
        element: <CallbackPage />,
      },
    ],
  },
  {
    path: paths.statisticsDashboard,
    element: <StatisticsDashboard />,
  },
];
