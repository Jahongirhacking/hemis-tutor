import { type ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Layout: {
      // bodyBg: 'var(--color-main-bg)',
      // siderBg: 'var(--color-aside-bg)',
      // headerBg: 'var(--color-header-bg)',
      // colorPrimary: 'var(--color-primary)',
    },
    Menu: {
      //   // colorBgContainer: 'transparent',
      lineWidth: 0,
      //   // itemSelectedColor: 'var(--selected-menu-item-text-color)', // selected menu text color
      //   // itemSelectedBg: 'var(--selected-menu-item-bg)',
      //   // itemBg: 'var(--menu-item-bg)',
      subMenuItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
      fontSize: 16,
      //   itemHoverColor: 'var(--submenu-item-hover-bg)',
      //   itemHoverBg: 'transparent',
      //   itemColor: 'var(--submenu-item-color)',
      // },
      // Avatar: {
      //   colorPrimary: 'var(--color-primary)',
    },
    Segmented: {
      itemSelectedBg: 'purple',
      itemSelectedColor: '#ffffff',
    },
    Select: {},
  },
};
