import { type RouteObject } from 'react-router-dom';

import CallbackPage from '@/pages/auth/Callback';
import CancelPasswordPage from '@/pages/auth/CancelPassword';
import AnimatedLanding from '@/pages/auth/Landing/AnimatedLanding';
import LoginPage from '@/pages/auth/Login';
import RootLayout from '@/pages/auth/RootLayout';
import HelpPage from '@/pages/dashboard/help/HelpPage';
import { paths } from '../paths';

export const publicRoutes: RouteObject[] = [
  {
    path: paths.base,
    element: <AnimatedLanding />,
  },
  {
    path: paths.base,
    element: <RootLayout />,
    children: [
      {
        path: paths.login,
        element: <LoginPage />,
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
];
