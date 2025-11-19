import { useGetStudentDetailsQuery } from '@/services/student';
import { Descriptions, Flex, Image, Skeleton, Typography } from 'antd';
import { useMemo } from 'react';

const StudentDetails = ({ props: id }: { props?: string }) => {
  const studentId = useMemo(() => Number(id), []);
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
    <Flex vertical gap={12} align="center">
      <Image
        src={studentData?.result?.student?.image}
        fallback="/images/avatar.png"
        width={120}
        preview={false}
        style={{
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      />
      <Typography.Title level={5} style={{ margin: 0, textAlign: 'center' }}>
        {studentData?.result?.student?.full_name}
      </Typography.Title>
      <Descriptions
        className="w-full"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        bordered
        items={[
          {
            label: 'Talaba ID',
            children: studentData?.result?.student?.student_id_number,
          },
          {
            label: "Ta'lim turi",
            children: studentData?.result?.meta?.education_type?.name,
          },
          {
            label: "To'lov shakli",
            children: studentData?.result?.meta?.payment_form?.name,
          },
          {
            label: 'Guruh',
            children: studentData?.result?.meta?.group?.name,
          },
          {
            label: 'Telefon raqami',
            children: studentData?.result?.student?.phone || '-',
          },
        ]}
      />
    </Flex>
  );
};

export default StudentDetails;
