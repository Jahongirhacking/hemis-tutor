import LanguageSelect from '@/components/Select/LanguageSelect';
import { setMobileNavBottom } from '@/store/slices/authSlice';
import { toggleThemeColor } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';
import {
  DownCircleOutlined,
  LeftCircleOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Card, Divider, Flex, Segmented, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const SystemSettings = () => {
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);
  const isMobileNavBottom = useSelector(
    (store: RootState) => store.authSlice.isMobileNavBottom
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Card title={t('const.system_settings')}>
      <Flex vertical gap={16} className="system-settings">
        <Flex wrap align="center" justify="space-between">
          <Flex vertical gap={4}>
            <Typography.Text strong>{t('const.languages')}</Typography.Text>
            <Typography.Text>
              {t('const.change_language_settings')}
            </Typography.Text>
          </Flex>
          <LanguageSelect />
        </Flex>

        <Divider style={{ margin: 0 }} />

        <Flex wrap align="center" justify="space-between">
          <Flex vertical gap={4}>
            <Typography.Text strong>{t('const.theme')}</Typography.Text>
            <Typography.Text>
              {t('const.change_theme_settings')}
            </Typography.Text>
          </Flex>
          <Segmented
            value={themeColor}
            options={[
              {
                value: 'light',
                label: t('const.light'),
                icon: <SunOutlined />,
              },
              {
                value: 'dark',
                label: t('const.dark'),
                icon: <MoonOutlined />,
              },
            ]}
            onChange={() => dispatch(toggleThemeColor())}
          />
        </Flex>

        <Divider style={{ margin: 0 }} />

        <Flex wrap align="center" justify="space-between">
          <Flex vertical gap={4}>
            <Typography.Text strong>{t('const.menu')}</Typography.Text>
            <Typography.Text>{t('const.change_menu_settings')}</Typography.Text>
          </Flex>
          <Segmented
            value={isMobileNavBottom}
            options={[
              {
                value: false,
                label: t('const.aside'),
                icon: <LeftCircleOutlined />,
              },
              {
                value: true,
                label: t('const.bottom'),
                icon: <DownCircleOutlined />,
              },
            ]}
            onChange={value => dispatch(setMobileNavBottom(value))}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default SystemSettings;
