import { usePagination } from '@/hooks/usePagination';
import {
  useGetDistrictsQuery,
  useGetLivingStatusesQuery,
  useGetProvincesQuery,
  useGetVisitListQuery,
} from '@/services/student';
import { ICheckStudentAddressItem, ITutorVisit } from '@/services/student/type';
import { RootState } from '@/store/store';
import { SearchParams } from '@/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Drawer, Flex, Space, Tag, Typography } from 'antd';
import { Calendar, Filter, MapPin, User } from 'lucide-react';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
import './CheckAddress.scss';

enum FilterItem {
  StudentStatus = '_student_living_status',
  StudentId = 'student_id',
  ProvinceCode = 'province_code',
  DistictCode = '_current_district',
}

const LAST_VISITS = 3;
const PRIMARY_COLOR = '#14b8a6';

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
  const isMobile = useSelector((store: RootState) => store.authSlice?.isMobile);

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
    <Flex vertical gap={24} className="check-address-page">
      {/* Header Section */}
      <Flex align="center" gap={12} wrap>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
          }}
        >
          <MapPin size={24} color="white" />
        </div>
        <div>
          <Typography.Title
            level={2}
            style={{ margin: 0, marginBottom: '4px' }}
          >
            Manzillarni tekshirish
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
            Talabalarning yashash manzillari va tashrif tarixi
          </Typography.Text>
        </div>
      </Flex>

      {/* Filters Card */}
      <Card
        className="shadow-sm"
        style={{
          borderRadius: '16px',
          border: `1px solid ${PRIMARY_COLOR}20`,
          boxShadow: `0 4px 24px ${PRIMARY_COLOR}10`,
        }}
      >
        <Flex vertical gap={16}>
          <Flex align="center" gap={8}>
            <Filter size={20} style={{ color: PRIMARY_COLOR }} />
            <Typography.Title level={5} style={{ margin: 0 }}>
              Filtrlar
            </Typography.Title>
          </Flex>
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
        </Flex>
      </Card>

      {/* Table Card */}
      <Card
        className="shadow-sm visit-list-table"
        style={{
          borderRadius: '16px',
          border: `1px solid ${PRIMARY_COLOR}20`,
          boxShadow: `0 4px 24px ${PRIMARY_COLOR}10`,
        }}
      >
        <CustomTable
          loading={isFetching}
          columns={[
            {
              title: '#',
              render: (_, __, index) =>
                ((pagination?.page || 1) - 1) * pagination?.per_page +
                index +
                1,
              width: 60,
              align: 'center',
            },
            {
              title: (
                <Space size={6}>
                  <User size={16} style={{ color: PRIMARY_COLOR }} />
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
              title: t('const.pinfl'),
              key: 'passport_pin',
              dataIndex: 'passport_pin',
              width: 150,
            },
            {
              title: t('const.group'),
              dataIndex: 'group',
              key: 'group',
              render: group => (
                <Badge
                  color={PRIMARY_COLOR}
                  text={
                    <Typography.Text
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      {group?.name}
                    </Typography.Text>
                  }
                />
              ),
              width: 130,
            },
            {
              title: (
                <Space size={6}>
                  <MapPin size={16} style={{ color: PRIMARY_COLOR }} />
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
                    <Typography.Text
                      type="secondary"
                      className="color-[#14b8a6]"
                    >
                      -
                    </Typography.Text>
                  )}
                </Flex>
              ),
              width: 180,
            },
            {
              title: 'Turar joy turi',
              dataIndex: 'accommodation',
              key: 'accommodation',
              render: accomodation => accomodation?.name,
              width: 120,
            },
            {
              title: t('const.living_status'),
              dataIndex: 'studentLivingStatus',
              key: 'studentLivingStatus',
              render: (status, record) =>
                status ? (
                  <Flex
                    vertical
                    gap={4}
                    align="flex-start"
                    className="cursor-pointer"
                    onClick={() =>
                      handleVisitDrawer({
                        id: record?.id,
                        field: DrawerTabKeys.HISTORY,
                      })
                    }
                  >
                    <LivingStatusTag livingStatus={status} />
                  </Flex>
                ) : (
                  <Typography.Text type="secondary">-</Typography.Text>
                ),
              width: 140,
            },
            {
              title: (
                <Space size={6}>
                  <Calendar size={16} style={{ color: PRIMARY_COLOR }} />
                  <span>{`${t('const.visit')}`}</span>
                </Space>
              ),
              dataIndex: 'tutorVisits',
              key: `visits`,
              align: 'center' as const,
              width: 140,
              render: (visits: ITutorVisit[], record: any) => (
                <Button
                  type="link"
                  className="p-0 w-full flex justify-start"
                  onClick={() =>
                    handleVisitDrawer({
                      id: record?.id,
                      field: DrawerTabKeys.HISTORY,
                    })
                  }
                  style={{
                    padding: 0,
                    height: 'auto',
                  }}
                >
                  <Flex gap={4}>
                    <LivingStatusTag
                      livingStatus={{
                        code: visits?.[0]?._student_living_status,
                        name: visits?.[0]
                          ? moment(
                            visits?.[0]?.created_at,
                            'YYYY-MM-DD HH:mm:ss'
                          ).format('DD.MM.YYYY')
                          : '-',
                      }}
                    />
                    {
                      visits?.length - 1 > 0 && (
                        <Tag>{`+${visits?.length - 1}`}</Tag>
                      )
                    }
                  </Flex>
                </Button>
              ),
            },
            {
              title: t('const.actions'),
              dataIndex: 'id',
              key: 'actions',
              className: 'actions-column',
              align: 'center',
              render: id => (
                <Button
                  type="primary"
                  className="visit-btn"
                  icon={<PlusOutlined />}
                  onClick={() => handleVisitDrawer({ id: String(id) })}
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #0d9488 100%)`,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 500,
                    boxShadow: `0 2px 8px ${PRIMARY_COLOR}40`,
                  }}
                >
                  <span className="visit-btn__text">Tashrif</span>
                </Button>
              ),
              fixed: 'right',
              width: isMobile ? 80 : 120,
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
          <Flex align="center" gap={12}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${PRIMARY_COLOR}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={20} style={{ color: PRIMARY_COLOR }} />
            </div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Manzilga tashrifni qayd etish
            </Typography.Title>
          </Flex>
        }
        height="90vh"
        styles={{
          body: {
            padding: '0 24px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          },
          header: {
            borderBottom: `2px solid ${PRIMARY_COLOR}20`,
          },
        }}
      >
        <CreateVisit />
      </Drawer>
    </Flex>
  );
};

export default CheckAddress;
