import { Drawer, DrawerProps } from 'antd';
import { useTranslation } from 'react-i18next';

const CustomDrawer = (props: DrawerProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t('const.in_detail')}
      closable
      placement="right"
      {...props}
    />
  );
};

export default CustomDrawer;
