import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';

const useCustomTable = ({ text }: { text?: string }) => {
  const { t } = useTranslation();

  return {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={text || `${t('const.info')} ${t('const.not_found')}`}
      />
    ),
  };
};

export default useCustomTable;
