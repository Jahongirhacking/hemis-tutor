import { StudentLivingStatus } from '@/services/student/type';
import { Tag } from 'antd';

const LivingStatusTag = ({ livingStatus }: { livingStatus: { name: string; code: StudentLivingStatus }; }) => {
    return (
        <Tag color={livingStatus?.code === StudentLivingStatus.GREEN ? 'success' : livingStatus?.code === StudentLivingStatus.RED ? 'error' : 'orange'}>{livingStatus?.name}</Tag>
    )
}

export default LivingStatusTag