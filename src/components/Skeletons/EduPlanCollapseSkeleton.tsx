import { Collapse, Skeleton } from 'antd';

const EduPlanCollapseSkeleton = () => {
  return (
    <Collapse
      className="eduplan-collapse-skeleton"
      expandIconPosition="end"
      activeKey={null}
      style={{ width: '100%' }}
      items={[
        {
          key: 1,
          label: <Skeleton.Input active size="large" />,
        },
      ]}
    />
  );
};

export default EduPlanCollapseSkeleton;
