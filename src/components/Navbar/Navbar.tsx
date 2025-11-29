import { Link } from 'react-router-dom';
import './navbar.scss';

import { useParamActions } from '@/hooks/useParam';
import { DashboardContext } from '@/pages/dashboard';
import { useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/store/slices/authSlice';
import { Flex } from 'antd';
import { useContext, useEffect, useRef } from 'react';
import TutorLogo from '../TutorLogo';
import useNavbarList from './useNavbarList';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { navigate, pathLocation } = useParamActions();
  const { isMobile, setIsNavbarActive, toggleButtonRef, toggleMenuButtonRef } =
    useContext(DashboardContext);
  const navbarRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(isMobile);
  const { navbarBottom, navbarList } = useNavbarList();

  const handleClickOutside = (event?: MouseEvent) => {
    event.stopPropagation();
    if (
      isMobileRef.current &&
      navbarRef?.current &&
      event &&
      !navbarRef?.current?.contains(event?.target as Node) &&
      !toggleButtonRef.current?.contains(event.target as Node) &&
      !toggleMenuButtonRef.current?.contains(event.target as Node)
    ) {
      setIsNavbarActive(false);
    }
  };

  const handleClickNavItem = (path: string) => {
    if (isMobile) {
      setIsNavbarActive(false);
    }
    navigate(path);
  };

  const handleClickSubItem = ({ path }: { path: string; index: number }) => {
    if (isMobile) {
      setIsNavbarActive(false);
    }
    if (path === '/') {
      dispatch(logoutThunk());
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" ref={navbarRef}>
      <Link
        to={'./'}
        className="flex-center"
        onClick={() => {
          isMobile && setIsNavbarActive(false);
        }}
      >
        <TutorLogo className="big-logo" />

        <TutorLogo.Small className="small-logo" />
      </Link>

      <div className="navbar__list">
        {navbarList.map(item => (
          <Flex
            className={`navbar__item ${
              pathLocation.pathname == item.path ? 'navbar__item-active' : ''
            }`}
            gap={8}
            key={item.title}
            // check restricted university click
            onClick={() => handleClickNavItem(item.path)}
          >
            {/* check restricted university icon */}
            {item.icon} <h3>{item.title}</h3>
          </Flex>
        ))}
      </div>

      <div className="navbar__bottom">
        {navbarBottom.map((item, index) => (
          <Flex
            className={`navbar__item ${pathLocation.pathname == item.path ? 'navbar__item-active' : ''}`}
            gap={8}
            key={item.title}
            onClick={() => handleClickSubItem({ path: item?.path, index })}
          >
            {item.icon} <h3>{item.title}</h3>
          </Flex>
        ))}
      </div>
    </div>
  );
};
