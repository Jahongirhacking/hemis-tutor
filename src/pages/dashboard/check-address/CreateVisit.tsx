import YandexMap from '@/components/YandexMap';
import useUserLocation from '@/hooks/useUserLocation';
import {
    useCreateVisitMutation,
    useGetAccommodationsQuery,
    useGetDistrictsQuery,
    useGetLivingStatusesQuery,
    useGetProvincesQuery,
    useGetStudentDetailsQuery,
    useGetTerrainsQuery,
} from '@/services/student';
import { ICreateVisitReq } from '@/services/student/type';
import { LoadingOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Collapse,
    Descriptions,
    Divider,
    Flex,
    Form,
    Image,
    Input,
    message,
    Row,
    Select,
    Typography,
} from 'antd';
import { RefreshCcw, Send } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useCustomFilter from '../components/forms/useCustomFilter';
import LivingStatusTag from './components/LivingStatusTag';
import LocationButton from './components/LocationButton';

export const CREATE_VISIT_DRAWER = 'visit-drawer';

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

const CreateVisit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const studentId = useMemo(
        () => Number(searchParams.get(CREATE_VISIT_DRAWER)),
        [searchParams]
    );
    const { data: studentData } = useGetStudentDetailsQuery(
        { id: studentId },
        { skip: !studentId }
    );
    const { t } = useTranslation();
    const { form, values } = useCustomFilter();
    const { data: livingStatusData, isFetching: isLivingStatusFetching } = useGetLivingStatusesQuery();
    const { data: provincesData, isFetching: isProvinceFetching } = useGetProvincesQuery();
    const { data: accomodationsData, isFetching: isAccomodationFetching } = useGetAccommodationsQuery();
    const { data: terrainsData, isFetching: isTerrainsFetching } = useGetTerrainsQuery();
    const { data: districtData, isFetching: isDistrictFetching } = useGetDistrictsQuery(
        { province: values?.[FormNames.PROVINCE] },
        { skip: !values?.[FormNames.PROVINCE] }
    );
    const { location, handleLocate } = useUserLocation();
    const [createVisit, { isLoading, isSuccess }] = useCreateVisitMutation();

    const handleSubmit = useCallback(async (values: ICreateVisitReq) => {
        try {
            if (isLoading) return;
            if (!location) {
                message.warning("Joylashuvingizni ko'rsating!");
            }
            await createVisit({ ...values, geolocation: `${location?.lat},${location?.lng}` })?.unwrap();
        } catch (err) {
            message.destroy();
            message.error("Ma'lumot yuborishda xatolik")
        }
    }, [isLoading, location]);

    useEffect(() => {
        if (isSuccess) {
            const params = new URLSearchParams(searchParams);
            params.delete(CREATE_VISIT_DRAWER);
            setSearchParams(params);
        }
    }, [isSuccess])

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={18} align="center">
                <Flex vertical gap={4} align="center">
                    <Image
                        src={studentData?.result?.student?.image}
                        width={130}
                        preview={false}
                        fallback="/images/avatar.png"
                    />
                    <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: 'center' }}
                    >
                        {studentData?.result?.student?.full_name}
                    </Typography.Title>
                </Flex>

                <Collapse
                    style={{ width: '100%' }}
                    expandIconPosition="end"
                    items={[
                        {
                            label: "Talaba ma'lumoti",
                            children: (
                                <Descriptions
                                    bordered
                                    style={{ width: '100%' }}
                                    items={[
                                        {
                                            label: t('const.current_address_info'),
                                            children: (
                                                <LocationButton
                                                    current_address={
                                                        studentData?.result?.student?.current_address
                                                    }
                                                    geolocation={
                                                        studentData?.result?.student?.geo_location
                                                    }
                                                />
                                            ),
                                        },
                                        {
                                            label: 'Viloyat',
                                            children:
                                                studentData?.result?.student?.current_province?.name,
                                        },
                                        {
                                            label: 'Tuman',
                                            children:
                                                studentData?.result?.student?.current_district?.name,
                                        },
                                        {
                                            label: 'Hudud',
                                            children:
                                                studentData?.result?.student?.current_terrain?.name,
                                        },
                                        {
                                            label: 'Turar joy',
                                            children:
                                                studentData?.result?.student?.accommodation?.name,
                                        },
                                        {
                                            label: t('const.status'),
                                            children: (
                                                <LivingStatusTag
                                                    livingStatus={
                                                        studentData?.result?.student?.student_living_status
                                                    }
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                />
            </Flex>

            <Divider>Tashrifni qayd etish</Divider>

            <Flex vertical className="mb-4">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Flex vertical gap={12} align="center">
                        <Row gutter={[12, 4]} className="w-full">
                            <Col {...ADDRESS_COL_PROPS}>
                                <Form.Item
                                    label="Turar joy turi"
                                    name={FormNames.ACCOMMADATION}
                                    rules={[{ required: true, message: 'Turar joy majburiy' }]}
                                >
                                    <Select
                                        allowClear
                                        loading={isAccomodationFetching}
                                        style={{ minWidth: 200 }}
                                        options={accomodationsData?.result?.items?.map(i => ({
                                            label: i?.name,
                                            value: i?.code,
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
                                    <Select
                                        allowClear
                                        loading={isProvinceFetching}
                                        style={{ minWidth: 200 }}
                                        options={provincesData?.result?.items?.map(i => ({
                                            label: i?.name,
                                            value: i?.code,
                                        }))}
                                        placeholder="Viloyat tanlang"
                                    />
                                </Form.Item>
                            </Col>

                            <Col {...ADDRESS_COL_PROPS}>
                                <Form.Item
                                    label="Tuman"
                                    name={FormNames.DISTRICT}
                                    rules={[{ required: true, message: 'Tuman majburiy' }]}
                                >
                                    <Select
                                        allowClear
                                        loading={isDistrictFetching}
                                        style={{ minWidth: 200 }}
                                        options={districtData?.result?.items?.map(i => ({
                                            label: i?.name,
                                            value: i?.code,
                                        }))}
                                        disabled={!values?.[FormNames.PROVINCE]}
                                        placeholder="Tuman tanlang"
                                    />
                                </Form.Item>
                            </Col>

                            <Col {...ADDRESS_COL_PROPS}>
                                <Form.Item
                                    label="Hudud"
                                    name={FormNames.TERRAIN}
                                    rules={[{ required: true, message: 'Hudud majburiy' }]}
                                >
                                    <Select
                                        allowClear
                                        loading={isTerrainsFetching}
                                        style={{ minWidth: 200 }}
                                        options={terrainsData?.result?.items?.map(i => ({
                                            label: i?.name,
                                            value: i?.code,
                                        }))}
                                        placeholder="Hudud tanlang"
                                    />
                                </Form.Item>
                            </Col>

                            <Col {...ADDRESS_COL_PROPS}>
                                <Form.Item
                                    label="Yashash holati"
                                    name={FormNames.LIVING_STATUS}
                                    rules={[
                                        { required: true, message: 'Yashash holati majburiy' },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        loading={isLivingStatusFetching}
                                        style={{ minWidth: 200 }}
                                        options={livingStatusData?.result?.items?.map(i => ({
                                            label: i?.name,
                                            value: i?.code,
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
        </Flex>
    );
};

export default CreateVisit;
