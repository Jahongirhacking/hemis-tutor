import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { useGetGpaScoreQuery } from '@/services/dashboard';
import { IGpaScore } from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { getExamMark } from '@/utils/markFunc';
import { toFirstCapitalLetter, toFirstLowerLetter } from '@/utils/stringFunc';
import { Button, Card, Flex, Skeleton, Table, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GpaCalculatorBtn from '../../GPA/components/GpaCalculatorBtn';

const GpaScore = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetGpaScoreQuery();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const gpaScores = data?.data;

  const handleClickMoreDetail = record => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.GpaDetail);
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.in_detail'),
        props: { gpaScore: record },
      })
    );
  };

  const columns: TableColumnsType<IGpaScore> = [
    {
      title: t('const.academic_year'),
      key: 'academic_year',
      dataIndex: 'academic_year',
      render: (_, record) => record?.educationYear?.name,
      className: 'gpa-academic_year-column',
    },
    {
      title: t('const.course'),
      key: 'course',
      dataIndex: 'course',
      render: (_, record) => record?.level?.name,
    },
    {
      title: 'GPA',
      key: 'gpa',
      dataIndex: 'gpa',
      render: value =>
        getExamMark(
          {
            grade: Number.parseFloat(value),
            max_ball: 5,
            percent: (Number.parseFloat(value) / 5) * 100,
          },
          'GPA',
          false
        ),
    },
    {
      title: toFirstCapitalLetter(t('const.credit_singular')),
      key: 'credit_sum',
      dataIndex: 'credit_sum',
      className: 'gpa-credit-column',
    },
    {
      title: t('const.debt'),
      key: 'debt',
      dataIndex: 'debt',
      render: (_, record) => `${record?.debt_subjects} / ${record?.subjects}`,
      className: 'gpa-debt-column',
    },
    {
      title: t('const.gpa_method'),
      key: 'method',
      dataIndex: 'method',
      render: (_, record) =>
        record?.method === 'all_year'
          ? t('const.total_gpa')
          : t('const.annual_gpa'),
      className: 'gpa-method-column',
    },
    {
      title: t('const.in_detail'),
      key: 'actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => handleClickMoreDetail(record)}>
          Batafsil
        </Button>
      ),
      className: 'gpa-actions-column',
    },
  ];

  if (!gpaScores)
    return (
      <NotFoundAnimation.Card
        description={`GPA ${toFirstLowerLetter(t('const.info'))} ${t('const.not_found')}`}
      />
    );

  return (
    <Flex vertical gap={12}>
      <Table
        className="gpa-table"
        columns={columns}
        dataSource={[...gpaScores].sort(
          (gpaScore1, gpaScore2) =>
            Number(gpaScore2?.educationYear?.code) -
            Number(gpaScore1?.educationYear?.code)
        )}
        rowKey={'id'}
        pagination={false}
        locale={{
          emptyText: isFetching ? (
            <Skeleton active />
          ) : (
            <NotFoundAnimation.Card
              description={`${t('const.info')} ${t('const.not_found')}`}
            />
          ),
          filterReset: t('const.clean'),
        }}
      />
      <Card className="gpa-calculator-part" style={{ marginLeft: 'auto' }}>
        <Flex gap={12} align="center" justify="flex-end">
          <GpaCalculatorBtn type="primary">GPA hisoblagich</GpaCalculatorBtn>
        </Flex>
      </Card>
    </Flex>
  );
};

export default GpaScore;
