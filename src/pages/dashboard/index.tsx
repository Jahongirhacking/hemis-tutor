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
import { Button, Modal } from 'antd';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import './main.scss';
import CustomInfo from './students/components/CustomInfo';

export interface IDashboardContext {
  isMobile: boolean;
  isNavbarActive: boolean;
  setIsNavbarActive: React.Dispatch<React.SetStateAction<boolean>>;
  deviceSize: number;
  toggleButtonRef: { current: HTMLButtonElement };
  toggleMenuButtonRef: { current: HTMLButtonElement };
}

export const DashboardContext = createContext<IDashboardContext>(null);
export const STUDENT_INFO_MODAL = "student-info-modal";
const MOBILE_SIZE = 670;

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCloseStudentModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(STUDENT_INFO_MODAL);
    setSearchParams(params);
  }

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
            <Outlet />
          </div>
          {isMobileNavBottom && <NavbarBottom />}

          <Modal
            footer={false}
            maskClosable
            onCancel={handleCloseStudentModal}
            open={searchParams.has(STUDENT_INFO_MODAL)}
            className='!min-w-[min(1400px,99%)] '
          >
            <CustomInfo.Student props={searchParams.get(STUDENT_INFO_MODAL)} />
          </Modal>
        </div>
      </div>
    </DashboardContext.Provider >
  );
};
