import useTestUniversity from '@/hooks/useTestUniversity';
import CreditCard from '@/pages/dashboard/Payment/_Contract/CreditCard';
import GrantMessage from '@/pages/dashboard/Payment/_Contract/GrantMessage';
import {
  useGetContractSummaryMutation,
  useGetRentInfoQuery,
  useGetScholarshipInfoQuery,
} from '@/services/chat';
import { IRent, IScholarship } from '@/services/chat/type';
import { useGetContractInfoQuery } from '@/services/dashboard';
import {
  ICurrentContractData,
  PaymentFormEnum,
} from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { ChatTopic, SearchParams } from '@/utils/config';
import { Card, Empty, Flex, Typography } from 'antd';
import { BadgeCheck, Banknote } from 'lucide-react';
import moment from 'moment';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import RentChart from '../components/RentChart';
import StipendChart from '../components/StipendChart';
import useGetToken from '../hooks/useGetToken';
import {
  contract_data_const,
  getTranslationTerm,
  rent_data_const,
  scholarship_data_const,
} from './constants';
import { IAnalyzeResultProps } from './interface';

const ContractResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.ContractSummary;
  const profile = useSelector((store: RootState) => store?.authSlice?.profile);
  const { t, i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  const { isTestUniversity } = useTestUniversity();

  const [getContractSummary, { isLoading: isContractSummaryLoading, data }] =
    useGetContractSummaryMutation();
  const isGrant = useMemo(
    () => profile?.data?.paymentForm?.code === PaymentFormEnum.Grant,
    [profile]
  );
  const { data: contractData, isFetching: isContractFetching } =
    useGetContractInfoQuery(undefined, {
      skip: !profile || isGrant || isTestUniversity,
    });
  const { data: scholarshipData, isFetching: isScholarshipFetching } =
    useGetScholarshipInfoQuery(
      { studentId: profile?.data?.student_id_number },
      { skip: !profile?.data?.student_id_number }
    );
  const { data: rentData, isFetching: isRentFetching } = useGetRentInfoQuery(
    {
      studentId: profile?.data?.student_id_number,
    },
    { skip: !profile?.data?.student_id_number }
  );
  const { token, ready } = useGetToken();

  const contract: ICurrentContractData = useMemo(
    () => (isTestUniversity ? contract_data_const : contractData?.data),
    [isTestUniversity, contractData]
  );
  const scholarship: IScholarship = useMemo(
    () => (isTestUniversity ? scholarship_data_const : scholarshipData?.data),
    [scholarshipData, isTestUniversity]
  );
  const rent: IRent[] = useMemo(
    () => (isTestUniversity ? rent_data_const : rentData?.data),
    [rentData, isTestUniversity]
  );

  useEffect(() => {
    if (!isVisible) return;
    if (data && !isContractSummaryLoading) {
      props?.setResult(data?.answer);
    }
  }, [data, isVisible]);

  useEffect(() => {
    if (
      !isVisible ||
      !profile ||
      isContractFetching ||
      isScholarshipFetching ||
      isRentFetching ||
      !ready
    )
      return;
    if (searchParams.has(SearchParams.Modal)) {
      // prompt
      const contractInfo = isGrant
        ? "**Talaba davlat grantida o'qiydi, bu haqidagi xabarni unga chiroyli tarzda yetkaz**"
        : contract
          ? `**Kontrakt ma'lumoti:**\n*${contract?.eduContractType} ${contract?.contractDate} \n*Shartnoma summasi: ${contract?.eduContractSum}\n*To'langan summa: ${contract?.debit}\n*Jami qarzdorlik: ${contract?.credit}`
          : '';
      const rentInfo = rent?.length
        ? `**Talaba uchun qoplab berilgan ijara summasi:**\n*${rent?.map(m => `${m?.monthName}: ${m?.amount} so'm`)?.join(', ')}`
        : '';
      const scholarshipInfo = scholarship?.stipendTypes?.length
        ? `**Talaba uchun to'langan stipendiyalar summasi:**\n*${scholarship?.stipendTypes?.map(t => `${t?.stipendType}: ${t?.totalCreditSum} so'm`)?.join(', ')}`
        : '';
      const summary = `${isGrant ? `Talaba grantda o'qiydi, kontrakt to'lamaydi. Buni chiroyli qilib tushuntiring` : [contractInfo, rentInfo, scholarshipInfo]?.filter(e => !!e)?.join('\n')}`;
      getContractSummary({
        question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
        token,
      });
      setIsInitialized(true);
    }
  }, [
    isVisible,
    profile,
    isContractFetching,
    token,
    ready,
    isRentFetching,
    isScholarshipFetching,
  ]);

  if (!isVisible) return null;

  return (
    <Flex vertical>
      {isContractFetching ? (
        props?.showRequestLoading()
      ) : isContractSummaryLoading || !isInitialized ? (
        props?.showResponseLoading()
      ) : data ? (
        <Flex vertical gap={32}>
          <Card
            className="analyze-result-content"
            title={
              <Flex gap={8}>
                <BadgeCheck />
                <Typography.Title level={5}>Tahlil natijasi</Typography.Title>
              </Flex>
            }
            extra={props.openChat()}
          >
            {props?.showResult()}
          </Card>
          <Flex gap={18} wrap className="chart-container">
            <Card
              title={
                <Flex gap={8}>
                  <Banknote size={24} />
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Shartnoma to'lovi
                  </Typography.Title>
                </Flex>
              }
            >
              {isGrant ? (
                <GrantMessage />
              ) : (
                <CreditCard
                  currentYearContract={{
                    ...contract,
                    updated_at: moment().unix(),
                  }}
                />
              )}
            </Card>

            {rent?.length ? (
              <RentChart data={rent} direction="vertical" />
            ) : (
              <Card>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={`${t('const.info')} ${t('const.not_found')}`}
                />
              </Card>
            )}

            {scholarship?.stipendTypes?.length ? (
              <StipendChart stipendTypes={scholarship?.stipendTypes} />
            ) : (
              <Card>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={`${t('const.info')} ${t('const.not_found')}`}
                />
              </Card>
            )}
          </Flex>
        </Flex>
      ) : (
        props?.showNotFound()
      )}
    </Flex>
  );
};

export default ContractResult;
