import {
    useGetVisitListQuery
} from '@/services/student';
import { IStudent, ITutorVisit } from '@/services/student/type';
import { Flex } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import LocationButton from './LocationButton';

const VisitDetails = ({ studentId }: { studentId: IStudent['id'] }) => {
    const { data: visitData, isFetching } = useGetVisitListQuery(
        { student_id: studentId },
        { skip: !studentId }
    );
    const { t } = useTranslation();

    return (
        <Flex vertical gap={12}>
            <CustomTable
                loading={isFetching}
                columns={[
                    {
                        title: 'Manzil',
                        key: 'address',
                        render: (_, record: ITutorVisit) => (
                            <LocationButton
                                geolocation={record?.geolocation}
                                current_address={record?.current_address}
                            />
                        ),
                    },
                    {
                        title: t('const.comment'),
                        key: 'comment',
                        dataIndex: 'comment',
                    },
                    {
                        title: t('const.date'),
                        key: 'created_at',
                        dataIndex: 'created_at',
                        render: date =>
                            moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY'),
                    },
                ]}
                dataSource={visitData?.result?.items?.[0]?.tutorVisits || []}
            />
        </Flex>
    );
};

export default VisitDetails;
