import { IAttendance } from '@/services/dashboard/type';
import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const AttendanceDetailsList = ({
  attendance,
}: {
  attendance: IAttendance[];
}) => {
  const { t } = useTranslation();
  const absentOffHours = attendance?.reduce(
    (acc, curr) => acc + curr?.absent_off,
    0
  );
  const absentOnHours = attendance?.reduce(
    (acc, curr) => acc + curr?.absent_on,
    0
  );

  return (
    <Flex wrap className="dashboard__details-list">
      {attendance && (
        <Typography.Text style={{ color: '#9244ff' }}>
          {`${t('const.total')}: 
              ${absentOffHours + absentOnHours} 
              ${absentOffHours + absentOnHours > 1 ? t('const.hours_plural') : t('const.hours_singular')}`}
        </Typography.Text>
      )}

      {absentOnHours > 0 && (
        <Typography.Text style={{ color: '#52c41a' }}>
          {`${toFirstCapitalLetter(t('const.explicable'))}: 
              ${absentOnHours} 
              ${t('const.hours_plural')}`}
        </Typography.Text>
      )}

      {absentOffHours > 0 && (
        <Typography.Text style={{ color: '#eb2f96' }}>
          {`${toFirstCapitalLetter(t('const.not_explicable'))}: 
                ${absentOffHours} 
                ${t('const.hours_plural')}`}
        </Typography.Text>
      )}
    </Flex>
  );
};

export default AttendanceDetailsList;
