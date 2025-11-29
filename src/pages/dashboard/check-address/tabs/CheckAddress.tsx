import { usePagination } from '@/hooks/usePagination';
import {
  useGetDistrictsQuery,
  useGetLivingStatusesQuery,
  useGetProvincesQuery,
  useGetVisitListQuery,
} from '@/services/student';
import { ICheckStudentAddressItem, ITutorVisit } from '@/services/student/type';
import { SearchParams } from '@/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Drawer, Flex, Space, Typography } from 'antd';
import { Calendar, MapPin, User } from 'lucide-react';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import { default as CustomFilter } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';
import CreateVisit, {
  CREATE_VISIT_DRAWER,
  DrawerTabKeys,
} from '../CreateVisitPage';
import LivingStatusTag from '../components/LivingStatusTag';
import LocationButton from '../components/LocationButton';
import "./CheckAddress.scss";

enum FilterItem {
  StudentStatus = '_student_living_status',
  StudentId = 'student_id',
  ProvinceCode = 'province_code',
  DistictCode = '_current_district',
}

const LAST_VISITS = 3;

const CheckAddress = () => {
  const { form, values: filterValues } = useCustomFilter();
  const { [FilterItem.ProvinceCode]: province_code, ...values } = useMemo(
    () => ({ ...filterValues }),
    [filterValues]
  );
  const { pagination } = usePagination();
  const { data: addressData, isFetching } = useGetVisitListQuery({
    ...values,
    ...pagination,
  });
  const { data: livingStatusData, isFetching: isLivingStatusFetching } =
    useGetLivingStatusesQuery();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: provinceData, isFetching: isProvinceFetching } =
    useGetProvincesQuery();
  const { data: districtData, isFetching: isDistrictFetching } =
    useGetDistrictsQuery({ province: province_code }, { skip: !province_code });

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
    <Flex vertical gap={20} className="check-address-page">
      {/* Filters Card */}
      <Card
        className="shadow-sm"
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
      >
        <CustomFilter form={form}>
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
          <CustomFilter.BySelect
            field={FilterItem.ProvinceCode}
            options={provinceData?.result?.items?.map(i => ({
              label: i?.name,
              value: i?.code,
            }))}
            placeholder="Viloyat"
            loading={isProvinceFetching}
            onChange={() => {
              form.setFieldValue(FilterItem.DistictCode, undefined);
            }}
          />
          <CustomFilter.BySelect
            field={FilterItem.DistictCode}
            options={districtData?.result?.items?.map(i => ({
              label: i?.name,
              value: i?.code,
            }))}
            placeholder="Tuman"
            loading={isDistrictFetching}
          />
          <CustomFilter.BySearch />
        </CustomFilter>
      </Card>

      {/* Table Card */}
      <Card
        className="shadow-sm"
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
      >
        <CustomTable
          loading={isFetching}
          columns={[
            {
              title: '#',
              render: (_, __, index) =>
                ((pagination?.page || 1) - 1) * pagination?.per_page + index + 1,
              width: 60,
              align: 'center',
            },
            {
              title: (
                <Space size={4}>
                  <User size={14} />
                  <span>{t('const.student')}</span>
                </Space>
              ),
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
              render: group => (
                <Badge
                  color="blue"
                  text={
                    <Typography.Text style={{ fontSize: '13px' }}>
                      {group?.name}
                    </Typography.Text>
                  }
                />
              ),
            },
            {
              title: (
                <Space size={4}>
                  <MapPin size={14} />
                  <span>{t('const.registered_address')}</span>
                </Space>
              ),
              key: 'address',
              render: (_, record: ICheckStudentAddressItem) => (
                <Flex gap={6} wrap align="center">
                  {record?.currentDistrict || record?.currentTerrain ? (
                    <LocationButton
                      geolocation={record?.tutorVisits?.[0]?.geolocation}
                      current_address={`${[record?.currentDistrict?.name, record?.currentTerrain?.name]?.join(', ')}`}
                    />
                  ) : (
                    <Typography.Text type="secondary">-</Typography.Text>
                  )}
                </Flex>
              ),
            },
            {
              title: t('const.living_status'),
              dataIndex: 'studentLivingStatus',
              key: 'studentLivingStatus',
              render: status =>
                status ? (
                  <Flex vertical gap={4} align="flex-start">
                    <LivingStatusTag livingStatus={status} />
                  </Flex>
                ) : (
                  <Typography.Text type="secondary">-</Typography.Text>
                ),
            },
            ...Array.from({ length: LAST_VISITS }).map((_, index) => ({
              title: (
                <Space size={4}>
                  <Calendar size={14} />
                  <span>{`${index + 1}-${t('const.visit')}`}</span>
                </Space>
              ),
              dataIndex: 'tutorVisits',
              key: `visit-${index}`,
              align: 'center' as const,
              render: (visits: ITutorVisit[], record) => (
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
              ),
            })),
            {
              title: t('const.actions'),
              dataIndex: 'id',
              key: 'actions',
              className: 'actions-column',
              align: 'center',
              render: id => (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleVisitDrawer({ id: String(id) })}
                  className="!rounded-lg"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  Tashrif
                </Button>
              ),
              fixed: 'right',
              width: 140,
            },
          ]}
          dataSource={addressData?.result?.items}
          paginationTotal={addressData?.result?._meta?.totalCount}
          pagination={false}
          scroll={{ x: '1200px' }}
        />
      </Card>

      <Drawer
        placement="bottom"
        open={searchParams.has(CREATE_VISIT_DRAWER)}
        closable
        onClose={() => handleVisitDrawer({ action: 'close' })}
        title={
          <Space size={8}>
            <MapPin size={20} className="text-blue-600" />
            <Typography.Title level={4} style={{ margin: 0 }}>
              Manzilga tashrifni qayd etish
            </Typography.Title>
          </Space>
        }
        height="90vh"
        styles={{
          body: {
            padding: '0 24px',
          }
        }}
      >
        <CreateVisit />
      </Drawer>
    </Flex>
  );
};

export default CheckAddress;