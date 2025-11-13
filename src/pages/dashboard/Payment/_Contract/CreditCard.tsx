import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import { ICurrentContractData } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { converToFloatingFormat } from '@/utils/numberFunc';
import { Card, Flex, Tag, Typography } from 'antd';
import DOMPurify from 'dompurify';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CreditInfoCard } from './CreditInfoCard';

const CreditCard = ({
  currentYearContract,
}: {
  currentYearContract: Pick<
    ICurrentContractData,
    'debit' | 'credit' | 'eduContractSum'
  > & { updated_at: number };
}) => {
  const { t } = useTranslation();
  const profile = useSelector((store: RootState) => store.authSlice?.profile);

  const diffAmount = useMemo(
    () =>
      currentYearContract?.debit +
      currentYearContract?.credit -
      currentYearContract?.eduContractSum,
    [currentYearContract]
  );

  return (
    <Flex vertical gap={79} className="payment__info-cards">
      <Card className="payment__overall-info-card">
        <AnimatedMessage>
          <Flex vertical gap={10} className="payment__contract-text">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t('dashboard.contract.paid_information_text', {
                    fullname: profile?.data?.full_name,
                    year: profile?.data?.semester?.education_year?.name,
                    amount: converToFloatingFormat(
                      currentYearContract?.debit ?? 0
                    ),
                  })
                ),
              }}
            />
            {(diffAmount ?? 0) !== 0 ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    (diffAmount ?? 0) > 0
                      ? t('dashboard.contract.debt_information_text', {
                          amount: converToFloatingFormat(diffAmount ?? 0),
                        })
                      : t('dashboard.contract.overpaid_information_text', {
                          amount: converToFloatingFormat(-(diffAmount ?? 0)),
                        })
                  ),
                }}
              />
            ) : (
              <Typography.Text>
                {t('dashboard.contract.no_debts_text')}
              </Typography.Text>
            )}
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t('dashboard.contract.rest_amount_text', {
                    amount: converToFloatingFormat(
                      currentYearContract?.credit ?? 0
                    ),
                  })
                ),
              }}
            />
            <Typography.Text>
              {`${t('const.last_update_time')}: ${moment.unix(currentYearContract?.updated_at).format('DD.MM.YYYY HH:mm')}`}
            </Typography.Text>
          </Flex>
        </AnimatedMessage>
      </Card>

      {(diffAmount ?? 0) > 0 && (
        <Card className="payment__previous-debt-info-card">
          <Flex
            wrap
            justify="center"
            style={{ columnGap: '50px', rowGap: '20px' }}
          >
            <Typography.Text strong>
              {t('dashboard.contract.debt_from_prev_year')}
            </Typography.Text>
            <Flex
              vertical
              className="debt-status status-check"
              align="flex-end"
              gap={4}
            >
              <Tag className="status-tag">
                {converToFloatingFormat(diffAmount ?? 0)} {t('const.uzs')}
              </Tag>
              <Typography.Text strong className="status-text">
                {t('dashboard.contract.not_paid')}
              </Typography.Text>
            </Flex>
          </Flex>
        </Card>
      )}

      <>
        <CreditInfoCard
          contractAmount={currentYearContract?.eduContractSum}
          paidAmount={currentYearContract?.debit}
        />
      </>
    </Flex>
  );
};

export default CreditCard;
