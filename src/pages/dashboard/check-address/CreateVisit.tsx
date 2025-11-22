import { useGetStudentDetailsQuery } from "@/services/student";
import { Descriptions, Flex, Image, Typography } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import LivingStatusTag from "./components/LivingStatusTag";

export const CREATE_VISIT_DRAWER = 'visit-drawer';

const CreateVisit = () => {
    const [searchParams] = useSearchParams();
    const studentId = useMemo(() => Number(searchParams.get(CREATE_VISIT_DRAWER)), [searchParams]);
    const { data: studentData } = useGetStudentDetailsQuery({ id: studentId }, { skip: !studentId });
    const { t } = useTranslation();

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
                    <Typography.Title level={4} style={{ margin: 0, textAlign: 'center' }}>{studentData?.result?.student?.full_name}</Typography.Title>
                </Flex>
                <Descriptions
                    bordered
                    style={{ width: '100%' }}
                    items={[
                        { label: t('const.current_address_info'), children: studentData?.result?.student?.current_address },
                        { label: "Viloyat", children: studentData?.result?.student?.current_province?.name },
                        { label: "Tuman", children: studentData?.result?.student?.current_district?.name },
                        { label: "Hudud", children: studentData?.result?.student?.current_terrain?.name },
                        { label: "Turar joy", children: studentData?.result?.student?.accommodation?.name },
                        { label: t('const.status'), children: <LivingStatusTag livingStatus={studentData?.result?.student?.student_living_status} /> },
                    ]}
                />
            </Flex>
        </Flex>
    )
}

export default CreateVisit