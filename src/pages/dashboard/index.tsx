import { RightOutlinedSVG } from '@/assets/icon';
import { Navbar } from '@/components/Navbar/Navbar';
import NavbarBottom from '@/components/Navbar/NavbarBottom';
import { useAppDispatch } from '@/store/hooks';
import { setMobileNavBottom, setStateIsMobile } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Button, Flex } from 'antd';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import './main.scss';

export interface IDashboardContext {
  isMobile: boolean;
  isNavbarActive: boolean;
  setIsNavbarActive: React.Dispatch<React.SetStateAction<boolean>>;
  deviceSize: number;
  toggleButtonRef: { current: HTMLButtonElement };
  toggleMenuButtonRef: { current: HTMLButtonElement };
}

export const DashboardContext = createContext<IDashboardContext>(null);

export const Dashboard = () => {
  const MOBILE_SIZE = 670;
  const dispatch = useAppDispatch();
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );

  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(deviceSize < MOBILE_SIZE);
  const [isNavbarActive, setIsNavbarActive] = useState<boolean>(!isMobile);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const toggleMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle resize event (mobile)
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setDeviceSize(currentWidth);
      setIsMobile(currentWidth < MOBILE_SIZE);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle navbar
  useEffect(() => {
    dispatch(setStateIsMobile(isMobile));
    setIsNavbarActive(!isMobile);
    if (
      isMobile &&
      getLocalStorage(localStorageNames.isMobileNavBottom) === null
    ) {
      dispatch(setMobileNavBottom(true));
    }
  }, [isMobile]);

  // Storage functions
  useEffect(() => {
    const clearTemporaryTabs = () => {
      setLocalStorage(localStorageNames.temporaryTabs, {});
    };

    if (!getLocalStorage(localStorageNames.savedTabs)) {
      setLocalStorage(localStorageNames.savedTabs, {});
    }

    clearTemporaryTabs();
    window.addEventListener('beforeunload', clearTemporaryTabs);
    return () => {
      window.removeEventListener('beforeunload', clearTemporaryTabs);
    };
  }, []);

  // Desktop navbar toggle
  const onToggleNavbar = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsNavbarActive(prev => !prev);
  };

  return (
    <DashboardContext.Provider
      value={{
        isMobile,
        setIsNavbarActive,
        isNavbarActive,
        deviceSize,
        toggleButtonRef,
        toggleMenuButtonRef,
      }}
    >
      <div className="dashboard">
        <div
          className={`dashboard__navbar ${isNavbarActive ? 'active' : 'inactive'}`}
        >
          {!isMobileNavBottom && <Navbar />}

          {!isMobileNavBottom && !isMobile && (
            <Button
              ref={toggleButtonRef}
              shape="circle"
              icon={<RightOutlinedSVG />}
              className="nav__toggle-btn"
              onClick={onToggleNavbar}
            />
          )}
        </div>
        <div className={`dashboard__body`}>
          <DashboardHeader />
          <div className="dashboard__body--box">
            <Flex vertical>
              <Outlet />
            </Flex>
          </div>
          {isMobileNavBottom && <NavbarBottom />}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};
