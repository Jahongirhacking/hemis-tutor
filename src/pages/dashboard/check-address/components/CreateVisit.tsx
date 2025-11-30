import YandexMap from '@/components/YandexMap';
import useUserLocation from '@/hooks/useUserLocation';
import {
  useCreateVisitMutation,
  useGetAccommodationsQuery,
  useGetDistrictsQuery,
  useGetLivingStatusesQuery,
  useGetProvincesQuery,
  useGetTerrainsQuery,
} from '@/services/student';
import { ICreateVisitReq, IStudent } from '@/services/student/type';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { t } from 'i18next';
import {
  CheckCircle,
  Home,
  MapPin,
  MessageSquare,
  Navigation,
  Send,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomSelect from '../../components/CustomSelect';
import useCustomFilter from '../../components/forms/useCustomFilter';
import { CREATE_VISIT_DRAWER } from '../CreateVisitPage';
import LivingStatusTag from './LivingStatusTag';

enum FormNames {
  PROVINCE = '_current_province',
  LIVING_STATUS = '_student_living_status',
  ACCOMMADATION = '_accommodation',
  DISTRICT = '_current_district',
  TERRAIN = '_current_terrain',
  ADDRESS = 'current_address',
  GEO = 'geolocation',
  COMMENT = 'comment',
}

const ADDRESS_COL_PROPS = {
  span: 8,
  xs: 24,
  sm: 12,
  lg: 8,
};

const COMMENT_COL_PROPS = {
  span: 12,
  xs: 24,
  sm: 12,
  xl: 12,
};

const PRIMARY_COLOR = '#14b8a6';

const CreateVisit = ({
  studentId,
  onSuccess,
}: {
  studentId: IStudent['id'];
  onSuccess: () => void;
}) => {
  const { form, values } = useCustomFilter();
  const [createVisit, { isLoading, isSuccess }] = useCreateVisitMutation();
  const [searchParams] = useSearchParams();

  const { data: livingStatusData, isFetching: isLivingStatusFetching } =
    useGetLivingStatusesQuery();
  const { data: provincesData, isFetching: isProvinceFetching } =
    useGetProvincesQuery();
  const { data: accomodationsData, isFetching: isAccomodationFetching } =
    useGetAccommodationsQuery();
  const { data: districtData, isFetching: isDistrictFetching } =
    useGetDistrictsQuery(
      { province: values?.[FormNames.PROVINCE] },
      { skip: !values?.[FormNames.PROVINCE] }
    );
  const { data: terrainsData, isFetching: isTerrainsFetching } =
    useGetTerrainsQuery(
      { district: values?.[FormNames.DISTRICT] },
      { skip: !values?.[FormNames.DISTRICT] }
    );
  const { location, handleLocate, isLocating } = useUserLocation();

  const handleSubmit = useCallback(
    async (values: ICreateVisitReq) => {
      try {
        if (isLoading) return;
        if (!location) {
          message.warning("Joylashuvingizni ko'rsating!");
          return;
        }
        if (studentId) {
          await createVisit({ ...values, id: studentId })?.unwrap();
        }
      } catch (err) {
        message.destroy();
        message.error("Ma'lumot yuborishda xatolik");
      }
    },
    [isLoading, location]
  );

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
      form.resetFields();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (location) {
      form.setFieldValue(FormNames.GEO, `${location?.lat},${location?.lng}`);
    }
  }, [location]);

  useEffect(() => {
    if (!searchParams.has(CREATE_VISIT_DRAWER)) {
      form.resetFields();
    }
  }, [searchParams]);

  return (
    <div className="py-6">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="w-full"
      >
        <Space direction="vertical" size={24} className="w-full">
          {/* Location Information Card */}
          <Card
            className="shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              borderRadius: '16px',
              border: `2px solid ${PRIMARY_COLOR}30`,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <Flex vertical gap={20}>
              <Flex align="center" gap={12}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #0d9488 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={24} color="#fff" />
                </div>
                <div>
                  <Typography.Title
                    level={5}
                    style={{ margin: 0, fontWeight: 600 }}
                  >
                    Manzil ma'lumotlari
                  </Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: '13px' }}
                  >
                    Talabaning hozirgi manzil ma'lumotlarini kiriting
                  </Typography.Text>
                </div>
              </Flex>

              <Row gutter={[16, 16]}>
                <Col {...ADDRESS_COL_PROPS}>
                  <Form.Item
                    label={
                      <Space align="center" size={6}>
                        <Home size={16} style={{ color: PRIMARY_COLOR }} />
                        <span style={{ fontWeight: 500 }}>Turar joy turi</span>
                      </Space>
                    }
                    name={FormNames.ACCOMMADATION}
                    rules={[{ required: true, message: 'Turar joy majburiy' }]}
                  >
                    <CustomSelect
                      allowClear
                      loading={isAccomodationFetching}
                      size="large"
                      style={{ borderRadius: '10px' }}
                      options={accomodationsData?.result?.items?.map(i => ({
                        label: i?.name,
                        value: String(i?.code),
                      }))}
                      placeholder="Tanlang"
                    />
                  </Form.Item>
                </Col>

                <Col {...ADDRESS_COL_PROPS}>
                  <Form.Item
                    label={<span style={{ fontWeight: 500 }}>Viloyat</span>}
                    name={FormNames.PROVINCE}
                    rules={[{ required: true, message: 'Viloyat majburiy' }]}
                  >
                    <CustomSelect
                      allowClear
                      loading={isProvinceFetching}
                      size="large"
                      style={{ borderRadius: '10px' }}
                      options={provincesData?.result?.items?.map(i => ({
                        label: i?.name,
                        value: String(i?.code),
                      }))}
                      placeholder="Tanlang"
                      onChange={() => {
                        form.setFieldsValue({
                          [FormNames.DISTRICT]: undefined,
                          [FormNames.TERRAIN]: undefined,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col {...ADDRESS_COL_PROPS}>
                  <Form.Item
                    label={<span style={{ fontWeight: 500 }}>Tuman</span>}
                    name={FormNames.DISTRICT}
                    rules={[{ required: true, message: 'Tuman majburiy' }]}
                  >
                    <CustomSelect
                      allowClear
                      loading={isDistrictFetching}
                      size="large"
                      style={{ borderRadius: '10px' }}
                      options={districtData?.result?.items?.map(i => ({
                        label: i?.name,
                        value: String(i?.code),
                      }))}
                      disabled={!values?.[FormNames.PROVINCE]}
                      placeholder="Tanlang"
                      onChange={() => {
                        form.setFieldsValue({
                          [FormNames.TERRAIN]: undefined,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col {...ADDRESS_COL_PROPS}>
                  <Form.Item
                    label={<span style={{ fontWeight: 500 }}>Mahalla</span>}
                    name={FormNames.TERRAIN}
                    rules={[{ required: true, message: 'Mahalla majburiy' }]}
                  >
                    <CustomSelect
                      allowClear
                      loading={isTerrainsFetching}
                      size="large"
                      style={{ borderRadius: '10px' }}
                      options={terrainsData?.result?.items?.map(i => ({
                        label: i?.name,
                        value: String(i?.code),
                      }))}
                      placeholder="Tanlang"
                      disabled={!values?.[FormNames.DISTRICT]}
                    />
                  </Form.Item>
                </Col>

                <Col {...ADDRESS_COL_PROPS}>
                  <Form.Item
                    label={
                      <span style={{ fontWeight: 500 }}>Yashash holati</span>
                    }
                    name={FormNames.LIVING_STATUS}
                    rules={[
                      { required: true, message: 'Yashash holati majburiy' },
                    ]}
                  >
                    <Select
                      allowClear
                      loading={isLivingStatusFetching}
                      size="large"
                      style={{ borderRadius: '10px' }}
                      options={livingStatusData?.result?.items?.map(i => ({
                        label: (
                          <LivingStatusTag
                            livingStatus={{
                              code: i?.code,
                              name: i?.name,
                            }}
                          />
                        ),
                        value: String(i?.code),
                      }))}
                      placeholder="Tanlang"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Flex>
          </Card>

          {/* Details & Location Card */}
          <Card
            className="shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              borderRadius: '16px',
              border: `2px solid ${PRIMARY_COLOR}30`,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <Flex vertical gap={20}>
              <Flex align="center" gap={12}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageSquare size={24} color="#fff" />
                </div>
                <div>
                  <Typography.Title
                    level={5}
                    style={{ margin: 0, fontWeight: 600 }}
                  >
                    Qo'shimcha ma'lumotlar
                  </Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: '13px' }}
                  >
                    Tashrif haqida batafsil izoh qoldiring
                  </Typography.Text>
                </div>
              </Flex>

              <Row gutter={[16, 16]}>
                <Col {...COMMENT_COL_PROPS}>
                  <Form.Item
                    label={
                      <span style={{ fontWeight: 500 }}>
                        {t('const.current_address_info')}
                      </span>
                    }
                    name={FormNames.ADDRESS}
                    rules={[
                      {
                        required: true,
                        message: t('const.current_address_info') + ' majburiy',
                      },
                    ]}
                  >
                    <Input.TextArea
                      size="large"
                      style={{
                        borderRadius: '10px',
                        resize: 'none',
                      }}
                      placeholder={`${t('const.current_address_info')}...`}
                      rows={4}
                    />
                  </Form.Item>
                </Col>

                <Col {...COMMENT_COL_PROPS}>
                  <Form.Item
                    label={
                      <span style={{ fontWeight: 500 }}>
                        {t('const.comment')}
                      </span>
                    }
                    name={FormNames.COMMENT}
                    rules={[
                      {
                        required: true,
                        message: t('const.comment') + ' majburiy',
                      },
                    ]}
                  >
                    <Input.TextArea
                      size="large"
                      style={{
                        borderRadius: '10px',
                        resize: 'none',
                      }}
                      placeholder={`${t('const.comment')}...`}
                      rows={4}
                    />
                  </Form.Item>
                </Col>

                {/* Map Section */}
                <Col span={24}>
                  <Form.Item name={FormNames.GEO} style={{ display: 'none' }} />

                  <Card
                    style={{
                      borderRadius: '16px',
                      border: `2px solid ${PRIMARY_COLOR}30`,
                      background: `linear-gradient(135deg, ${PRIMARY_COLOR}10 0%, ${PRIMARY_COLOR}05 100%)`,
                      overflow: 'hidden',
                    }}
                  >
                    <Space direction="vertical" size={16} className="w-full">
                      <Flex justify="space-between" align="center">
                        <Flex align="center" gap={10}>
                          <Navigation
                            size={20}
                            style={{ color: PRIMARY_COLOR }}
                          />
                          <Typography.Text strong style={{ fontSize: '16px' }}>
                            Joriy joylashuv
                          </Typography.Text>
                        </Flex>
                        {location && (
                          <Flex align="center" gap={6}>
                            <CheckCircle
                              size={16}
                              style={{ color: '#10b981' }}
                            />
                            <Typography.Text
                              style={{ color: '#10b981', fontSize: '13px' }}
                            >
                              Joylashuv aniqlandi
                            </Typography.Text>
                          </Flex>
                        )}
                      </Flex>

                      {location ? (
                        <div
                          className="rounded-xl overflow-hidden shadow-lg border-2 border-white"
                          style={{
                            maxWidth: '100%',
                            height: '280px',
                          }}
                        >
                          <YandexMap
                            style={{ width: '100%', height: '100%' }}
                            lat={location?.lat}
                            lng={location?.lng}
                          />
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center rounded-xl border-2 border-dashed bg-white"
                          style={{
                            height: '280px',
                            borderColor: PRIMARY_COLOR,
                          }}
                        >
                          <Space direction="vertical" align="center" size={16}>
                            <div
                              style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: `${PRIMARY_COLOR}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <MapPin
                                size={32}
                                style={{ color: PRIMARY_COLOR }}
                              />
                            </div>
                            <Typography.Text
                              strong
                              className="text-center"
                              style={{
                                color: PRIMARY_COLOR,
                                fontSize: '15px',
                              }}
                            >
                              Tizimga joylashuv olish uchun ruxsat bering!
                            </Typography.Text>
                          </Space>
                        </div>
                      )}

                      <Button
                        type="primary"
                        icon={
                          isLocating ? (
                            <LoadingOutlined />
                          ) : (
                            <Navigation size={16} />
                          )
                        }
                        style={{
                          background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #0d9488 100%)`,
                          border: 'none',
                          borderRadius: '10px',
                          height: '48px',
                          fontWeight: 500,
                          boxShadow: `0 4px 12px ${PRIMARY_COLOR}40`,
                        }}
                        onClick={() => handleLocate(isLocating)}
                        loading={isLocating}
                        block
                        size="large"
                      >
                        {isLocating
                          ? 'Aniqlanmoqda...'
                          : 'Joylashuvni aniqlash'}
                      </Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Flex>
          </Card>

          {/* Submit Button */}
          <Flex justify="flex-end" className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              icon={isLoading ? <LoadingOutlined /> : <Send size={18} />}
              size="large"
              disabled={isLoading}
              style={{
                background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #0d9488 100%)`,
                border: 'none',
                borderRadius: '12px',
                height: '56px',
                fontSize: '16px',
                fontWeight: 600,
                padding: '0 48px',
                boxShadow: `0 4px 16px ${PRIMARY_COLOR}40`,
              }}
            >
              Yuborish
            </Button>
          </Flex>
        </Space>
      </Form>
    </div>
  );
};

export default CreateVisit;
