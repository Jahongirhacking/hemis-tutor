import { Collapse, Flex, Skeleton } from 'antd';

const AppropriationSkeleton = ({
  status,
}: {
  status: 'good' | 'normal' | 'bad';
}) => {
  return (
    <Collapse
      className="appropriation-card appropriation-card-skeleton"
      expandIconPosition="end"
      activeKey={null}
      style={{ width: '100%' }}
      items={[
        {
          key: 1,
          label: (
            <Flex
              justify="space-between"
              align="center"
              wrap
              style={{ rowGap: '10px', columnGap: '3px' }}
            >
              <Skeleton.Input active />
              <Skeleton.Button
                active
                size="small"
                style={{
                  border: `1px solid ${status === 'good' ? '#b7eb8f' : status === 'normal' ? '#ffd591' : '#ffadd2'}`,
                }}
              />
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default AppropriationSkeleton;
