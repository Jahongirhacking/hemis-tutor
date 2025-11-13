import { converToFloatingFormat } from '@/utils/numberFunc';
import { toFirstLowerLetter } from '@/utils/stringFunc';
import { Card, Flex, Progress, Tag, Typography } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

// Memoized CreditInfoCard
export const CreditInfoCard = React.memo(
  ({
    contractAmount,
    paidAmount,
  }: {
    contractAmount: number;
    paidAmount: number;
  }) => {
    const { t } = useTranslation();

    return (
      <Card className="payment__current-info-card">
        <Flex
          className="card-content"
          wrap
          justify="space-between"
          align="flex-end"
        >
          <Flex vertical gap={8}>
            <Flex gap={4} align="flex-end">
              <Typography.Title level={3} style={{ marginBottom: -2 }}>
                <CountUp
                  end={contractAmount ?? 0}
                  formattingFn={value => converToFloatingFormat(value)}
                />
              </Typography.Title>
              <Typography.Text strong style={{ color: '#00000073' }}>
                {t('const.uzs')}
              </Typography.Text>
            </Flex>
            <Flex vertical>
              <Typography.Text strong>
                {t('dashboard.contract.contract_sum_text')}
              </Typography.Text>
            </Flex>
          </Flex>

          <Flex
            className="current-status"
            vertical
            gap={10}
            justify="space-between"
            align="flex-end"
          >
            {/* {expandable && <Button icon={<ExpandIconSVG />} onClick={onExpand} />} */}
            <Flex vertical align="flex-start" gap={8}>
              <Tag color="green">
                <Typography.Text strong style={{ color: 'inherit' }}>
                  {converToFloatingFormat(paidAmount ?? 0)} {t('const.uzs')}{' '}
                  {toFirstLowerLetter(t('dashboard.contract.paid'))}
                </Typography.Text>
              </Tag>
              <Progress
                percent={Math.ceil(
                  (paidAmount / (!contractAmount ? Infinity : contractAmount)) *
                    100
                )}
                // showInfo={false}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }
);
