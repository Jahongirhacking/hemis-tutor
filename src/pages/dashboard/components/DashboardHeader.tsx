import { paths } from '@/router/paths';
import { useGetProfileQuery } from '@/services/profile';
import { toggleThemeColor } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Flex, Switch, Tag, Typography } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DashboardContext } from '..';

const DashboardHeader = () => {
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );
  const { setIsNavbarActive, toggleMenuButtonRef, isMobile } =
    useContext(DashboardContext);
  const { data: profileData } = useGetProfileQuery();
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Flex
      className="dashboard__header upper-element"
      justify="space-between"
      align="center"
      gap={18}
    >
      <Flex gap={8} wrap>
        {profileData?.result?.statistics?.groups_count && (
          <Tag color="magenta">{`${t('const.group')}: ${t('const.number_count', { number: profileData?.result?.statistics?.groups_count })}`}</Tag>
        )}
        {profileData?.result?.statistics?.total_students && (
          <Tag color="blue">{`${t('const.student')}: ${t('const.number_count', { number: `${profileData?.result?.statistics?.active_students} / ${profileData?.result?.statistics?.total_students}` })}`}</Tag>
        )}
      </Flex>
      <Flex gap={12} align="center" className="ml-auto">
        <Switch
          value={themeColor === 'dark'}
          onChange={() => dispatch(toggleThemeColor())}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />

        <Flex gap={12} align="center">
          <Link to={paths.private.settings}>
            <Avatar
              src={profileData?.result?.tutor?.image}
              shape="circle"
              size="large"
              style={{ background: '#14b8a6' }}
            >
              {`${profileData?.result?.tutor?.employee?.second_name?.[0]}${profileData?.result?.tutor?.employee?.first_name?.[0]}`}
            </Avatar>
          </Link>
          {!isMobile && (
            <Flex vertical gap={2}>
              <Typography.Text strong>
                {(() => {
                  const temp = profileData?.result?.tutor?.employee;
                  return [temp?.second_name, temp?.first_name, temp?.third_name]
                    ?.filter(e => !!e)
                    ?.reduce(
                      (acc, curr, index) =>
                        `${acc} ${index === 0 ? curr : `${curr?.[0]}.`}`,
                      ''
                    );
                })()}
              </Typography.Text>
              <Typography.Text>
                <Badge
                  status={
                    profileData?.result?.tutor?.employee?.active
                      ? 'success'
                      : 'default'
                  }
                  style={{ marginRight: 4 }}
                />{' '}
                Tyutor
              </Typography.Text>
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
