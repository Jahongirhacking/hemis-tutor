import { usePagination } from '@/hooks/usePagination';
import { useGetGradeDebtorsQuery } from '@/services/student';
import { IGradeDebtor } from '@/services/student/type';
import { Divider, Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const Debtors = () => {
  const { pagination } = usePagination();
  const { form, values } = useCustomFilter();
  const { data: debtorsData, isFetching } = useGetGradeDebtorsQuery(
    {
      group_id: values?.[FilterKey.GroupId],
      semester: values?.[FilterKey.Semester],
      education_year: values?.[FilterKey.EducationYear],
      ...pagination
    },
    { skip: !values?.[FilterKey.EducationYear] }
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByEducationYear />
        <CustomFilter.ByGroup
          education_year={values?.[FilterKey.EducationYear]}
        />
        <CustomFilter.BySemester
          group_id={values?.[FilterKey.GroupId]}
          education_year={values?.[FilterKey.EducationYear]}
        />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
        pagination={false}
        paginationTotal={debtorsData?.result?.pagination?.total_count}
        columns={[
          {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 60,
          },
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'student',
            render: (student) => (
              <CustomLink.Student
                student={student}
              />
            ),
            width: 250,
          },
          {
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
            render: (group) => (
              <CustomLink.Group
                group={group}
              />
            ),
            width: 200,
          },
          {
            title: t('const.subjects'),
            dataIndex: 'subjects',
            key: 'subjects',
            render: (subjects: IGradeDebtor['subjects']) => (
              <Flex gap={8} wrap>
                {subjects?.map(subject => <Tag color={'red'}>{`${subject?.name} - ${subject?.credit} ${t('const.credit_plural')}`}</Tag>)}
              </Flex>
            ),
            width: 400,
          },
        ]}
        dataSource={debtorsData?.result?.debtors || []}
        scroll={{ x: 1200, y: 'max(calc(100dvh - 450px), 300px)' }}
      />
    </Flex>
  );
};

export default Debtors;
