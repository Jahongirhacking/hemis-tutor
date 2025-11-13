import CustomCollapse from '@/components/CustomCollapse';
import { useGetProfileMutation } from '@/services/users';
import { RootState } from '@/store/store';
import { Flex, Skeleton, Table, TableColumnsType, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PersonalInfo = () => {
  const [getProfile] = useGetProfileMutation();
  const profile = useSelector((store: RootState) => store.authSlice?.profile);
  const { i18n, t } = useTranslation();

  const columns: TableColumnsType<{ label: string; value: string }> = [
    {
      key: 'label',
      dataIndex: 'label',
      render: label => <Typography.Text strong>{label}</Typography.Text>,
    },
    {
      key: 'value',
      dataIndex: 'value',
      render: value => <Typography.Text>{value}</Typography.Text>,
    },
  ];

  useEffect(() => {
    getProfile();
  }, [getProfile, i18n.language]);

  if (!profile || !profile.data) return <Skeleton active />;

  return (
    <Flex vertical gap={10} className="personal_info">
      <CustomCollapse
        key={'passport'}
        items={[
          {
            key: 1,
            label: (
              <Typography.Text strong>
                {t('const.passport_info')}
              </Typography.Text>
            ),
            children: (
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[
                  {
                    label: t('const.passport_number'),
                    value: profile?.data?.passport_number,
                  },
                  {
                    label: 'JSHSHIR',
                    value: profile?.data?.passport_pin,
                  },
                  {
                    label: t('const.lastname'),
                    value: profile?.data?.second_name,
                  },
                  {
                    label: t('const.firstname'),
                    value: profile?.data?.first_name,
                  },
                  {
                    label: t('const.patronymic'),
                    value: profile?.data?.third_name,
                  },
                  {
                    label: t('const.birth_date'),
                    value: moment
                      .unix(profile?.data?.birth_date)
                      .format('DD.MM.YYYY'),
                  },
                  {
                    label: t('const.gender'),
                    value: profile?.data?.gender.name,
                  },
                ]}
                rowKey={'label'}
                pagination={false}
              />
            ),
          },
        ]}
      />

      <CustomCollapse
        key={'education'}
        items={[
          {
            key: 1,
            label: (
              <Typography.Text strong>
                {t('const.education_info')}
              </Typography.Text>
            ),
            children: (
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[
                  {
                    label: t('const.expertise'),
                    value: profile?.data?.specialty?.name,
                  },
                  {
                    label: t('const.faculty'),
                    value: profile?.data?.faculty?.name,
                  },
                  {
                    label: t('const.course'),
                    value: profile?.data?.level?.name,
                  },
                  {
                    label: t('const.group'),
                    value: profile?.data?.group?.name,
                  },
                  {
                    label: t('const.payment_form'),
                    value: profile?.data?.paymentForm?.name,
                  },
                  {
                    label: t('const.education_type'),
                    value: profile?.data?.educationType?.name,
                  },
                  {
                    label: t('const.education_form'),
                    value: profile?.data?.educationForm?.name,
                  },
                  {
                    label: t('const.academic_year'),
                    value: profile?.data?.semester?.education_year?.name,
                  },
                  {
                    label: t('const.semester'),
                    value: profile?.data?.semester?.name,
                  },
                ]}
                rowKey={'label'}
                pagination={false}
              />
            ),
          },
        ]}
      />

      <CustomCollapse
        key={'permanent-address'}
        items={[
          {
            key: 1,
            label: (
              <Typography.Text strong>
                {t('const.permanent_address_info')}
              </Typography.Text>
            ),
            children: (
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[
                  {
                    label: t('const.country'),
                    value: profile?.data?.country?.name,
                  },
                  {
                    label: t('const.region'),
                    value: profile?.data?.province?.name,
                  },
                  {
                    label: t('const.district'),
                    value: profile?.data?.district?.name,
                  },
                  {
                    label: t('const.home_address'),
                    value: profile?.data?.address,
                  },
                ]}
                rowKey={'label'}
                pagination={false}
              />
            ),
          },
        ]}
      />

      <CustomCollapse
        key={'current-address'}
        items={[
          {
            key: 1,
            label: (
              <Typography.Text strong>
                {t('const.current_address_info')}
              </Typography.Text>
            ),
            children: (
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[
                  {
                    label: t('const.place_of_residence'),
                    value: profile?.data?.accommodation?.name,
                  },
                  {
                    label: 'Email',
                    value: profile?.data?.email,
                  },
                  {
                    label: t('const.student_phone'),
                    value: profile?.data?.phone,
                  },
                ]}
                rowKey={'label'}
                pagination={false}
              />
            ),
          },
        ]}
      />

      <CustomCollapse
        key={'extra'}
        items={[
          {
            key: 1,
            label: (
              <Typography.Text strong>
                {t('const.additional_info')}
              </Typography.Text>
            ),
            children: (
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[
                  {
                    label: t('const.social_class'),
                    value: profile?.data?.socialCategory?.name,
                  },
                ]}
                rowKey={'label'}
                pagination={false}
              />
            ),
          },
        ]}
      />
    </Flex>
  );
};

export default PersonalInfo;
