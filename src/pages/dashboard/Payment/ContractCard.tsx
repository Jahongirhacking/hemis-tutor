import DashedList from '@/components/DashedList';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Flex } from 'antd';
import { ReactElement } from 'react';

interface IListProp {
  label: string;
  value: string | number | ReactElement;
}

const ContractCard = ({
  list,
  contractUrl,
}: {
  list: IListProp[];
  contractUrl: string;
}) => {
  return (
    <Card className="contract-card" hoverable>
      <Flex vertical>
        <DashedList list={list} />
        <Divider />
        <Button icon={<DownloadOutlined />} href={contractUrl} target="_blank">
          Shartnomani yuklab olish
        </Button>
      </Flex>
    </Card>
  );
};

export default ContractCard;
