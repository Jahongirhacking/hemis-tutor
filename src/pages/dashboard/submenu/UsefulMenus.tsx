import useNavbarList from '@/components/Navbar/useNavbarList';
import { paths } from '@/router/paths';
import { RightOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

const UsefulMenus = () => {
  const { navbarList } = useNavbarList();

  if (!navbarList || navbarList.length === 0) return <Skeleton active />;
  const menus = [
    navbarList.find(n => n?.path === paths.private.performance),
    navbarList.find(n => n?.path === paths.private.checkAddress),
    navbarList.find(n => n?.path === paths.private.externalService),
    navbarList.find(n => n?.path === paths.private.financial),
    navbarList.find(n => n?.path === paths.private.messages),
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
