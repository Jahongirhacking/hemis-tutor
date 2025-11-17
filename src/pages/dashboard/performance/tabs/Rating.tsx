import { useGetGradeRatingQuery } from '@/services/student';
import { RootState } from '@/store/store';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex, Form, Select, Table } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useCustomTable from '../../components/hooks/useCustomTable';

const Rating = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const { data: ratingData, isFetching } = useGetGradeRatingQuery(
    { ...values },
    { skip: !values?.group_id }
  );
  const { profile } = useSelector((store: RootState) => store.authSlice);
  const { t } = useTranslation();
  const { emptyText } = useCustomTable({});

  useEffect(() => {
    if (profile) {
      form.setFieldValue('group_id', profile?.groups?.[0]?.id);
    }
  }, [profile]);

  return (
    <Flex vertical gap={18}>
      <Form form={form} layout="vertical">
        <Flex gap={8} align="center">
          <Form.Item name={'group_id'} style={{ margin: 0 }}>
            <Select
              style={{ width: 180 }}
              placeholder={'Guruh tanlang'}
              options={profile?.groups?.map(g => ({
                label: g?.name,
                value: g?.id,
              }))}
            />
          </Form.Item>
        </Flex>
      </Form>

      <Table
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
        rowKey={'id'}
        scroll={{ x: 800 }}
        locale={{ emptyText }}
      />
    </Flex>
  );
};

export default Rating;
