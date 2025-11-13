import DashedList from '@/components/DashedList';
import { usePostEduLoanInfoMutation } from '@/services/dashboard';
import { RootState } from '@/store/store';
import { converToFloatingFormat } from '@/utils/numberFunc';
import { encodePinfl, toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Card, Flex, Skeleton, Tag, Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EduLoan = () => {
  const [postEduLoanInfo, { data, isLoading }] = usePostEduLoanInfoMutation();
  const { t } = useTranslation();
  const extraPinfl = useSelector((store: RootState) => store.authSlice.pinfl);
  const pinfl: string = useSelector(
    (store: RootState) => store.authSlice?.profile?.data?.passport_pin
  );

  const handleClick = useCallback(() => {
    postEduLoanInfo({
      pinfl: pinfl || extraPinfl,
      hesh: encodePinfl(pinfl || extraPinfl),
    });
  }, []);

  return (
    <Card className="edu-loan-card">
      <Flex vertical gap={15} align="center">
        <Typography.Title level={4} style={{ margin: 0, textAlign: 'center' }}>
          {t('const.information_on_education_credit')}
        </Typography.Title>
        <Flex gap={10} align="center" justify="center">
          <Button type="primary" onClick={handleClick}>
            {t('const.check')}
          </Button>
        </Flex>
        {isLoading ? (
          <Skeleton active />
        ) : (
          data?.statusCode === 200 &&
          data?.object && (
            <DashedList
              className="drawer__dashed-list"
              list={[
                {
                  label: t('const.bank_name'),
                  value: data?.object?.bankName,
                },
                {
                  label: t('const.edu_loan_sum'),
                  value: `${converToFloatingFormat(data?.object?.creditSum)} so‘m`,
                },
                {
                  label: toFirstCapitalLetter(t('const.status')),
                  value: (
                    <Tag
                      color={
                        data?.object?.state === 'BEKOR QILINDI'
                          ? 'red'
                          : 'green'
                      }
                    >
                      {data?.object?.state}
                    </Tag>
                  ),
                },
                {
                  label: t('const.comment'),
                  value: data?.object?.comment,
                },
                {
                  label: t('const.bank_number'),
                  value: data?.object?.bankPhone,
                },
              ]}
            />
          )
        )}
      </Flex>
    </Card>
  );
};

export default EduLoan;
