import {
  getChildElement,
  onClose,
  setDrawer,
} from '@/store/slices/drawerSlice';
import { RootState } from '@/store/store';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Drawer, Skeleton } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const CustomDrawer = () => {
  const { title, isOpen, childType, props } = useSelector(
    (store: RootState) => store.drawerSlice
  );
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchParams.has(SearchParams.Drawer)) {
      dispatch(
        setDrawer({
          isOpen: true,
          childType: searchParams.get(SearchParams.Drawer) as DrawerChildTypes,
          ...(searchParams.has(SearchParams.DrawerProps)
            ? { props: JSON.parse(searchParams.get(SearchParams.DrawerProps)) }
            : {}),
        })
      );
    } else {
      dispatch(
        setDrawer({
          isOpen: false,
          childType: null,
        })
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.has(SearchParams.Drawer)) {
      const childType = searchParams.get(SearchParams.Drawer);
      if (
        [
          DrawerChildTypes.Attendance,
          DrawerChildTypes.Schedule,
          DrawerChildTypes.AttendanceDetail,
          DrawerChildTypes.Appropriation,
          DrawerChildTypes.GpaDetail,
          DrawerChildTypes.Resource,
        ].includes(childType as DrawerChildTypes)
      ) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(SearchParams.Drawer);
        setSearchParams(newParams);
      }
    }
  }, []);

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    [
      SearchParams.Drawer,
      SearchParams.DrawerProps,
      SearchParams.ChatTopic,
    ].forEach(p => {
      newParams.delete(p);
    });
    setSearchParams(newParams);
    dispatch(onClose());
  };

  return (
    <Drawer
      className={themeColor === 'dark' ? 'dark-theme' : 'light-theme'}
      closable={false}
      extra={<CloseOutlined onClick={handleClose} />}
      onClose={handleClose}
      title={title ? title : t('const.close')}
      open={isOpen}
      getContainer={() => document.getElementById('root')}
    >
      <Suspense
        fallback={
          <LoadingOutlined
            style={{ fontSize: '50pt', color: '#1677ff', display: 'block' }}
          />
        }
      >
        {childType ? (
          React.cloneElement(getChildElement(childType), props)
        ) : (
          <Skeleton active />
        )}
      </Suspense>
    </Drawer>
  );
};

export default CustomDrawer;
