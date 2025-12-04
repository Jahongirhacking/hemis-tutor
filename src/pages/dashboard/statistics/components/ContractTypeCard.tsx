import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { IGrantType } from '@/services/profile/type';
import { PieChartFilled } from '@ant-design/icons';
import { Card, Flex, Skeleton, Typography } from 'antd';
import { t } from 'i18next';
import { useMemo } from 'react';
import {
  Bar,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ExpandItem, IStatisticsCardProps } from './interface';

const NOT_GIVEN = -1;

const ContractTypeCard = ({
  CustomTooltip,
  COLORS,
  isDark,
  PRIMARY,
  ...props
}: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.COURSE_STATISTICS}`,
  });

  // Course statistics for chart
  const courseData =
    Array.from(
      (data?.result?.course_statistics || [])
        ?.reduce<Map<number, IGrantType>>((acc, curr) => {
          curr?.payment_forms?.forEach(t => {
            if (acc.has(t?.payment_form_code || NOT_GIVEN)) {
              acc.get(t?.payment_form_code || NOT_GIVEN).count += t?.count;
            } else {
              acc.set(t?.payment_form_code || NOT_GIVEN, { ...t });
            }
          });
          return acc;
        }, new Map())
        ?.values()
    )?.map(item => ({
      name: item?.payment_form_code ? item?.payment_form_name : 'Berilmagan',
      value: item.count,
      percent: item.percent,
    })) ?? [];

  const sumCount = useMemo(
    () => courseData?.reduce((acc, curr) => acc + curr?.value, 0),
    [courseData]
  );

  if (data && !data?.result?.course_statistics?.[0]?.payment_forms) return null;

  return (
    <Card
      {...props}
      className={`w-full`}
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Shartnoma turi bo'yicha
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {!isFetching ? (
        <Skeleton.Node
          active
          className="!m-auto !w-full !h-[180px] !overflow-hidden"
        >
          <PieChartFilled style={{ fontSize: 100, color: '#bfbfbf' }} />
        </Skeleton.Node>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart data={courseData}>
            <Pie
              data={courseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={PRIMARY}
              {...(courseData?.length <= 20
                ? {
                  label: ({ name, value }) =>
                    `${name}: ${((value / sumCount) * 100).toFixed(0)}%`,
                }
                : {})}
            >
              {courseData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS?.[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, value } = payload?.[0]?.payload;
                  return (
                    <Card
                      style={{
                        background: isDark
                          ? 'rgba(15, 23, 42, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',
                        border: `1px solid ${PRIMARY}40`,
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                    >
                      {name}:{' '}
                      <span style={{ color: PRIMARY }}>
                        {t('const.number_count', { number: value })}
                      </span>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" fill={PRIMARY} radius={[8, 8, 0, 0]} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <Flex vertical gap={12} style={{ marginTop: '16px' }}>
        {isFetching ? (
          <Skeleton.Input active className="!w-full" />
        ) : (
          <>
            {courseData?.map((item, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Flex gap={8} align="center">
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: COLORS?.[index % COLORS.length],
                    }}
                  />
                  <Typography.Text
                    style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                  >
                    {item?.name}
                  </Typography.Text>
                </Flex>
                <Typography.Text strong style={{ color: PRIMARY }}>
                  {item?.value}
                </Typography.Text>
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </Card>
  );
};

export default ContractTypeCard;
