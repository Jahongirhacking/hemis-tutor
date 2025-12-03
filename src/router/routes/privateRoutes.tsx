import { Navigate, type RouteObject } from 'react-router-dom';

import NotFound from '@/components/NotFound';
import { Dashboard } from '@/pages/dashboard';
import AttendancePage from '@/pages/dashboard/attendance';
import CheckAddressPage from '@/pages/dashboard/check-address';
import ExternalServicePage from '@/pages/dashboard/external-service';
import FinancialPage from '@/pages/dashboard/financial';
import HelpPage from '@/pages/dashboard/help/HelpPage';
import LearningProcessPage from '@/pages/dashboard/learning-process';
import MessagesPage from '@/pages/dashboard/messages';
import PerformancePage from '@/pages/dashboard/performance';
import Restricted from '@/pages/dashboard/restricted';
import SettingsPage from '@/pages/dashboard/settings/Settings';
import DashboardPage from '@/pages/dashboard/statistics/DashboardPage';
import StudentsPage from '@/pages/dashboard/students';
import SubMenus from '@/pages/dashboard/submenu';
import ProfileMenus from '@/pages/dashboard/submenu/ProfileMenus';
import UsefulMenus from '@/pages/dashboard/submenu/UsefulMenus';
import TodoPage from '@/pages/dashboard/todo/TodoPage';
import { paths } from '../paths';

export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard',
        element: <Navigate to={paths.private.statistics} />,
      },
      {
        path: paths.private.statistics, // New dashboard route
        element: <DashboardPage />,
      },
      {
        path: paths.private.students,
        element: <StudentsPage />,
      },
      {
        path: paths.private.learningProcess,
        element: <LearningProcessPage />,
      },
      {
        path: paths.private.attendance,
        element: <AttendancePage />,
      },
      {
        path: paths.private.performance,
        element: <PerformancePage />,
      },
      {
        path: paths.private.financial,
        element: <FinancialPage />,
      },
      {
        path: paths.private.externalService,
        element: <ExternalServicePage />,
      },
      {
        path: paths.private.checkAddress,
        element: <CheckAddressPage />,
      },
      {
        path: paths.private.messages,
        element: <MessagesPage />,
      },
      {
        path: paths.private.settings,
        element: <SettingsPage />,
      },
      {
        path: paths.private.todo,
        element: <TodoPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
      {
        path: 'useful-menus',
        element: (
          <SubMenus titleCode="const.useful">
            <UsefulMenus />
          </SubMenus>
        ),
      },
      {
        path: 'profile-menus',
        element: (
          <SubMenus titleCode="const.profile">
            <ProfileMenus />
          </SubMenus>
        ),
      },
      {
        path: 'restricted',
        element: <Restricted />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
