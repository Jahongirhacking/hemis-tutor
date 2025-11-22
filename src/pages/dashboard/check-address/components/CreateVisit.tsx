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
  Typography,
} from 'antd';
import { t } from 'i18next';
import { RefreshCcw, Send } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import CustomSelect from '../../components/CustomSelect';
import useCustomFilter from '../../components/forms/useCustomFilter';

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

  return (
    <Flex vertical className="mt-3 mb-5">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Flex vertical gap={12} align="center">
          <Row gutter={[12, 4]} className="w-full">
            <Col {...ADDRESS_COL_PROPS}>
              <Form.Item
                label="Turar joy turi"
                name={FormNames.ACCOMMADATION}
                rules={[{ required: true, message: 'Turar joy majburiy' }]}
              >
                <CustomSelect
                  allowClear
                  loading={isAccomodationFetching}
                  style={{ minWidth: 200 }}
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
              >
                <CustomSelect
                  allowClear
                  loading={isProvinceFetching}
                  style={{ minWidth: 200 }}
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
              >
                <CustomSelect
                  allowClear
                  loading={isDistrictFetching}
                  style={{ minWidth: 200 }}
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
              >
                <CustomSelect
                  allowClear
                  loading={isTerrainsFetching}
                  style={{ minWidth: 200 }}
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
              >
                <CustomSelect
                  allowClear
                  loading={isLivingStatusFetching}
                  style={{ minWidth: 200 }}
                  options={livingStatusData?.result?.items?.map(i => ({
                    label: i?.name,
                    value: String(i?.code),
                  }))}
                  placeholder="Yashash holatini tanlang"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider className="w-full" style={{ margin: 0 }} />

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
              >
                <Input.TextArea
                  placeholder={`${t('const.current_address_info')}...`}
                />
              </Form.Item>
            </Col>

            <Col {...COMMENT_COL_PROPS}>
              <Form.Item
                label={t('const.comment')}
                name={FormNames.COMMENT}
                rules={[
                  {
                    required: true,
                    message: t('const.comment') + ' majburiy',
                  },
                ]}
              >
                <Input.TextArea placeholder={`${t('const.comment')}...`} />
              </Form.Item>
            </Col>

            <Col {...COMMENT_COL_PROPS}>
              <Form.Item name={FormNames.GEO} style={{ display: 'none' }} />
              <Flex vertical gap={4} align="flex-start">
                {location ? (
                  <YandexMap
                    style={{ width: '100%', height: '100px' }}
                    lat={location?.lat}
                    lng={location?.lng}
                  />
                ) : (
                  <Typography.Text strong>
                    Tizimga joylashuv olish uchun ruxsat bering!
                  </Typography.Text>
                )}
                <Button
                  type="link"
                  icon={<RefreshCcw size={16} />}
                  style={{ padding: 0 }}
                  onClick={handleLocate}
                >
                  Joylashuvni yangilash
                </Button>
              </Flex>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            icon={isLoading ? <LoadingOutlined /> : <Send size={16} />}
            style={{ marginLeft: 'auto' }}
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
