import { TearsWithSmileEmoji } from '@/assets/emojis';
import { ChatStarIcon } from '@/assets/icon';
import AnalyzeButton from '@/components/Chat/AnalyzeButton';
import { contract_data_const } from '@/components/Chat/AnalyzeResult/constants';
import DashedList from '@/components/DashedList';
import PaymentSkeleton from '@/components/Skeletons/PaymentSkeleton';
import useTestUniversity from '@/hooks/useTestUniversity';
import { useGetContractInfoQuery } from '@/services/dashboard';
import {
  ICurrentContractData,
  PaymentFormEnum,
} from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { ChatTopic } from '@/utils/config';
import { converToFloatingFormat } from '@/utils/numberFunc';
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Button, Card, Divider, Empty, Flex, Image, Typography } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CreditCard from './CreditCard';
import EduLoan from './EduLoan';
import GrantMessage from './GrantMessage';

interface ICurrentYearContract extends ICurrentContractData {
  source: 'localStorage' | 'api';
  updated_at: number;
}

const ContractPayment = () => {
  const profile = useSelector((store: RootState) => store.authSlice?.profile);
  const isGrant = profile?.data?.paymentForm?.code === PaymentFormEnum.Grant;
  const { t } = useTranslation();
  const { isTestUniversity } = useTestUniversity();
  const { data, isFetching } = useGetContractInfoQuery(undefined, {
    skip: !profile || isGrant || isTestUniversity,
  });

  const contractData: ICurrentContractData = useMemo(
    () => (isTestUniversity ? contract_data_const : data?.data),
    [data, isTestUniversity]
  );

  if (isFetching) return <PaymentSkeleton />;

  const currentYearContract: ICurrentYearContract =
    (contractData && {
      ...contractData,
      source: 'api',
      updated_at: moment().unix(),
    }) ||
    getLocalStorage(localStorageNames.contract);

  // no contract found or no data responded for 10 minutes
  if (
    !currentYearContract ||
    Math.abs(
      moment.unix(currentYearContract?.updated_at).diff(moment(), 'minutes')
    ) >= 10
  ) {
    return (
      <Card style={{ maxWidth: 800 }}>
        {isGrant ? (
          // Grant message
          <GrantMessage />
        ) : (
          // No contract found message
          <Flex vertical gap={12} style={{ textAlign: 'center' }}>
            <Empty
              description={
                <Typography.Text
                  strong
                >{`${t('const.contract')} ${t('const.not_found')}`}</Typography.Text>
              }
              image={TearsWithSmileEmoji}
            />
            <Typography
              dangerouslySetInnerHTML={{
                __html: `${t('off_topic.contract_links_info')}`,
              }}
            />
          </Flex>
        )}
      </Card>
    );
  }

  if (currentYearContract.source === 'api') {
    setLocalStorage(localStorageNames.contract, {
      ...currentYearContract,
      source: 'localStorage',
    } as ICurrentYearContract);
  }

  return (
    <Flex className="contract-section" wrap gap={20} align="center">
      <Flex className="payment__card" vertical gap={24}>
        <Flex className="chat-container" gap={12} wrap>
          <Flex justify="space-between" align="center">
            <Image src={ChatStarIcon} alt="chat icon" preview={false} />
            <AnalyzeButton chatTopic={ChatTopic.ContractSummary}>
              Moliyaviy tahlil
            </AnalyzeButton>
          </Flex>
          <CreditCard currentYearContract={currentYearContract} />
        </Flex>

        <Divider />

        <Flex
          className="overall-payment-amount"
          justify="space-between"
          wrap
          gap={20}
        >
          <Typography.Text
            strong
            style={{ maxWidth: '169px', color: '#000000A6', fontSize: '16px' }}
          >
            {t('dashboard.contract.total_amount_unpaid')}:
          </Typography.Text>
          <Flex align="flex-end" gap={4}>
            <Typography.Title level={2} style={{ marginBottom: -3 }}>
              <CountUp
                end={currentYearContract?.credit}
                formattingFn={value => converToFloatingFormat(value)}
                style={{
                  color:
                    currentYearContract?.credit <= 0 ? '#52c41a' : '#eb2f96',
                }}
              />
            </Typography.Title>
            <Typography.Text style={{ color: '#00000073' }}>
              {t('const.uzs')}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        className="contracts-container"
        vertical
        gap={15}
        align="flex-start"
        style={{ width: '100%' }}
      >
        <EduLoan />
        <Card className="contract__card">
          <DashedList
            collapsable
            limit={8}
            className="drawer__dashed-list"
            list={[
              {
                label: t('const.contract'),
                value: (
                  <Button type="link" href={currentYearContract?.pdfLink}>
                    {t('const.download')}
                  </Button>
                ),
              },
              {
                label: t('dashboard.contract.contract_number'),
                value: currentYearContract?.contractNumber,
              },
              {
                label: t('dashboard.contract.contract_date'),
                value: currentYearContract?.contractDate,
              },
              {
                label: t('dashboard.contract.contract_type'),
                value: currentYearContract?.eduContractType,
              },
              {
                label: t('dashboard.contract.mfo_bank'),
                value: currentYearContract?.bankMfo,
              },
              {
                label: t('dashboard.contract.organization_account'),
                value: currentYearContract?.eduOrganizationAccount,
              },
              {
                label: t('dashboard.contract.organization_inn'),
                value: currentYearContract?.eduOrganizationInn,
              },
              {
                label: t('const.academic_year'),
                value: currentYearContract?.eduYear,
              },
              {
                label: t('dashboard.contract.contract_sum'),
                value: `${converToFloatingFormat(currentYearContract?.eduContractSum)} ${t('const.uzs')}`,
              },
              {
                label: t('dashboard.contract.paid_sum'),
                value: (
                  <span
                    style={{ color: '#52c41a' }}
                  >{`${converToFloatingFormat(currentYearContract?.debit)} ${t('const.uzs')}`}</span>
                ),
              },
              {
                label: t('dashboard.contract.total_debt'),
                value: (
                  <span
                    style={{ color: '#eb2f96' }}
                  >{`${converToFloatingFormat(currentYearContract?.credit)} ${t('const.uzs')}`}</span>
                ),
              },
              {
                label: t('dashboard.contract.education_organization'),
                value: currentYearContract?.eduOrganization,
              },
              {
                label: t('const.education_type'),
                value: currentYearContract?.eduType,
              },
              {
                label: t('const.education_form'),
                value: currentYearContract?.eduForm,
              },
              {
                label: t('const.course'),
                value: currentYearContract?.eduCourse,
              },
              {
                label: t('const.expertise'),
                value: currentYearContract?.eduSpeciality,
              },
              {
                label: t('const.fullname'),
                value: currentYearContract?.fullName,
              },
              {
                label: t('const.pinfl'),
                value: currentYearContract?.pinfl,
              },
            ]}
          />
        </Card>
      </Flex>
    </Flex>
  );
};

export default ContractPayment;
