import { usePagination } from '@/hooks/usePagination';
import { useGetStudentListQuery } from '@/services/student';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { Button, Divider, Flex } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const StudentList = () => {
  const { form, values } = useCustomFilter();
  const { pagination, setSearchParams, searchParams, setPagination } =
    usePagination();
  const { data: studentsData, isFetching } = useGetStudentListQuery({
    ...pagination,
    ...values,
    group: values?.[FilterKey.GroupId],
  });
  const { t } = useTranslation();

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
            title: 'Talaba',
            key: 'full_name',
            dataIndex: 'full_name',
            width: 250,
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
            fixed: 'right',
            render: (_, record) => (
              <Flex gap={8} wrap align="center" justify="center">
                <Button
                  type="primary"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set(
                      SearchParams.Drawer,
                      DrawerChildTypes.StudentInfo
                    );
                    params.set(SearchParams.DrawerProps, String(record?.id));
                    setSearchParams(params);
                  }}
                >
                  {t('const.in_detail')}
                </Button>
              </Flex>
            ),
          },
        ]}
        dataSource={studentsData?.result?.students}
        loading={isFetching}
        pagination={false}
        paginationTotal={studentsData?.result?.pagination?.total_count}
      />
    </Flex>
  );
};

export default StudentList;
