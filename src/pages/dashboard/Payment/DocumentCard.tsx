import DashedList from '@/components/DashedList';
import { Card } from 'antd';
import { ReactElement } from 'react';

interface IListProp {
  label: string;
  value: string | number | ReactElement;
}

const DocumentCard = ({ list }: { list: IListProp[] }) => {
  return (
    <Card className="document-card" hoverable>
      <DashedList collapsable={true} list={list} />
    </Card>
  );
};

export default DocumentCard;
