import FileList from '@/components/FileList';
import { IFile } from '@/services/dashboard/type';
import { Card, Divider, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const ResourceInDrawer = ({ resource }: { resource?: IFile[] }) => {
  const { t } = useTranslation();
  return (
    <Flex className="task-in-drawer" vertical gap={16}>
      <Card className="task-in-drawer__card card-2">
        <Flex vertical>
          <Typography.Text strong style={{ fontSize: '16px' }}>
            {t('const.resources')}
          </Typography.Text>
          <Divider />
          <FileList files={resource} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default ResourceInDrawer;
