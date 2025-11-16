import DashedList from '@/components/DashedList';
import { usePagination } from '@/hooks/usePagination';
import { useGetStudentListQuery } from '@/services/student';
import { IStudent } from '@/services/student/type';
import { RootState } from '@/store/store';
import { Button, Flex, Image, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomDrawer from '../../components/CustomDrawer';
import CustomPagination from '../../components/CustomPagination';

const StudentList = () => {
  const { currentGroup } = useSelector((store: RootState) => store.authSlice);
  const { pagination, setSearchParams } = usePagination();
  const { data: studentsData, isFetching } = useGetStudentListQuery(
    { ...pagination, group: currentGroup?.id },
    { skip: !currentGroup?.id }
  );
  const { t } = useTranslation();
  const [openDetails, setOpenDetails] =
    useState<IStudent['student_id_number']>(null);

  useEffect(() => {
    if (currentGroup?.id) {
      const params = new URLSearchParams();
      setSearchParams(params);
    }
  }, [currentGroup?.id]);

  return (
    <Flex vertical gap={12}>
      <Table
        columns={[
          {
            title: 'Talaba',
            key: 'full_name',
            dataIndex: 'full_name',
          },
          {
            title: 'Talaba ID',
            key: 'student_id_number',
            dataIndex: 'student_id_number',
          },
          {
            title: 'Guruh',
            key: 'group',
            dataIndex: 'group',
            render: group => group?.name,
          },
          {
            title: 'JShShIR',
            key: 'passport_pin',
            dataIndex: 'passport_pin',
          },
          {
            title: t('const.actions'),
            dataIndex: 'student_id_number',
            key: 'student_id_number',
            fixed: 'right',
            render: id => (
              <Button type="link" onClick={() => setOpenDetails(id)}>
                {t('const.in_detail')}
              </Button>
            ),
          },
        ]}
        dataSource={studentsData?.result?.students}
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 700 }}
        pagination={false}
      />

      <CustomDrawer
        open={!!openDetails}
        onClose={() => setOpenDetails(null)}
        children={(() => {
          const student = studentsData?.result?.students?.find(
            s => s?.student_id_number === openDetails
          );
          return (
            <Flex vertical gap={12}>
              <Image
                src={student?.image}
                fallback="/images/avatar.png"
                width={120}
                preview={false}
              />
              <Typography.Title level={5} style={{ margin: 0 }}>
                {student?.full_name}
              </Typography.Title>
              <DashedList
                list={[
                  { label: 'Talaba ID', value: student?.student_id_number },
                  { label: "Ta'lim turi", value: student?.education_type },
                  { label: "To'lov shakli", value: student?.payment_form },
                  { label: 'Guruh', value: student?.group?.name },
                  { label: 'Telefon raqami', value: student?.phone },
                ]}
              />
            </Flex>
          );
        })()}
      />
      <CustomPagination total={studentsData?.result?.pagination?.total_count} />
    </Flex>
  );
};

export default StudentList;
