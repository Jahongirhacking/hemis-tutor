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
    education_year: values?.[FilterKey.EducationYear]
  }, { skip: !values?.[FilterKey.EducationYear] });
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByEducationYear
          onChange={() => {
            form.setFieldValue(FilterKey.Semester, undefined);
          }}
        />
        <CustomFilter.ByGroup
          onChange={() => {
            form.setFieldValue(FilterKey.Semester, undefined);
          }}
        />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} education_year={values?.[FilterKey.EducationYear]} />
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
            title: t('const.subject'),
            dataIndex: 'subject',
            key: 'subject',
          },
          {
            title: toFirstCapitalLetter(t('const.credit_plural')),
            dataIndex: 'credit',
            key: 'credit',
            render: credit => credit || '-',
          },
          {
            title: t('const.overall'),
            dataIndex: 'total_point',
            key: 'total',
            render: total => total || '-',
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
        dataSource={ratingData?.result?.ratings?.map((elem, index) => ({
          ...elem,
          index: index + 1,
        }))}
      />
    </Flex>
  );
};

export default Rating;
