import { useGetStudentDetailsQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { Collapse, Descriptions, Flex, Image, Typography } from 'antd';
import { t } from 'i18next';
import LivingStatusTag from './LivingStatusTag';
import LocationButton from './LocationButton';

const StudentAddressInfo = ({ studentId }: { studentId: IStudent['id'] }) => {
  const { data: studentData } = useGetStudentDetailsQuery(
    { id: studentId },
    { skip: !studentId }
  );

  return (
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
                        geolocation={studentData?.result?.student?.geo_location}
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
                    children: studentData?.result?.student?.accommodation?.name,
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
  );
};

export default StudentAddressInfo;
