import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Typography } from 'antd';
import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface IList {
  label: string | number | ReactElement;
  value: string | number | ReactElement;
}

const DashedList = ({
  list,
  collapsable = false,
  bordered = true,
  emptyElement = null,
  className = '',
  limit = 3,
}: {
  list: IList[];
  collapsable?: boolean;
  bordered?: boolean;
  emptyElement?: ReactElement;
  className?: string;
  limit?: number;
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsable);
  const dashedClassName = clsx('dashed-list', className, {
    collapsed: isCollapsed,
  });
  const { t } = useTranslation();

  if (!list || !list.length)
    return (
      emptyElement ?? (
        <Empty description={`${t('const.info')} ${t('const.not_found')}`} />
      )
    );

  return (
    <Flex vertical className={dashedClassName} gap={6}>
      {list?.map((item, index) => {
        if (isCollapsed && index >= limit) return;
        return (
          <Flex
            className="list__row"
            key={index}
            justify="space-between"
            align="flex-start"
          >
            <div className="list__label list__item">
              <Typography.Text>{item.label}</Typography.Text>
            </div>

            <div className={`${bordered ? 'dashed-border' : ''} list__item`} />

            <div className="list__value list__item">
              <Typography.Text strong>
                {item.value || toFirstCapitalLetter(t('const.not_found'))}
              </Typography.Text>
            </div>
          </Flex>
        );
      })}
      {collapsable && (
        <Button
          className="collapse-btn"
          type="link"
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          {isCollapsed ? `${t('const.in_detail')} ` : `${t('const.close')} `}
          {isCollapsed ? <DownOutlined /> : <UpOutlined />}
        </Button>
      )}
    </Flex>
  );
};

export default DashedList;
