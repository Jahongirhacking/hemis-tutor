import { RightOutlinedSVG } from '@/assets/icon';
import Loading from '@/components/Common/Loading';
import { Navbar } from '@/components/Navbar/Navbar';
import NavbarBottom from '@/components/Navbar/NavbarBottom';
import useNavbarList from '@/components/Navbar/useNavbarList';
import {
  useGetAllAttendeanceMutation,
  useGetProfileMutation,
  useGetSemestrMutation,
} from '@/services/users';
import { useAppDispatch } from '@/store/hooks';
import {
  logoutThunk,
  setCurrentSemester,
  setMobileNavBottom,
  setStateIsMobile,
} from '@/store/slices/authSlice';
import { toggleThemeColor } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Flex, message,
  Modal,
  Select,
  Spin,
  Switch,
  Tooltip,
  Typography
} from 'antd';
import { t } from 'i18next';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import './main.scss';

interface IDashboardContext {
  isMobile: boolean;
  isNavbarActive: boolean;
  setIsNavbarActive: React.Dispatch<React.SetStateAction<boolean>>;
  deviceSize: number;
  toggleButtonRef: { current: HTMLButtonElement };
  toggleMenuButtonRef: { current: HTMLButtonElement };
}

interface ISemesterSelectProp {
  label: string;
  value: string;
}

export const DashboardContext = createContext<IDashboardContext>(null);

export const Dashboard = () => {
  const MOBILE_SIZE = 670;
  const location = useLocation();
  const navigate = useNavigate();
  const pathNames = location.pathname.split('/').filter(name => name);
  const dispatch = useAppDispatch();
  const semestrs = useSelector((store: RootState) => store.authSlice?.semestrs);
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const profile = useSelector((store: RootState) => store.authSlice?.profile);
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);
  const currentSemesterRef = useRef(currentSemester);

  const [getProfile, { error }] = useGetProfileMutation();
  const [getSemestr] = useGetSemestrMutation();
  const [getAttendance] = useGetAllAttendeanceMutation();
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(deviceSize < MOBILE_SIZE);
  const [isNavbarActive, setIsNavbarActive] = useState<boolean>(!isMobile);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const toggleMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSemester, setActiveSemester] =
    useState<ISemesterSelectProp | null>(null);
  const { navbarList } = useNavbarList();
  const [isLoading, setIsLoading] = useState(true);
  const [noResponseFromServer, setNoResponseFromServer] = useState(false);

  const onSemesterChange = (semester: ISemesterSelectProp) => {
    setActiveSemester(semester);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorRes: any = error;

  // Expired token
  useEffect(() => {
    if (errorRes?.status === 403) {
      navigate('/');
      dispatch(logoutThunk());
      message.warning(t('dashboard.expired_token_text'));
    }
  }, [dispatch, errorRes, navigate]);

  // Fetch data
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    getSemestr();
  }, [getSemestr]);

  useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  useEffect(() => {
    currentSemesterRef.current = currentSemester;
  }, [currentSemester]);

  // Loading card
  // Set semester
  useEffect(() => {
    // if no response from server
    const intervalId = setInterval(() => {
      if (!currentSemesterRef.current) {
        setNoResponseFromServer(true);
      }
    }, 15000);
    if (!currentSemester) return;

    // if response come
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setNoResponseFromServer(false);
    }

    setActiveSemester({
      label: currentSemester?.name,
      value: currentSemester?.code,
    });

    clearInterval(intervalId);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentSemester]);

  // no response
  useEffect(() => {
    if (noResponseFromServer) {
      Modal.warning({
        title: t('off_topic.no_response_server_title'),
        content: t('off_topic.no_response_server_content'),
        onCancel() {
          localStorage.removeItem(localStorageNames.HEMIS_TOKEN);
          localStorage.removeItem(localStorageNames.university);
          localStorage.removeItem(localStorageNames.universityApi);
          window.location.href = '/';
        },
        onOk() {
          setNoResponseFromServer(false);
        },
        cancelText: t('const.yes'),
        okText: t('const.no'),
        okCancel: true,
      });
    }
  }, [noResponseFromServer]);

  // dispatch active semester
  useEffect(() => {
    if (activeSemester) {
      dispatch(
        setCurrentSemester(
          semestrs?.data?.find(
            semester => semester?.code === activeSemester?.value
          )
        )
      );
    }
  }, [activeSemester]);

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
          {isLoading && <Loading />}
          <Flex
            className="dashboard__header upper-element"
            justify="space-between"
            align="center"
            gap={18}
            wrap
          >
            <Flex gap={8} align="center" flex={1}>
              <Typography.Text strong className="semester-name">
                {currentSemester ? (
                  <Select
                    labelInValue
                    style={{ width: '115px' }}
                    options={semestrs?.data?.map(semester => ({
                      label: semester?.name,
                      value: semester?.code,
                    }))}
                    value={activeSemester}
                    onChange={onSemesterChange}
                  />
                ) : (
                  <Spin />
                )}
              </Typography.Text>
              {profile?.data?.group?.name && (
                <Tooltip placement="bottom" title={profile?.data?.group?.name}>
                  <div className="group-name-box">
                    <Typography.Text
                      className="group-name"
                      style={{ margin: 0 }}
                    >
                      {profile?.data?.group?.name}
                    </Typography.Text>
                  </div>
                </Tooltip>
              )}
            </Flex>

            <Flex gap={8} align="center">
              <Link to="/dashboard/profile" style={{ width: '32px' }}>
                <Avatar
                  src={profile?.data?.image ?? '/images/avatar.png'}
                  style={{ backgroundColor: '#8381D8' }}
                >
                  {`${profile?.data?.first_name[0]}${profile?.data?.second_name[0]}`}
                </Avatar>
              </Link>

              <Switch
                value={themeColor === 'dark'}
                onChange={() => dispatch(toggleThemeColor())}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />

              {!isMobileNavBottom && isMobile && (
                <Button
                  icon={<MenuOutlined />}
                  onClick={() => setIsNavbarActive(prev => !prev)}
                  ref={toggleMenuButtonRef}
                />
              )}
            </Flex>
          </Flex>

          <div className="dashboard__body--box">
            <Flex vertical>
              <Breadcrumb
                style={{ marginBottom: 16 }}
                items={[
                  {
                    title: t('const.main'),
                  },
                  ...pathNames.map((name, index) => {
                    const fullPath = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const navItem = navbarList.find(
                      nav => nav.path === fullPath
                    );
                    return {
                      title: (
                        <Link to={fullPath}>
                          {(navItem && navItem.title) || name}
                        </Link>
                      ),
                    };
                  }),
                ]}
              />
              <Outlet />
            </Flex>
          </div>
          {isMobileNavBottom && <NavbarBottom />}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};
