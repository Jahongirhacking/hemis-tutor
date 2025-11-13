import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import './DashboardPage.scss';

export const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <section className="section dashboard__outlet upper-element">
      <Flex
        className="dashboard__title"
        justify="space-between"
        align="center"
        gap={16}
        wrap
      >
        <h2 className="section_title">{t('dashboard.dashboard_page.title')}</h2>
      </Flex>
      <div className="dashboard__outlet--content">
        <Flex vertical gap={18}>
          Hello
        </Flex>
      </div>
    </section>
  );
};
