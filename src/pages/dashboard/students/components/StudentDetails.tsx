import DashedList from '@/components/DashedList';
import { useGetStudentDetailsQuery } from '@/services/student';
import { Flex, Image, Skeleton, Typography } from 'antd';
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
    <Flex vertical gap={12}>
      <Image
        src={studentData?.result?.student?.image}
        fallback="/images/avatar.png"
        width={120}
        preview={false}
      />
      <Typography.Title level={5} style={{ margin: 0 }}>
        {studentData?.result?.student?.full_name}
      </Typography.Title>
      <DashedList
        list={[
          {
            label: 'Talaba ID',
            value: studentData?.result?.student?.student_id_number,
          },
          {
            label: "Ta'lim turi",
            value: studentData?.result?.meta?.education_type?.name,
          },
          {
            label: "To'lov shakli",
            value: studentData?.result?.meta?.payment_form?.name,
          },
          { label: 'Guruh', value: studentData?.result?.meta?.group?.name },
          {
            label: 'Telefon raqami',
            value: studentData?.result?.student?.phone,
          },
        ]}
      />
    </Flex>
  );
};

export default StudentDetails;
