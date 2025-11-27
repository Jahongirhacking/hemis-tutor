import { usePagination } from '@/hooks/usePagination';
import { useGetStudentListQuery } from '@/services/student';
import { Divider, Flex } from 'antd';
import { useEffect } from 'react';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../components/CustomLink';

const StudentList = () => {
  const { form, values } = useCustomFilter();
  const { pagination, setPagination } = usePagination();
  const { data: studentsData, isFetching } = useGetStudentListQuery({
    ...pagination,
    ...values,
    group: values?.[FilterKey.GroupId],
  });

  useEffect(() => {
    setPagination({
      page: undefined,
      per_page: undefined,
    });
  }, [values]);

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.BySearch />
        <CustomFilter.ByGroup />
        <CustomFilter.ByPinfl />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        columns={[
          {
            title: '#',
            render: (_, __, index) =>
              ((pagination?.page || 1) - 1) * pagination?.per_page + index + 1,
            width: 60,
          },
          {
            title: 'JShShIR',
            key: 'passport_pin',
            dataIndex: 'passport_pin',
          },
          {
            title: 'Talaba',
            key: 'full_name',
            dataIndex: 'full_name',
            render: (_, record) => <CustomLink.Student student={record} />,
            width: 250,
          },
          {
            title: "Yo'nalishi",
            key: 'specialty',
            dataIndex: 'specialty',
            render: specialty => `${specialty?.code} - ${specialty?.name}`,
          },
          {
            title: "O'quv yili",
            key: 'education_year',
            dataIndex: 'education_year',
          },
          {
            title: "Ta'lim turi / shakli",
            key: 'edu_type',
            render: (_, record) =>
              `${record?.education_type} / ${record?.education_form}`,
          },
          {
            title: 'Kurs',
            key: 'level',
            dataIndex: 'level',
            render: level => level?.name,
          },
          {
            title: 'Guruh',
            key: 'group',
            dataIndex: 'group',
            render: group => <CustomLink.Group group={group} />,
          },
        ]}
        dataSource={studentsData?.result?.students}
        loading={isFetching}
        pagination={false}
        paginationTotal={studentsData?.result?.pagination?.total_count}
        scroll={{ x: 1100, y: 'max(calc(100dvh - 450px), 300px)' }}
      />
    </Flex>
  );
};

export default StudentList;
