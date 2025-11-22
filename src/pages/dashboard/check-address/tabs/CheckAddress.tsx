import { useGetVisitListQuery } from '@/services/student';
import { ITutorVisit } from '@/services/student/type';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Flex, Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CreateVisit, { CREATE_VISIT_DRAWER } from '../CreateVisitPage';
import LivingStatusTag from '../components/LivingStatusTag';
import LocationButton from '../components/LocationButton';

const CheckAddress = () => {
  const { form, values } = useCustomFilter();
  const { data: addressData, isFetching } = useGetVisitListQuery({
    ...values,
  });
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleVisitDrawer = useCallback(
    ({ id, action = 'open' }: { id?: string; action?: 'open' | 'close' }) => {
      const params = new URLSearchParams(searchParams);
      if (action === 'open') {
        params.set(CREATE_VISIT_DRAWER, String(id));
      } else {
        params.delete(CREATE_VISIT_DRAWER);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return (
    <Flex vertical gap={18}>
      <Flex gap={12} align="center" justify="space-between" wrap>
        <CustomFilter form={form}>
          <CustomFilter.BySearch />
          <CustomFilter.ByGroup />
        </CustomFilter>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
        columns={[
          {
            title: t('const.student'),
            key: 'name',
            width: 250,
            render: (_, record) =>
              `${record?.second_name} ${record?.first_name} ${record?.third_name}`,
          },
          {
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
            render: group => group?.name,
          },
          {
            title: t('const.registered_address'),
            dataIndex: 'tutorVisits',
            key: 'tutorVisits',
            render: (visits: ITutorVisit[]) => (
              <Flex gap={6} wrap>
                {visits?.length ? (
                  <LocationButton
                    geolocation={visits?.[0]?.geolocation}
                    current_address={visits?.[0]?.current_address}
                  />
                ) : (
                  '-'
                )}
              </Flex>
            ),
          },
          {
            title: `${t('const.status')} / ${t('const.comment')}`,
            dataIndex: 'studentLivingStatus',
            key: 'studentLivingStatus',
            render: (status, record) =>
              status ? (
                <Flex vertical gap={4} align="flex-start">
                  <LivingStatusTag livingStatus={status} />
                  {!!record?.tutorVisits?.length && (
                    <Typography.Text style={{ color: '#6a6a6a' }}>
                      <InfoCircleOutlined style={{ marginRight: 3 }} />{' '}
                      {record?.tutorVisits?.[0]?.comment}
                    </Typography.Text>
                  )}
                </Flex>
              ) : (
                '-'
              ),
          },
          {
            title: t('const.actions'),
            dataIndex: 'id',
            key: 'actions',
            width: 200,
            render: id => (
              <Flex vertical gap={4}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleVisitDrawer({ id: String(id) })}
                >
                  Qayd etish
                </Button>
              </Flex>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={addressData?.result?.items}
        paginationTotal={addressData?.result?._meta?.totalCount}
        pagination={false}
      />

      <Drawer
        placement="bottom"
        open={searchParams.has(CREATE_VISIT_DRAWER)}
        closable
        onClose={() => handleVisitDrawer({ action: 'close' })}
        title="Manzilga tashrifni qayd etish"
        children={<CreateVisit />}
      />
    </Flex>
  );
};

export default CheckAddress;
