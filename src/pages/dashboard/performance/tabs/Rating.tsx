import { useGetGradeRatingQuery } from '@/services/student';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Divider, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const MAX_BALL = 5;

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

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
        columns={[
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'name',
            width: 250,
            render: student => <CustomLink.Student student={student} />,
          },
          {
            title: t('const.subject'),
            dataIndex: 'subject',
            key: 'subject',
          },
          {
            title: toFirstCapitalLetter(t('const.credit_plural')),
            dataIndex: 'credit',
            key: 'credit',
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
            render: grade =>
              getExamMark(
                {
                  grade: Number(grade),
                  max_ball: MAX_BALL,
                  percent: (Number(grade) / MAX_BALL) * 100,
                },
                t('const.mark'),
                false
              ),
          },
        ]}
        dataSource={ratingData?.result?.ratings}
      />
    </Flex>
  );
};

export default Rating;
