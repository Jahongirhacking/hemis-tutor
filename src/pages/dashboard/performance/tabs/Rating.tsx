import { useGetGradeRatingQuery } from '@/services/student';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const Rating = () => {
  const { form, values } = useCustomFilter();
  const { data: ratingData, isFetching } = useGetGradeRatingQuery({
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

      <CustomTable
        loading={isFetching}
        columns={[
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'name',
            render: student => student?.full_name,
          },
          {
            title: t('const.subject'),
            dataIndex: 'subject',
            key: 'subject',
          },
          {
            title: 'Nazorat turi',
            dataIndex: 'exam_type',
            key: 'exam_type',
          },
          {
            title: toFirstCapitalLetter(t('const.credit_plural')),
            dataIndex: 'credit',
            key: 'credit',
          },
          {
            title: t('const.midterm_exam'),
            dataIndex: 'midterm_point',
            key: 'midterm',
          },
          {
            title: t('const.final_exam'),
            dataIndex: 'final_exam_point',
            key: 'final',
          },
          {
            title: t('const.overall'),
            dataIndex: 'total_point',
            key: 'total',
          },
          {
            title: t('const.mark'),
            dataIndex: 'grade',
            key: 'grade',
          },
        ]}
        dataSource={ratingData?.result?.ratings}
      />
    </Flex>
  );
};

export default Rating;
