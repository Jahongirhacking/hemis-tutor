import { useGetAttendanceStatisticsQuery } from '@/services/student';
import { RootState } from '@/store/store';
import { Flex, Table, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
  const { currentGroup, currentSemester } = useSelector(
    (store: RootState) => store?.authSlice
  );
  const { data: attendanceData, isFetching } = useGetAttendanceStatisticsQuery(
    { group_id: currentGroup?.id, semester: currentSemester?.code },
    { skip: !currentGroup?.id || !currentSemester?.code }
  );
  const { t } = useTranslation();

  return (
    <Flex vertical gap={12}>
      <Table
        columns={[
          {
            title: 'Talaba',
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
            title: 'Sababsiz (soni / foiz)',
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
            title: 'Sababli (soni / foiz)',
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
        rowKey={'id'}
        loading={isFetching}
        scroll={{ x: 700 }}
      />
    </Flex>
  );
};

export default AttendanceStatistics;
