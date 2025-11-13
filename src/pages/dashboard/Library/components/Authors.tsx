import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { useState } from 'react';

const Authors = ({ authors }: { authors: string }) => {
  if (!authors || authors.length === 0) return null;

  const [expanded, setExpanded] = useState(false);
  const authorsArr = authors?.split(', ');
  const changeableAuthorsArr = expanded ? authorsArr : [authorsArr[0]];

  return (
    <Flex wrap gap={5} align="center" className="authors-list">
      {changeableAuthorsArr.map((author, index) => (
        <Tag key={index} color="purple" style={{ margin: 0 }}>
          {author}
        </Tag>
      ))}
      {authorsArr.length > 1 && (
        <Button
          shape="circle"
          size="small"
          onClick={e => {
            e.stopPropagation();
            setExpanded(prev => !prev);
          }}
        >
          {expanded ? <MinusOutlined /> : <PlusOutlined />}
        </Button>
      )}
    </Flex>
  );
};

export default Authors;
