import { StudentLivingStatus } from '@/services/student/type';
import { Tag } from 'antd';

const LivingStatusTag = ({
  livingStatus,
}: {
  livingStatus: { name: string; code: StudentLivingStatus };
}) => {
  return (
    <Tag
      color={
        livingStatus?.code == StudentLivingStatus.GREEN
          ? 'green'
          : livingStatus?.code == StudentLivingStatus.RED
            ? 'red'
            : livingStatus?.code == StudentLivingStatus.YELLOW
              ? 'orange'
              : 'default'
      }
    >
      {livingStatus?.name}
    </Tag>
  );
};

export default LivingStatusTag;
