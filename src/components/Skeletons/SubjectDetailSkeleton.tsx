import { Card, Flex, Skeleton } from 'antd';

const SubjectDetailSkeleton = () => {
  return (
    <section className="section dashboard__outlet" style={{ width: '100%' }}>
      <h2 className="section_title">
        <Skeleton.Input active />
      </h2>
      <div className="dashboard__outlet--content">
        <Card>
          <Flex vertical gap={30}>
            <Skeleton active />
            <Skeleton active />
          </Flex>
        </Card>
      </div>
    </section>
  );
};

export default SubjectDetailSkeleton;
