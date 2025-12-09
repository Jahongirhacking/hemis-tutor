import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { toFirstLowerLetter } from '@/utils/stringFunc';
import { Card, Empty, Flex, Skeleton, Typography } from 'antd';
import { BarChartHorizontalBig, MapPin } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomSelect from '../../components/CustomSelect';
import { StatisticsContext } from '../DashboardPage';
import { ExpandItem, IStatisticsCardProps } from './interface';

const DistrictsCard = ({
  isDark,
  PRIMARY,
  COLORS,
  ...props
}: IStatisticsCardProps) => {
  const { educationYear, groupId, semester } = useContext(StatisticsContext);
  const { data: regionData, isFetching } = useGetDashboardStatisticsQuery({
    education_year: educationYear,
    group_id: groupId,
    semester,
    expand: `${ExpandItem.DISTRICT_STATISTICS}`,
  });
  const [activeRegion, setActiveRegion] = useState();
  const districtData = useMemo(
    () =>
      activeRegion
        ? regionData?.result?.district_statistics
            ?.find(d => d?.province_code === activeRegion)
            ?.districts?.map(stat => ({
              name: stat?.district_name,
              value: stat?.count,
              percent: stat?.percent,
            }))
        : regionData?.result?.district_statistics?.map(stat => ({
            name: stat?.province_name,
            value: stat?.total_count,
            percent: stat?.total_percent,
          })),
    [regionData, activeRegion]
  );
  const { t } = useTranslation();

  const regionInput = useMemo(
    () =>
      !!regionData?.result?.district_statistics?.length &&
      regionData?.result?.district_statistics?.[0]?.province_code && (
        <CustomSelect
          allowClear
          placeholder="Viloyat tanlang"
          options={regionData?.result?.district_statistics?.map(d => ({
            label: d?.province_name,
            value: d?.province_code,
          }))}
          value={activeRegion}
          onChange={value => setActiveRegion(value)}
        />
      ),
    [regionData]
  );

  if (regionData && !regionData?.result?.district_statistics) return null;

  const chartIcon = useMemo(
    () => <BarChartHorizontalBig size={100} style={{ color: '#bfbfbf' }} />,
    []
  );

  return (
    <Card
      {...props}
      className={`w-full h-full`}
      title={
        <Flex justify="space-between" align="center" wrap>
          <Typography.Title
            level={4}
            style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
          >
            Hududlar bo'yicha
          </Typography.Title>
          <Flex gap={6} align="center">
            <div className="hidden xl:block">{regionInput}</div>
            <MapPin size={20} style={{ color: PRIMARY }} />
          </Flex>
        </Flex>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      {isFetching || regionData?.result?.district_statistics?.length ? (
        <>
          <Flex vertical gap={24}>
            <div className="ml-auto block xl:hidden">{regionInput}</div>
            {isFetching ? (
              <Skeleton.Node
                active
                className="!m-auto !w-full !h-[140px] !overflow-hidden"
              >
                {chartIcon}
              </Skeleton.Node>
            ) : (
              <ResponsiveContainer width="100%" className="!min-h-[350px]">
                <BarChart data={districtData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#ffffff20' : '#00000010'}
                  />
                  <XAxis
                    dataKey="value"
                    type="number"
                    stroke={isDark ? '#fff' : '#666'}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke={isDark ? '#fff' : '#666'}
                    width={140}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const { name, value, percent } = payload?.[0]?.payload;
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
                            {`${name}`}:{' '}
                            <span style={{ color: PRIMARY }}>
                              {`${t('const.number_count', { number: value })} ${toFirstLowerLetter(t('const.student'))} (${percent}%)`}
                            </span>
                          </Card>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {districtData?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS?.[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Flex>
        </>
      ) : (
        <Empty
          image={chartIcon}
          description={`${t('const.info')} ${t('const.not_found')}`}
        />
      )}
    </Card>
  );
};

export default DistrictsCard;
