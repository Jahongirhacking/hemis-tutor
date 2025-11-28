import { useGetStudentGpaQuery } from '@/services/student';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Divider, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const MAX_BALL = 5;

const GPA = () => {
  const { form, values } = useCustomFilter();
  const { data: gpaData, isFetching } = useGetStudentGpaQuery({
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
            width: 60
          },
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'name',
            width: 250,
            render: student => <CustomLink.Student student={student} />,
          },
          {
            title: toFirstCapitalLetter(t('const.credit_plural')),
            dataIndex: 'credit_sum',
            key: 'credit_sum',
            render: (credit) => credit || '-',
          },
          {
            title: toFirstCapitalLetter(t('const.semester')),
            dataIndex: 'semester',
            key: 'semester',
          },
          {
            title: t('const.subjects'),
            dataIndex: 'total_subjects',
            key: 'total_subjects',
            render: total => t('const.number_count', { number: total }),
          },
          {
            title: toFirstCapitalLetter(t('const.status')),
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            render: gpa =>
              getExamMark(
                {
                  grade: gpa,
                  max_ball: MAX_BALL,
                  percent: (gpa / MAX_BALL) * 100,
                },
                'GPA',
                false
              ),
            fixed: 'right',
          },
        ]}
        dataSource={gpaData?.result?.gpa_records?.map((elem, index) => ({ ...elem, index: index + 1 }))}
      />
    </Flex>
  );
};

export default GPA;
