import useNavbarList from '@/components/Navbar/useNavbarList';
import { useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/store/slices/authSlice';
import { RightOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

const ProfileMenus = () => {
  const { navbarBottom } = useNavbarList();
  const dispatch = useAppDispatch();
  if (!navbarBottom || navbarBottom.length === 0) return <Skeleton active />;

  return (
    <>
      {navbarBottom?.map(nav => (
        <Link
          className="menu-link upper-element"
          key={nav?.path}
          to={nav.path !== '/' && nav?.path}
        >
          <Flex
            gap={10}
            justify="space-between"
            onClick={() => {
              if (nav.path === '/') {
                dispatch(logoutThunk());
              }
            }}
          >
            <Flex gap={10}>
              {nav?.icon}
              <Typography.Text strong>{nav?.title}</Typography.Text>
            </Flex>
            <RightOutlined />
          </Flex>
        </Link>
      ))}
    </>
  );
};

export default ProfileMenus;
