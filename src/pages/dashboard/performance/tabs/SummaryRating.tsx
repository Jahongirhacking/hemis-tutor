import { useGetGradeSummaryRatingQuery } from '@/services/student';
import { Divider, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const SummaryRating = () => {
  const { form, values } = useCustomFilter();
  const { data: ratingData, isFetching } = useGetGradeSummaryRatingQuery({
    group_id: values?.[FilterKey.GroupId],
    semester: values?.[FilterKey.Semester],
  });
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
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
            key: 'name',
            width: 250,
            render: student => <CustomLink.Student student={student} />,
          },
          {
            title: t('const.subjects'),
            dataIndex: 'total_subjects',
            key: 'total_subjects',
            render: total => t('const.number_count', { number: total }),
          },
          {
            title: t('const.average_grade'),
            dataIndex: 'average_grade',
            key: 'average_grade',
          },
          {
            title: t('const.status'),
            dataIndex: 'status',
            key: 'status',
          },
        ]}
        dataSource={ratingData?.result?.summary?.map((elem, index) => ({
          ...elem,
          index: index + 1,
        }))}
      />
    </Flex>
  );
};

export default SummaryRating;
