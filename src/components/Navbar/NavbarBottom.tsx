import { UsefulIconSVG, UserIconSVG } from '@/assets/icon';
import { useParamActions } from '@/hooks/useParam';
import i18n from '@/i18n';
import { truncateString } from '@/utils/stringFunc';
import { Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import useNavbarList, { INavbarList } from './useNavbarList';

const NavbarBottom = () => {
  const { navbarList } = useNavbarList();
  const [usefulNav, setUsefulNav] = useState<INavbarList>();
  const [profileNav, setProfileNav] = useState<INavbarList>();
  const { t } = useTranslation();
  const { pathLocation } = useParamActions();

  useEffect(() => {
    setUsefulNav({
      title: t('const.useful'),
      icon: <UsefulIconSVG />,
      path: '/dashboard/useful-menus',
    });
    setProfileNav({
      title: t('const.profile'),
      icon: <UserIconSVG />,
      path: '/dashboard/profile-menus',
    });
  }, [i18n.language]);

  if (!navbarList || navbarList.length === 0) return null;

  const subjectsNav = navbarList[2];
  const timetableNav = navbarList[1];
  const dashboardNav = navbarList[0];

  const bottomNavs = [
    subjectsNav,
    timetableNav,
    dashboardNav,
    usefulNav,
    profileNav,
  ];

  return (
    <Flex className="bottom-nav" gap={10} align="center" justify="space-evenly">
      {/* Subjects */}
      {/* Check restricted university */}
      {bottomNavs.map(nav => (
        <NavLink
          key={`${nav.path}-${nav.title}`}
          to={nav?.path}
          className={
            (nav.path === dashboardNav.path &&
              pathLocation.pathname !== dashboardNav.path)
              ? 'inactive'
              : ''
          }
        >
          <Flex vertical gap={3} align="center">
            {nav?.icon}
            <Typography.Text>{truncateString(nav?.title, 12)}</Typography.Text>
          </Flex>
        </NavLink>
      ))}
    </Flex>
  );
};

export default NavbarBottom;
