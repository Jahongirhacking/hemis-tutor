import {
  CancelPasswordSVG, LoginIconSVG,
  StatisticsSVG
} from '@/assets/icon';
import { paths } from '@/router/paths';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IExtraOptions {
  icon: ReactElement;
  label: string | ReactElement;
  link: string;
}

const useOptions = (): IExtraOptions[] => {
  const [extraOptions, setExtraOptions] = useState<IExtraOptions[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setExtraOptions([
      {
        icon: <LoginIconSVG />,
        label: t('login.extra_options.login_text'),
        link: paths.base,
      },
      {
        icon: <CancelPasswordSVG />,
        label: t('login.extra_options.cancel_password_text'),
        link: paths.cancelPassword,
      },
      {
        icon: <StatisticsSVG />,
        label: t('login.extra_options.statistics_dashboard_text'),
        link: paths.statisticsDashboard,
      },
    ]);
  }, []);

  return extraOptions;
};

export default useOptions;
