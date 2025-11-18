import { useGetAttendanceStatisticsQuery } from '@/services/student';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter, { FilterKey } from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const getAbsentColor = (percent: number) => {
  if (percent <= 15) return 'blue';
  if (percent <= 30) return 'purple';
  if (percent <= 45) return 'magenta';
  return 'red';
};

const getPresentColor = (percent: number) => {
  if (percent <= 15) return 'red';
  if (percent <= 30) return 'magenta';
  if (percent <= 45) return 'purple';
  return 'blue';
};

const AttendanceStatistics = () => {
  const { form, values } = useCustomFilter();
  const { data: attendanceData, isFetching } = useGetAttendanceStatisticsQuery(
    { ...values }
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
        <CustomFilter.BySemester group_id={values?.[FilterKey.GroupId]} />
      </CustomFilter>

      <CustomTable
        columns={[
          {
            title: t('const.student'),
            key: 'full_name',
            dataIndex: 'full_name',
          },
          {
            title: 'Jami darslar soni',
            key: 'total_lessons',
            dataIndex: 'total_lessons',
            render: total => (
              <Tag>{`${t('const.number_count', { number: total })}`}</Tag>
            ),
          },
          {
            title: `${toFirstCapitalLetter(t('const.not_explicable'))} (${t('const.hours_plural')})`,
            key: 'absent_off',
            render: (_, record) => (
              <Flex gap={8}>
                <Tag color="error">{`${t('const.number_count', { number: record?.absent_sababsiz_count })}`}</Tag>
                <Tag color={getAbsentColor(record?.absent_sababsiz_percent)}>
                  {record?.absent_sababsiz_percent}%
                </Tag>
              </Flex>
            ),
          },
          {
            title: `${toFirstCapitalLetter(t('const.explicable'))} (${t('const.hours_plural')})`,
            key: 'absent_on',
            render: (_, record) => (
              <Flex gap={8}>
                <Tag color="orange">{`${t('const.number_count', { number: record?.absent_sababli_count })}`}</Tag>
                <Tag color={getAbsentColor(record?.absent_sababli_percent)}>
                  {record?.absent_sababli_percent}%
                </Tag>
              </Flex>
            ),
          },
          {
            title: 'Qatnashilgan (soni / foiz)',
            key: 'present',
            render: (_, record) => (
              <Flex gap={8}>
                <Tag color="success">{`${t('const.number_count', { number: record?.present_count })}`}</Tag>
                <Tag color={getPresentColor(record?.present_percent)}>
                  {record?.present_percent}%
                </Tag>
              </Flex>
            ),
          },
        ]}
        dataSource={attendanceData?.result?.students}
        loading={isFetching}
      />
    </Flex>
  );
};

export default AttendanceStatistics;
