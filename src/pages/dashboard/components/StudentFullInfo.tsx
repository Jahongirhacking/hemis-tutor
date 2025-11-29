import { useGetStudentDetailsQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import {
  Collapse,
  Descriptions,
  Flex,
  Image,
  Skeleton,
  Typography,
} from 'antd';
import { t } from 'i18next';
import LivingStatusTag from '../check-address/components/LivingStatusTag';
import LocationButton from '../check-address/components/LocationButton';

export enum StudentInfoTypes {
  ADDRESS = 'address',
  ACADEMIC = 'academic',
}

const StudentFullInfo = ({
  studentId,
  infoTypes = [StudentInfoTypes.ACADEMIC, StudentInfoTypes.ADDRESS],
}: {
  studentId: IStudent['id'];
  infoTypes?: StudentInfoTypes[];
}) => {
  const { data: studentData, isFetching } = useGetStudentDetailsQuery(
    { id: studentId },
    { skip: !studentId }
  );

  return isFetching ? (
    <Flex vertical gap={12}>
      <Skeleton.Image active />
      <Skeleton active />
    </Flex>
  ) : (
    <Flex vertical gap={18} align="center">
      <Flex vertical gap={4} align="center">
        <Image
          src={studentData?.result?.student?.image}
          width={130}
          preview={false}
          fallback="/images/avatar.png"
        />
        <Typography.Title level={4} style={{ margin: 0, textAlign: 'center' }}>
          {studentData?.result?.student?.full_name}
        </Typography.Title>
      </Flex>

      {infoTypes?.length && (
        <Flex vertical gap={8} className="w-full">
          {infoTypes?.includes(StudentInfoTypes.ACADEMIC) && (
            <Collapse
              className="w-full"
              expandIconPosition="end"
              defaultActiveKey={StudentInfoTypes.ACADEMIC}
              items={[
                {
                  label: "Ta'lim ma'lumoti",
                  key: StudentInfoTypes.ACADEMIC,
                  children: (
                    <Descriptions
                      className="w-full"
                      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
                      // bordered

                      layout="vertical"
                      items={[
                        {
                          label: 'Talaba ID',
                          children:
                            studentData?.result?.student?.student_id_number,
                        },
                        {
                          label: "Ta'lim turi",
                          children:
                            studentData?.result?.meta?.education_type?.name,
                        },
                        {
                          label: "To'lov shakli",
                          children:
                            studentData?.result?.meta?.payment_form?.name,
                        },
                        {
                          label: 'Guruh',
                          children: studentData?.result?.meta?.group?.name,
                        },
                        {
                          label: 'Telefon raqami',
                          children: studentData?.result?.student?.phone ? (
                            <a
                              href={`tel:${studentData?.result?.student?.phone}`}
                            >
                              {studentData?.result?.student?.phone}
                            </a>
                          ) : (
                            '-'
                          ),
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          )}

          {infoTypes?.includes(StudentInfoTypes.ADDRESS) && (
            <Collapse
              className="w-full"
              expandIconPosition="end"
              items={[
                {
                  label: "Manzil ma'lumoti",
                  children: (
                    <Descriptions
                      // bordered
                      layout="vertical"
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
                            studentData?.result?.student?.current_province
                              ?.name,
                        },
                        {
                          label: 'Tuman',
                          children:
                            studentData?.result?.student?.current_district
                              ?.name,
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
                                studentData?.result?.student
                                  ?.student_living_status
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
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default StudentFullInfo;
