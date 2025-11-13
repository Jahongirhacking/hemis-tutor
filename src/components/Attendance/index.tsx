import { IAttendance } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Attendance.module.scss';

const Attendance = ({
  totalHours,
  absentSubjects,
  dateString,
  isActive,
  title,
  onClick,
}: {
  totalHours: number;
  absentSubjects: IAttendance[];
  dateString: string;
  isActive: boolean;
  title?: string;
  onClick: () => void;
}) => {
  const absentHours = absentSubjects?.reduce(
    (acc, curr) => acc + curr?.absent_on + curr?.absent_off,
    0
  );
  const explicableHours = absentSubjects?.reduce(
    (acc, curr) => acc + curr?.absent_on,
    0
  );
  const [absentHeight, setAbsentHeight] = useState<number>(0);
  const themeColor = useSelector((store: RootState) => store.themeSlice?.color);

  useEffect(() => {
    setAbsentHeight(
      (Math.max(absentHours, totalHours * 0.2) / totalHours) * 100
    );
  }, [absentHours, totalHours]);

  return (
    <Flex
      className={`${style['attendance-wrapper']} ${isActive && style['active']}`}
      gap={14}
      align="center"
      justify="space-between"
      vertical
      title={title}
      onClick={onClick}
    >
      {totalHours === 0 ? (
        // No lessons day
        <div
          className={style['attendance-total']}
          style={{
            backgroundColor: themeColor === 'dark' ? '#000' : '#f5f5f5',
          }}
        >
          <div
            className={`${style['attendance-absent']} ${style['not-absent']}`}
            style={{ height: `20%` }}
          >
            <Typography.Text strong>—</Typography.Text>
          </div>
        </div>
      ) : (
        <div
          className={style['attendance-total']}
          style={{
            backgroundColor: themeColor === 'dark' ? '#000' : '#f5f5f5',
          }}
        >
          <div
            className={`${style['attendance-absent']} ${absentHours === 0 ? style['not-absent'] : ''}`}
            style={{ height: `${absentHeight}%` }}
          >
            <Typography.Text strong>{absentHours}</Typography.Text>
            <div
              className={`${style['attendance-absent__explicable']}`}
              style={{
                height: absentHours
                  ? `${(explicableHours / absentHours) * 100}%`
                  : 0,
              }}
            />
          </div>
        </div>
      )}
      <Typography.Text strong>{dateString}</Typography.Text>
    </Flex>
  );
};

export default Attendance;
