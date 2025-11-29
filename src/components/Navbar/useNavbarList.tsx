import {
  AppropriationIconSVG,
  CalendarIconSVG,
  DocumentIconSVG,
  LogOutIconSVG,
  MoneyIconSVG,
  PlanIconSVG,
  SearchIconSVG,
  SettingIconSVG,
  StatisticsIconSVG,
  StudentIconSVG,
} from '@/assets/icon';
import { paths } from '@/router/paths';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface INavbarList {
  title: string;
  icon: ReactElement;
  path?: string;
  isPrivatePath?: boolean;
}

const useNavbarList = () => {
  const [navbarList, setNavbarList] = useState<INavbarList[]>([]);
  const [navbarBottom, setNavbarBottom] = useState<INavbarList[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setNavbarList([
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[9],
        icon: <StatisticsIconSVG />,
        path: paths.private.statistics,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[0],
        icon: <StudentIconSVG />,
        path: paths.private.students,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[1],
        icon: <CalendarIconSVG />,
        path: paths.private.learningProcess,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[2],
        icon: <PlanIconSVG />,
        path: paths.private.attendance,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[3],
        icon: <AppropriationIconSVG />,
        path: paths.private.performance,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[4],
        icon: <MoneyIconSVG />,
        path: paths.private.financial,
        isPrivatePath: true,
      },
      // {
      //   title: (
      //     t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
      //   )[5],
      //   icon: <BookIconSVG />,
      //   path: paths.private.externalService,
      // },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[7],
        icon: <SearchIconSVG />,
        path: paths.private.checkAddress,
        isPrivatePath: true,
      },
      {
        title: (
          t('dashboard.navbar.navbarList', { returnObjects: true }) as string[]
        )[8],
        icon: <DocumentIconSVG />,
        path: paths.private.messages,
        isPrivatePath: false,
      },
    ]);

    setNavbarBottom([
      {
        title: (
          t('dashboard.navbar.navbarBottom', {
            returnObjects: true,
          }) as string[]
        )[0],
        icon: <SettingIconSVG />,
        path: '/dashboard/settings',
        isPrivatePath: false,
      },
      {
        title: (
          t('dashboard.navbar.navbarBottom', {
            returnObjects: true,
          }) as string[]
        )[2],
        icon: <LogOutIconSVG />,
        path: '/',
        isPrivatePath: false,
      },
    ]);
  }, [i18n.language]);

  return { navbarList, navbarBottom };
};

export default useNavbarList;
