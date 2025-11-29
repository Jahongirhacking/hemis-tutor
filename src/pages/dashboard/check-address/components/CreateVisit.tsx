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
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import { t } from 'i18next';
import { RefreshCcw, Send } from 'lucide-react';
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
    <Flex
      vertical
      className="mt-3 mb-5 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="w-full"
      >
        <Flex vertical gap={16} align="center" className="w-full">
          {/* ==== FORM FIELDS ==== */}
          <Row gutter={[12, 4]} className="w-full">
            <Col {...ADDRESS_COL_PROPS}>
              <Form.Item
                label="Turar joy turi"
                name={FormNames.ACCOMMADATION}
                rules={[{ required: true, message: 'Turar joy majburiy' }]}
                className="font-semibold"
              >
                <CustomSelect
                  allowClear
                  loading={isAccomodationFetching}
                  style={{ minWidth: 200 }}
                  className="!rounded-lg"
                  options={accomodationsData?.result?.items?.map(i => ({
                    label: i?.name,
                    value: String(i?.code),
                  }))}
                  placeholder="Turar joy turini tanlang"
                />
              </Form.Item>
            </Col>

            <Col {...ADDRESS_COL_PROPS}>
              <Form.Item
                label="Viloyat"
                name={FormNames.PROVINCE}
                rules={[{ required: true, message: 'Viloyat majburiy' }]}
                className="font-semibold"
              >
                <CustomSelect
                  allowClear
                  loading={isProvinceFetching}
                  style={{ minWidth: 200 }}
                  className="!rounded-lg"
                  options={provincesData?.result?.items?.map(i => ({
                    label: i?.name,
                    value: String(i?.code),
                  }))}
                  placeholder="Viloyat tanlang"
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
                label="Tuman"
                name={FormNames.DISTRICT}
                rules={[{ required: true, message: 'Tuman majburiy' }]}
                className="font-semibold"
              >
                <CustomSelect
                  allowClear
                  loading={isDistrictFetching}
                  style={{ minWidth: 200 }}
                  className="!rounded-lg"
                  options={districtData?.result?.items?.map(i => ({
                    label: i?.name,
                    value: String(i?.code),
                  }))}
                  disabled={!values?.[FormNames.PROVINCE]}
                  placeholder="Tuman tanlang"
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
                label="Mahalla"
                name={FormNames.TERRAIN}
                rules={[{ required: true, message: 'Mahalla majburiy' }]}
                className="font-semibold"
              >
                <CustomSelect
                  allowClear
                  loading={isTerrainsFetching}
                  style={{ minWidth: 200 }}
                  className="!rounded-lg"
                  options={terrainsData?.result?.items?.map(i => ({
                    label: i?.name,
                    value: String(i?.code),
                  }))}
                  placeholder="Mahalla tanlang"
                  disabled={!values?.[FormNames.DISTRICT]}
                />
              </Form.Item>
            </Col>

            <Col {...ADDRESS_COL_PROPS}>
              <Form.Item
                label="Yashash holati"
                name={FormNames.LIVING_STATUS}
                rules={[{ required: true, message: 'Yashash holati majburiy' }]}
                className="font-semibold"
              >
                <Select
                  allowClear
                  loading={isLivingStatusFetching}
                  style={{ minWidth: 200 }}
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
                  placeholder="Yashash holatini tanlang"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider className="w-full !my-2" />

          {/* ==== ADDRESS & COMMENT ==== */}
          <Row gutter={[12, 4]} className="w-full">
            <Col {...COMMENT_COL_PROPS}>
              <Form.Item
                label={t('const.current_address_info')}
                name={FormNames.ADDRESS}
                rules={[
                  {
                    required: true,
                    message: t('const.current_address_info') + ' majburiy',
                  },
                ]}
                className="font-semibold"
              >
                <Input.TextArea
                  className="!rounded-lg border-gray-300"
                  placeholder={`${t('const.current_address_info')}...`}
                />
              </Form.Item>
            </Col>

            <Col {...COMMENT_COL_PROPS}>
              <Form.Item
                label={t('const.comment')}
                name={FormNames.COMMENT}
                rules={[
                  { required: true, message: t('const.comment') + ' majburiy' },
                ]}
                className="font-semibold"
              >
                <Input.TextArea
                  className="!rounded-lg border-gray-300"
                  placeholder={`${t('const.comment')}...`}
                />
              </Form.Item>
            </Col>

            {/* ==== MAP ==== */}
            <Col {...COMMENT_COL_PROPS}>
              <Form.Item name={FormNames.GEO} style={{ display: 'none' }} />

              <Flex
                vertical
                gap={6}
                align="flex-start"
                className="overflow-hidden"
              >
                {location ? (
                  <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <YandexMap
                      style={{ width: '200px', height: '120px' }}
                      lat={location?.lat}
                      lng={location?.lng}
                    />
                  </div>
                ) : (
                  <Typography.Text strong className="text-red-600">
                    Tizimga joylashuv olish uchun ruxsat bering!
                  </Typography.Text>
                )}

                <Button
                  type="link"
                  icon={<RefreshCcw size={16} />}
                  className="!p-0 text-blue-600 hover:text-blue-800"
                  onClick={handleLocate}
                >
                  Joylashuvni yangilash
                </Button>
              </Flex>
            </Col>
          </Row>

          {/* ==== SUBMIT BUTTON ==== */}
          <Button
            type="primary"
            htmlType="submit"
            icon={isLoading ? <LoadingOutlined /> : <Send size={16} />}
            className="ml-auto px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition"
            disabled={isLoading}
          >
            Yuborish
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default CreateVisit;
