import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { Card, Flex, Progress, Skeleton, Statistic, Typography } from 'antd';
import { Banknote } from 'lucide-react';
import { ExpandItem, IStatisticsCardProps } from './interface';

const ContractCard = ({ isDark, PRIMARY }: IStatisticsCardProps) => {
  const { data, isFetching } = useGetDashboardStatisticsQuery({
    expand: `${ExpandItem.CONTRACTS}`,
  });

  return (
    <Card
      className="w-full"
      title={
        <Typography.Title
          level={4}
          style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
        >
          Shartnoma statistikasi
        </Typography.Title>
      }
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${PRIMARY}20`,
        borderRadius: '16px',
      }}
    >
      <Flex vertical gap={20}>
        <Statistic
          title={
            <Typography.Text
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
              }}
            >
              Jami shartnoma summasi
            </Typography.Text>
          }
          value={(data?.result?.contracts?.total_summa ?? 0).toLocaleString()}
          formatter={value =>
            isFetching ? (
              <Skeleton.Button active className="!h-[18px] !w-[100px]" />
            ) : (
              value
            )
          }
          prefix={<Banknote size={16} />}
          valueStyle={{ color: PRIMARY }}
          suffix="so'm"
        />
        <Flex gap={16} wrap>
          <Flex vertical flex={1} className="!min-w-[200px]">
            <Typography.Text
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                marginBottom: '8px',
              }}
            >
              To'langan
            </Typography.Text>
            {isFetching ? (
              <Skeleton.Input className="!w-full" />
            ) : (
              <>
                <Progress
                  percent={Math.round(
                    ((data?.result?.contracts?.paid_summa ?? 0) /
                      (data?.result?.contracts?.total_summa ?? 1)) *
                      100
                  )}
                  strokeColor={PRIMARY}
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                />
                <Typography.Text
                  style={{
                    color: PRIMARY,
                    fontSize: '12px',
                    marginTop: '4px',
                  }}
                >
                  {(data?.result?.contracts?.paid_summa ?? 0).toLocaleString()}{' '}
                  so'm
                </Typography.Text>
              </>
            )}
          </Flex>
          <Flex vertical flex={1} className="!min-w-[200px]">
            <Typography.Text
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                marginBottom: '8px',
              }}
            >
              Qarzdorlik
            </Typography.Text>

            {isFetching ? (
              <Skeleton.Input className="!w-full" />
            ) : (
              <>
                <Progress
                  percent={Math.round(
                    ((data?.result?.contracts?.debt_summa ?? 0) /
                      (data?.result?.contracts?.total_summa ?? 1)) *
                      100
                  )}
                  strokeColor="#f59e0b"
                  trailColor={isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}
                />
                <Typography.Text
                  style={{
                    color: '#f59e0b',
                    fontSize: '12px',
                    marginTop: '4px',
                  }}
                >
                  {(data?.result?.contracts?.debt_summa ?? 0).toLocaleString()}{' '}
                  so'm
                </Typography.Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ContractCard;
