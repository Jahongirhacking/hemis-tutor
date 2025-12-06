import { useGetVisitListQuery } from '@/services/student';
import {
  getLivingStatusName,
  IStudent,
  ITutorVisit,
} from '@/services/student/type';
import { SearchParams } from '@/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Flex, Space, Typography } from 'antd';
import { Activity, Calendar, MapPin, MessageSquare } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import { DrawerTabKeys } from '../CreateVisitPage';
import LivingStatusTag from './LivingStatusTag';
import LocationButton from './LocationButton';

const VisitDetails = ({ studentId }: { studentId: IStudent['id'] }) => {
  const { data: visitData, isFetching } = useGetVisitListQuery(
    { student_id: studentId },
    { skip: !studentId }
  );
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const visits = visitData?.result?.items?.[0]?.tutorVisits || [];

  return (
    <Flex vertical gap={16} className="py-4">
      <Card
        className="shadow-sm visits-history"
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
      >
        {visits.length > 0 ? (
          <CustomTable
            loading={isFetching}
            columns={[
              {
                title: (
                  <Space size={4}>
                    <MapPin size={14} />
                    <span>Manzil</span>
                  </Space>
                ),
                key: 'address',
                width: '30%',
                render: (_, record: ITutorVisit) => (
                  <LocationButton
                    geolocation={record?.geolocation}
                    current_address={record?.current_address}
                  />
                ),
              },
              {
                title: (
                  <Space size={4}>
                    <MessageSquare size={14} />
                    <span>{t('const.comment')}</span>
                  </Space>
                ),
                key: 'comment',
                dataIndex: 'comment',
                width: '35%',
                render: comment => (
                  <Typography.Text
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.5',
                    }}
                  >
                    {comment || '-'}
                  </Typography.Text>
                ),
              },
              {
                title: (
                  <Space size={4}>
                    <Calendar size={14} />
                    <span>{t('const.date')}</span>
                  </Space>
                ),
                key: 'created_at',
                dataIndex: 'created_at',
                align: 'center',
                width: '15%',
                render: date => (
                  <Typography.Text strong style={{ fontSize: '13px' }}>
                    {moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY')}
                  </Typography.Text>
                ),
              },
              {
                title: (
                  <Space size={4}>
                    <Activity size={14} />
                    <span>{t('const.status')}</span>
                  </Space>
                ),
                key: '_student_living_status',
                dataIndex: '_student_living_status',
                align: 'center',
                width: '20%',
                render: student_living_status => (
                  <LivingStatusTag
                    livingStatus={{
                      code: student_living_status,
                      name: getLivingStatusName(student_living_status),
                    }}
                  />
                ),
                fixed: 'right',
              },
            ]}
            pagination={{ pageSize: 5 }}
            dataSource={visits}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Space direction="vertical" size={4}>
                <Typography.Text type="secondary">
                  Tashriflar tarixi mavjud emas
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                  Birinchi tashrifni qayd eting
                </Typography.Text>
                <Button
                  className="mt-4"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set(SearchParams.DrawerTab, DrawerTabKeys.CREATE);
                    setSearchParams(params);
                  }}
                >
                  {t('const.visit')}
                </Button>
              </Space>
            }
            style={{ padding: '40px 0' }}
          />
        )}
      </Card>
    </Flex>
  );
};

export default VisitDetails;
