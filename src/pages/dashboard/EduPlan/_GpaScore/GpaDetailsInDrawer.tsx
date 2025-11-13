import DashedList from '@/components/DashedList';
import { IGpaScore } from '@/services/dashboard/type';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { useTranslation } from 'react-i18next';

const GpaDetailsInDrawer = ({ gpaScore }: { gpaScore?: IGpaScore }) => {
  const { t } = useTranslation();

  return (
    <DashedList
      className="drawer__dashed-list"
      list={[
        {
          label: t('const.academic_year'),
          value: gpaScore?.educationYear?.name,
        },
        {
          label: t('const.course'),
          value: gpaScore?.level?.name,
        },
        {
          label: 'GPA',
          value: getExamMark(
            {
              grade: Number.parseFloat(gpaScore?.gpa),
              max_ball: 5,
              percent: (Number.parseFloat(gpaScore?.gpa) / 5) * 100,
            },
            'GPA',
            false
          ),
        },
        {
          label: toFirstCapitalLetter(t('const.credit_singular')),
          value: gpaScore?.credit_sum,
        },
        {
          label: t('const.debt'),
          value: gpaScore?.debt_subjects,
        },
        {
          label: t('const.number_of', { name: t('const.subjects') }),
          value: gpaScore?.subjects,
        },
        {
          label: t('const.gpa_method'),
          value:
            gpaScore?.method === 'all_year'
              ? t('const.total_gpa')
              : t('const.annual_gpa'),
        },
      ]}
    />
  );
};

export default GpaDetailsInDrawer;
