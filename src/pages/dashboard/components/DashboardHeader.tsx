import useNavbarList from '@/components/Navbar/useNavbarList';
import { RootState } from '@/store/store';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Flex, FlexProps, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DashboardContext } from '..';

const DashboardHeader = ({ children, ...props }: FlexProps) => {
  const location = useLocation();
  const pathNames = useMemo(
    () => location.pathname.split('/').filter(name => name),
    [location]
  );
  const { navbarList } = useNavbarList();
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );
  const { setIsNavbarActive, toggleMenuButtonRef, isMobile } =
    useContext(DashboardContext);

  return (
    <Flex justify="space-between" gap={18} align="center">
      <Flex gap={4} vertical {...props}>
        <Breadcrumb
          style={{ marginBottom: 16 }}
          items={[
            ...pathNames.map((name, index) => {
              const fullPath = `/${pathNames.slice(0, index + 1).join('/')}`;
              const navItem = navbarList.find(nav => nav.path === fullPath);
              return {
                title: (
                  <Link to={fullPath}>
                    {toFirstCapitalLetter((navItem && navItem.title) || name)}
                  </Link>
                ),
              };
            }),
          ]}
        />
        {children}
      </Flex>
      <Flex gap={12} align="center">
        <Flex gap={12} align="center">
          <Avatar shape="circle" size="large" style={{ background: '#1677ff' }}>
            AB
          </Avatar>
          {!isMobile && (
            <Flex vertical gap={2}>
              <Typography.Text strong>Admin Foydalanuvchi</Typography.Text>
              <Typography.Text>Administrator</Typography.Text>
            </Flex>
          )}
        </Flex>
        {!isMobileNavBottom && isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsNavbarActive(prev => !prev)}
            ref={toggleMenuButtonRef}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default DashboardHeader;
