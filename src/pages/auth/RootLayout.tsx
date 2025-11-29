import LanguageSelect from '@/components/Select/LanguageSelect';
import TutorLogo from '@/components/TutorLogo';
import { paths } from '@/router/paths';
import { Flex, Typography } from 'antd';
import moment from 'moment';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useOptions from './useOptions';

const RootLayout = () => {
  const extraOptions = useOptions();
  const location = useLocation();
  const pathName = location.pathname;
  const activeOption = extraOptions.find(option => option.link === pathName);

  return (
    <div className="login">
      <Flex align="center" justify="space-between" className="login__header">
        <Link to={paths.login} style={{ height: 20 }}>
          <TutorLogo />
        </Link>

        {activeOption?.link !== paths.base && (
          <Flex className="path-title" gap={12} align="center">
            {activeOption?.icon}
            <Typography.Title level={4} style={{ margin: 0 }}>
              {activeOption?.label}
            </Typography.Title>
          </Flex>
        )}

        <LanguageSelect />
      </Flex>

      <div className="login__main upper-element">
        <div className="flex-center direction-column gap24">
          <Outlet />
        </div>
      </div>

      <div className="login__footer">
        <p>Hemis {moment().year()}</p>
      </div>
    </div>
  );
};

export default RootLayout;
