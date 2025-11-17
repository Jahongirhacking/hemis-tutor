import { usePagination } from '@/hooks/usePagination';
import { useGetStudentListQuery } from '@/services/student';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { Button, Flex, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomPagination from '../../components/CustomPagination';
import useCustomTable from '../../components/hooks/useCustomTable';

const StudentList = () => {
  const { pagination, setSearchParams, searchParams } = usePagination();
  const { data: studentsData, isFetching } = useGetStudentListQuery({
    ...pagination,
  });
  const { t } = useTranslation();
  const { emptyText } = useCustomTable({});

  // useEffect(() => {
  //   if (currentGroup?.id) {
  //     setPagination({
  //       page: undefined,
  //       per_page: undefined,
  //       search: undefined
  //     })
  //   }
  // }, [currentGroup?.id]);

  return (
    <Flex vertical gap={12}>
      <Table
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
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set(
                      SearchParams.Drawer,
                      DrawerChildTypes.StudentDetails
                    );
                    params.set(SearchParams.DrawerProps, String(record?.id));
                    setSearchParams(params);
                  }}
                >
                  {t('const.in_detail')}
                </Button>

                <Button
                  type="primary"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set(
                      SearchParams.Drawer,
                      DrawerChildTypes.StudentPassport
                    );
                    params.set(
                      SearchParams.DrawerProps,
                      String(record?.student_id_number)
                    );
                    setSearchParams(params);
                  }}
                >
                  {'Talaba pasporti'}
                </Button>
              </Flex>
            ),
          },
        ]}
        dataSource={studentsData?.result?.students}
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 700 }}
        pagination={false}
        locale={{ emptyText }}
      />

      <CustomPagination total={studentsData?.result?.pagination?.total_count} />
    </Flex>
  );
};

export default StudentList;
