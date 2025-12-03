import { Col, ColProps } from 'antd';

export const COL_SIZE = { xs: 24, lg: 12 };

const CustomCol = (props: ColProps) => {
  if (!props?.children) return null;

  return <Col {...COL_SIZE} {...props} />;
};

export default CustomCol;
