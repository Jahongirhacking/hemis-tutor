import useNavbarList from '@/components/Navbar/useNavbarList';
import { RightOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

const UsefulMenus = () => {
  const { navbarList } = useNavbarList();

  if (!navbarList || navbarList.length === 0) return <Skeleton active />;
  const menus = [
    navbarList.find(n => n?.path === '/dashboard/eduplan'),
    navbarList.find(n => n?.path === '/dashboard/attendance'),
    navbarList.find(n => n?.path === '/dashboard/exams'),
    navbarList.find(n => n?.path === '/dashboard/payment'),
    navbarList.find(n => n?.path === '/dashboard/folders'),
    navbarList.find(n => n?.path === '/dashboard/library'),
  ]?.filter(m => !!m);

  return (
    <>
      {menus?.map(nav => (
        <Link
          className="menu-link upper-element"
          key={nav?.path}
          to={nav?.path}
        >
          <Flex gap={10} justify="space-between">
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

export default UsefulMenus;
