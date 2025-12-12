import { useGenerateVisitAnomalyResponseMutation } from '@/services/chat';
import { useGetVisitListQuery } from '@/services/student';
import { RootState } from '@/store/store';
import { ChatTopic, SearchParams } from '@/utils/config';
import { Card, Flex } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ResultTitle from '../components/ResultTitle';
import { MAX_AI_REQ_LENGTH } from '../config';
import useGetToken from '../hooks/useGetToken';
import { getTranslationTerm } from './constants';
import { IAnalyzeResultProps } from './interface';

const VisitsResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.VisitSummary;
  const profile = useSelector((store: RootState) => store.authSlice.profile);
  const { token, ready } = useGetToken();
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: visitsData, isFetching: isVisitsFetching } =
    useGetVisitListQuery({}, { skip: !isVisible || !profile });
  const [generateVisits, { isLoading: isVisitSummaryLoading, data }] =
    useGenerateVisitAnomalyResponseMutation();

  useEffect(() => {
    if (!isVisible) return;
    if (data && !isVisitSummaryLoading) {
      props?.setResult(data?.answer);
    }
  }, [data]);

  useEffect(() => {
    if (!isVisible || !profile || !visitsData?.result?.items?.length || !ready)
      return;
    if (searchParams.has(SearchParams.Modal)) {
      // prompt
      const summary = JSON.stringify(
        visitsData?.result?.items?.map(
          ({ first_name, second_name, tutorVisits, studentLivingStatus }) => ({
            first_name,
            second_name,
            studentLivingStatus: studentLivingStatus?.name,
            tutorVisits: tutorVisits?.length ? tutorVisits?.[0] : [],
          })
        )
      )?.slice(0, MAX_AI_REQ_LENGTH);
      generateVisits({
        question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
        token,
      });
      setIsInitialized(true);
    }
  }, [isVisible, profile, visitsData, ready, token]);

  if (!isVisible) return null;

  return (
    <Flex vertical gap={12}>
      {isVisitsFetching ? (
        props?.showRequestLoading()
      ) : isVisitSummaryLoading || !isInitialized ? (
        props?.showResponseLoading()
      ) : data ? (
        <Flex vertical gap={18}>
          <Card
            className="analyze-result-content"
            title={<ResultTitle />}
            extra={props.openChat()}
          >
            {props?.showResult()}
          </Card>
        </Flex>
      ) : (
        props?.showNotFound()
      )}
    </Flex>
  );
};

export default VisitsResult;
