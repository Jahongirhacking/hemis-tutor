import { usePagination } from '@/hooks/usePagination';
import {
  useGetLivingStatusesQuery,
  useGetVisitListQuery,
} from '@/services/student';
import { ITutorVisit } from '@/services/student/type';
import { SearchParams } from '@/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Flex } from 'antd';
import moment from 'moment';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';
import CreateVisit, {
  CREATE_VISIT_DRAWER,
  DrawerTabKeys,
} from '../CreateVisitPage';
import LivingStatusTag from '../components/LivingStatusTag';
import LocationButton from '../components/LocationButton';

enum FilterItem {
  StudentStatus = '_student_living_status',
  StudentId = 'student_id',
}

const LAST_VISITS = 3;

const CheckAddress = () => {
  const { form, values } = useCustomFilter();
  const { pagination } = usePagination();
  const { data: addressData, isFetching } = useGetVisitListQuery({
    ...values,
    ...pagination,
  });
  const { data: livingStatusData, isFetching: isLivingStatusFetching } =
    useGetLivingStatusesQuery();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  // const isMobile = useSelector((store: RootState) => store.authSlice.isMobile);

  const handleVisitDrawer = useCallback(
    ({
      id,
      action = 'open',
      field = DrawerTabKeys.CREATE,
    }: {
      id?: string;
      action?: 'open' | 'close';
      field?: DrawerTabKeys;
    }) => {
      const params = new URLSearchParams(searchParams);
      if (action === 'open') {
        params.set(CREATE_VISIT_DRAWER, String(id));
        params.set(SearchParams.DrawerTab, field);
      } else {
        params.delete(CREATE_VISIT_DRAWER);
        params.delete(SearchParams.DrawerTab);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return (
    <Flex vertical gap={18} className="check-address-page">
      <Flex gap={12} align="center" justify="space-between" wrap>
        <CustomFilter form={form}>
          <CustomFilter.BySearch />
          <CustomFilter.ByGroup />
          <CustomFilter.BySelect
            field={FilterItem.StudentStatus}
            options={livingStatusData?.result?.items?.map(i => ({
              label: LivingStatusTag({
                livingStatus: {
                  code: i?.code,
                  name: i?.name,
                },
              }),
              value: i?.code,
            }))}
            placeholder="Yashash holati"
            loading={isLivingStatusFetching}
          />
        </CustomFilter>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
        columns={[
          {
            title: '#',
            render: (_, __, index) =>
              ((pagination?.page || 1) - 1) * pagination?.per_page + index + 1,
            width: 60,
          },
          {
            title: t('const.student'),
            key: 'name',
            width: 250,
            render: (_, record) => (
              <CustomLink.Student
                student={{
                  full_name: `${record?.second_name} ${record?.first_name} ${record?.third_name}`,
                  id: record?.id,
                }}
              />
            ),
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
              <Flex gap={6} wrap align="center">
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
            render: status =>
              status ? (
                <Flex vertical gap={4} align="flex-start">
                  <LivingStatusTag livingStatus={status} />
                </Flex>
              ) : (
                '-'
              ),
          },
          ...Array.from({ length: LAST_VISITS }).map((_, index) => ({
            title: `${index + 1}-tashrif (oxirgi)`,
            dataIndex: 'tutorVisits',
            key: `visit-${index}`,
            render: (visits: ITutorVisit[], record) => (
              <Flex vertical gap={2} align="flex-start">
                <Button
                  type="link"
                  className="p-0"
                  onClick={() =>
                    handleVisitDrawer({
                      id: record?.id,
                      field: DrawerTabKeys.HISTORY,
                    })
                  }
                >
                  <LivingStatusTag
                    livingStatus={{
                      code: visits?.[index]?._student_living_status,
                      name: visits?.[index]
                        ? moment(
                            visits?.[index]?.created_at,
                            'YYYY-MM-DD HH:mm:ss'
                          ).format('DD.MM.YYYY')
                        : '-',
                    }}
                  />
                </Button>
              </Flex>
            ),
          })),
          {
            title: t('const.actions'),
            dataIndex: 'id',
            key: 'actions',
            className: 'actions-column',
            render: id => (
              <Flex vertical gap={4}>
                <Button
                  className="visit-btn"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleVisitDrawer({ id: String(id) })}
                >
                  <span className="visit-btn__text">Tashrif</span>
                </Button>
              </Flex>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={addressData?.result?.items}
        paginationTotal={addressData?.result?._meta?.totalCount}
        pagination={false}
        scroll={{ x: '1200px' }}
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
