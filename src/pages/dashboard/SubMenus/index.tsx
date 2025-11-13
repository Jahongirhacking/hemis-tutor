import { Flex, Typography } from 'antd';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const SubMenus = ({
  children,
  titleCode,
}: {
  children: ReactElement;
  titleCode?: string;
}) => {
  const { t } = useTranslation();

  return (
    <section className="section dashboard__outlet sub-menus__outlet">
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t(titleCode)}
      </Typography.Title>
      <Flex className="sub-menus" vertical gap={15}>
        {children}
      </Flex>
    </section>
  );
};

export default SubMenus;
