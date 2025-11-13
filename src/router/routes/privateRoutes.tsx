import { type RouteObject } from 'react-router-dom';

import NotFound from '@/components/NotFound';
import { Dashboard } from '@/pages/dashboard';
import { AttendancePage } from '@/pages/dashboard/Attendance/Attendance';
import { DashboardPage } from '@/pages/dashboard/Dashboard/DashboardPage';
import { DocumentsPage } from '@/pages/dashboard/Documents/Documents';
import { EduPlanPage } from '@/pages/dashboard/EduPlan/EduPlan';
import ExamsPage from '@/pages/dashboard/Exams';
import ExamDetails from '@/pages/dashboard/Exams/ExamDetails';
import HelpPage from '@/pages/dashboard/Help/HelpPage';
import LibraryPage from '@/pages/dashboard/Library/Library';
import { PaymentPage } from '@/pages/dashboard/Payment/Payment';
import ProfilePage from '@/pages/dashboard/Profile/Profile';
import { ReEducationPage } from '@/pages/dashboard/ReEducation/ReEducation';
import Restricted from '@/pages/dashboard/Restricted';
import SettingsPage from '@/pages/dashboard/Settings/Settings';
import SubjectDetailPage from '@/pages/dashboard/Subjects/SubjectDetailPage';
import { SubjectsPage } from '@/pages/dashboard/Subjects/Subjects';
import SubMenus from '@/pages/dashboard/SubMenus';
import ProfileMenus from '@/pages/dashboard/SubMenus/ProfileMenus';
import UsefulMenus from '@/pages/dashboard/SubMenus/UsefulMenus';
import { TimeTablePage } from '@/pages/dashboard/TimeTable/TimeTablePage';

export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'timetable',
        element: <TimeTablePage />,
      },
      {
        path: 'subjects',
        element: <SubjectsPage />,
      },
      {
        path: 'subjects/:subjectId',
        element: <SubjectDetailPage />,
      },
      {
        path: 'eduplan',
        element: <EduPlanPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'exams',
        element: <ExamsPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'reeducation',
        element: <ReEducationPage />,
      },
      {
        path: 'folders',
        element: <DocumentsPage />,
      },
      {
        path: 'library',
        element: <LibraryPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
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
    ],
  },
  {
    path: '/exams/:id',
    element: <ExamDetails />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
