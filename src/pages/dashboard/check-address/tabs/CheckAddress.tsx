import { useCheckAddressQuery } from '@/services/student';
import { ICheckedAddress, IVerification } from '@/services/student/type';
import { Badge, Divider, Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable';
import CustomFilter from '../../components/forms/CustomFilter';
import useCustomFilter from '../../components/forms/useCustomFilter';

const CheckAddress = () => {
  const { form, values } = useCustomFilter();
  const { data: addressData, isFetching } = useCheckAddressQuery({ ...values });
  const { t } = useTranslation();

  return (
    <Flex vertical gap={18}>
      <CustomFilter form={form}>
        <CustomFilter.ByGroup />
      </CustomFilter>

      <Divider style={{ margin: 0 }} />

      <CustomTable
        loading={isFetching}
        columns={[
          {
            title: t('const.student'),
            dataIndex: 'student',
            key: 'name',
            width: 250,
            render: student => student?.full_name,
          },
          {
            title: t('const.group'),
            dataIndex: 'group',
            key: 'group',
            render: group => group?.name,
          },
          {
            title: t('const.registered_address'),
            dataIndex: 'registered_address',
            key: 'registered_address',
            render: (address: ICheckedAddress) =>
              `${[address?.province, address?.district, address?.full_address].filter(e => !!e)?.join(', ')}`,
          },
          {
            title: t('const.phone'),
            dataIndex: 'phone',
            key: 'phone',
            render: phone =>
              phone ? (
                <a href={`tel:${phone}`} target="_blank">
                  {phone}
                </a>
              ) : (
                '-'
              ),
          },
          {
            title: t('const.status'),
            dataIndex: 'verification',
            key: 'verification',
            render: (verification: IVerification) => (
              <Tag color={verification?.status ? 'success' : 'error'}>
                <Flex gap={8} align="center">
                  <Badge status={verification?.status ? 'success' : 'error'} />
                  {`${verification?.match_percentage}% - ${verification?.status_text}`}
                </Flex>
              </Tag>
            ),
            fixed: 'right',
          },
        ]}
        dataSource={addressData?.result?.students}
      />
    </Flex>
  );
};

export default CheckAddress;
