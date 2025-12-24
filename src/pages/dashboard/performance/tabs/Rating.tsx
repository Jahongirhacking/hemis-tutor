import { usePagination } from '@/hooks/usePagination';
import { useGetGradeRatingQuery } from '@/services/student';
import { IRating } from '@/services/student/type';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Table, Typography } from 'antd';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';
import GradeTag from '../components/GradeTag';

const Rating = () => {
  const { pagination } = usePagination();
  const { form, values } = useCustomFilter();
  const { data: ratingData, isFetching } = useGetGradeRatingQuery(
    {
      group_id: values?.[FilterKey.GroupId],
      semester: values?.[FilterKey.Semester],
      education_year: values?.[FilterKey.EducationYear],
      ...pagination,
    },
    { skip: !values?.[FilterKey.EducationYear] }
  );
  const { t } = useTranslation();

  const expandedRowRender = (record: IRating) => (
    <Flex vertical gap={8}>
      <Typography.Text
        type="secondary"
        className="flex flex-wrap gap-2 items-center"
      >
        <User size={16} /> {record?.student?.full_name} - Reyting qaydnomasi
      </Typography.Text>
      <Table
        columns={[
          {
            title: t('const.subject'),
            dataIndex: 'subject',
            key: 'subject',
            render: subject => toFirstCapitalLetter(subject?.name),
          },
          {
            title: toFirstCapitalLetter(t('const.credit_plural')),
            dataIndex: 'credit',
            key: 'credit',
            render: credit =>
              credit ? `${credit} ${t('const.credit_plural')}` : '-',
          },
          {
            title: t('const.mark'),
            dataIndex: 'grade',
            key: 'grade',
            render: grade => <GradeTag grade={grade}>{grade || '-'}</GradeTag>,
          },
          {
            title: t('const.overall'),
            dataIndex: 'total_point',
            key: 'total_point',
            render: total => <GradeTag grade={total}>{total || '-'}</GradeTag>,
          },
        ]}
        dataSource={record?.subjects}
        pagination={false}
        rowKey={'student'}
      />
    </Flex>
  );

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
        paginationTotal={ratingData?.result?.pagination?.total_count}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: IRating) => record?.subjects?.length > 0,
          expandIcon: ({ expanded, onExpand, record }) =>
            record.subjects?.length ? (
              <Button
                type="primary"
                onClick={e => onExpand(record, e)}
                size="middle"
                shape="circle"
              >
                {expanded ? (
                  <EyeInvisibleOutlined
                    style={{ cursor: 'pointer', fontSize: 16 }}
                  />
                ) : (
                  <EyeOutlined style={{ cursor: 'pointer', fontSize: 16 }} />
                )}
              </Button>
            ) : (
              <span style={{ width: 16, display: 'inline-block' }} />
            ),
        }}
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
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
            width: 180,
            render: group => <CustomLink.Group group={group} />,
          },
          {
            title: t('const.subjects'),
            dataIndex: 'subjects',
            key: 'subjects',
            render: (subjects: IRating['subjects']) => (
              <Flex gap={8} wrap>
                {subjects?.map(subject => (
                  <GradeTag
                    grade={subject?.total_point}
                  >{`${[subject?.subject?.name, subject?.total_point].filter(e => !!e).join(' - ')}`}</GradeTag>
                ))}
              </Flex>
            ),
            width: 400,
          },
        ]}
        dataSource={ratingData?.result?.ratings || []}
        rowKey={record => record?.student?.id}
      />
    </Flex>
  );
};

export default Rating;
