import { truncateString } from '@/utils/stringFunc';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ExpandableText = ({
  children: text,
  limit = 100,
}: {
  children: string;
  limit?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  return (
    <Flex vertical>
      <Typography.Text>
        {isExpanded ? text : truncateString(text, limit)}
      </Typography.Text>
      <Button
        type="link"
        icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
        onClick={() => setIsExpanded(prev => !prev)}
        className="expand-btn"
      >
        {isExpanded ? t('const.read_less') : t('const.read_more')}
      </Button>
    </Flex>
  );
};

export default ExpandableText;
