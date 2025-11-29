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
  Col, Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography
} from 'antd';
import { t } from 'i18next';
import { Home, MapPin, MessageSquare, RefreshCcw, Send } from 'lucide-react';
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
  const { location, handleLocate } = useUserLocation();

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
            className="shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{
              borderRadius: '12px',
              border: '1px solid #e8e8e8',
            }}
          >
            <div className="mb-4">
              <Space align="center" size={8}>
                <MapPin size={20} className="text-blue-600" />
                <Typography.Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                  Manzil ma'lumotlari
                </Typography.Title>
              </Space>
            </div>

            <Row gutter={[16, 16]}>
              <Col {...ADDRESS_COL_PROPS}>
                <Form.Item
                  label={
                    <Space align="center" size={4}>
                      <Home size={14} />
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
                    className="!rounded-lg"
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
                    className="!rounded-lg"
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
                    className="!rounded-lg"
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
                    className="!rounded-lg"
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
                  label={<span style={{ fontWeight: 500 }}>Yashash holati</span>}
                  name={FormNames.LIVING_STATUS}
                  rules={[{ required: true, message: 'Yashash holati majburiy' }]}
                >
                  <Select
                    allowClear
                    loading={isLivingStatusFetching}
                    size="large"
                    className="!rounded-lg"
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
          </Card>

          {/* Details & Location Card */}
          <Card
            className="shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{
              borderRadius: '12px',
              border: '1px solid #e8e8e8',
            }}
          >
            <div className="mb-4">
              <Space align="center" size={8}>
                <MessageSquare size={20} className="text-green-600" />
                <Typography.Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                  Qo'shimcha ma'lumotlar
                </Typography.Title>
              </Space>
            </div>

            <Row gutter={[16, 16]}>
              <Col {...COMMENT_COL_PROPS}>
                <Form.Item
                  label={<span style={{ fontWeight: 500 }}>{t('const.current_address_info')}</span>}
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
                    className="!rounded-lg"
                    placeholder={`${t('const.current_address_info')}...`}
                    rows={4}
                    style={{
                      resize: 'none',
                    }}
                  />
                </Form.Item>
              </Col>

              <Col {...COMMENT_COL_PROPS}>
                <Form.Item
                  label={<span style={{ fontWeight: 500 }}>{t('const.comment')}</span>}
                  name={FormNames.COMMENT}
                  rules={[
                    { required: true, message: t('const.comment') + ' majburiy' },
                  ]}
                >
                  <Input.TextArea
                    size="large"
                    className="!rounded-lg"
                    placeholder={`${t('const.comment')}...`}
                    rows={4}
                    style={{
                      resize: 'none',
                    }}
                  />
                </Form.Item>
              </Col>

              {/* Map Section */}
              <Col span={24}>
                <Form.Item name={FormNames.GEO} style={{ display: 'none' }} />

                <Card
                  className="bg-gradient-to-br from-blue-50 to-indigo-50"
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #d6e4ff',
                  }}
                >
                  <Space direction="vertical" size={12} className="w-full">
                    <Space align="center" size={8}>
                      <MapPin size={18} className="text-blue-600" />
                      <Typography.Text strong style={{ fontSize: '15px' }}>
                        Joriy joylashuv
                      </Typography.Text>
                    </Space>

                    {location ? (
                      <div
                        className="rounded-xl overflow-hidden shadow-lg border-2 border-white"
                        style={{
                          maxWidth: '100%',
                          height: '240px',
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
                        className="flex items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-white"
                        style={{
                          height: '240px',
                        }}
                      >
                        <Space direction="vertical" align="center" size={12}>
                          <MapPin size={48} className="text-blue-300" />
                          <Typography.Text
                            strong
                            className="text-center"
                            style={{
                              color: '#1890ff',
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
                      ghost
                      icon={<RefreshCcw size={16} />}
                      className="!rounded-lg"
                      onClick={handleLocate}
                      block
                      size="large"
                    >
                      Joylashuvni yangilash
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Submit Button */}
          <Flex justify="flex-end" className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              icon={isLoading ? <LoadingOutlined /> : <Send size={18} />}
              size="large"
              className="px-8 !rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: 500,
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