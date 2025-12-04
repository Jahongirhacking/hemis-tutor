import { useGetGradeDebtorsQuery } from '@/services/student';
import { IGradeDebtor, IStudent } from '@/services/student/type';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Divider, Flex, Tag } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';
import CustomLink from '../../students/components/CustomLink';

const encodeSubjectName = (name: string) => `__${name}__`;
const decodeSubjectName = (name: string) =>
  toFirstCapitalLetter(name?.replace(/__/g, ''));

const Debtors = () => {
  const { form, values } = useCustomFilter();
  const { data: debtorsData, isFetching } = useGetGradeDebtorsQuery(
    {
      group_id: values?.[FilterKey.GroupId],
      semester: values?.[FilterKey.Semester],
      education_year: values?.[FilterKey.EducationYear],
    },
    { skip: !values?.[FilterKey.EducationYear] }
  );
  const { t } = useTranslation();

  const debtsByStudent = useMemo(() => {
    const map = new Map<IStudent['id'], IGradeDebtor[]>();
    debtorsData?.result?.debtors?.forEach(d => {
      if (!d) return;
      const sid = d.student_id;
      if (map.has(sid)) {
        map.get(sid)!.push(d);
      } else {
        map.set(sid, [d]);
      }
    });

    return Array.from(map.values()).map(list => {
      const first = list[0];
      const values = list.reduce<Record<string, number>>((acc, curr) => {
        if (curr?._subject)
          acc[encodeSubjectName(curr._subject)] = Number(curr?.credit) || 0;
        return acc;
      }, {});
      return {
        id: first?.student_id,
        student: first?._student,
        semester: first?._semester,
        group: first?._group,
        level: first?.level,
        specialty: first?.specialty,
        values,
      };
    });
  }, [debtorsData]);

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
        columns={[
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'student',
            render: (student, record) => (
              <CustomLink.Student
                student={{ full_name: student, id: record?.id }}
              />
            ),
            width: 250,
          },
          {
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
            width: 200,
          },
          ...(values?.[FilterKey.GroupId]
            ? Object.keys(debtsByStudent?.[0]?.values || {})?.map(key => ({
                title: decodeSubjectName(key),
                key,
                render: (_: any, record: any) => (
                  <Tag
                    color={record?.values?.[key] > 0 ? 'orange' : 'default'}
                  >{`${record?.values?.[key]} ${t('const.credit_plural')}`}</Tag>
                ),
                width: 150,
              }))
            : [
                {
                  title: t('const.subjects'),
                  key: 'subjects',
                  render: (_: any, record: any) => (
                    <Flex gap={8} wrap>
                      {Object.keys(record?.values || {})?.map(key => (
                        <Tag
                          key={key}
                        >{`${decodeSubjectName(key)} - ${record?.values?.[key]} ${t('const.credit_plural')}`}</Tag>
                      ))}
                    </Flex>
                  ),
                  width: 700,
                },
              ]),
          {
            title: `${t('const.total')} ${t('const.credit_plural')}`,
            key: 'total',
            render: (_, record) => (
              <Tag
                color={'red'}
              >{`${Object.values((record?.values || {}) as object)?.reduce((acc, curr) => acc + (Number(curr) || 0), 0)} ${t('const.credit_plural')}`}</Tag>
            ),
            fixed: 'right',
            width: 150,
          },
        ]}
        dataSource={debtsByStudent}
        scroll={{ x: 1200, y: 'max(calc(100dvh - 450px), 300px)' }}
      />
    </Flex>
  );
};

export default Debtors;
