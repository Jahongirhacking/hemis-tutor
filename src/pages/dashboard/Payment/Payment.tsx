import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Flex, Tabs } from 'antd';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import ContractPayment from './_Contract';
import './Payment.scss';

export const PaymentPage = () => {
  const TAB_NAME = 'payment-tab';
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      '1'
    )
  );

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  return (
    <Flex vertical gap={5} className="payment-page upper-element">
      <h2 className="section_title">
        {
          (
            t('dashboard.navbar.navbarList', {
              returnObjects: true,
            }) as string[]
          )[5]
        }
      </h2>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={key => setActiveTab(key)}
        items={[
          {
            label: t('const.contract_payment'),
            key: '1',
            children: <ContractPayment />,
          },
        ]}
      />
    </Flex>
  );
};
