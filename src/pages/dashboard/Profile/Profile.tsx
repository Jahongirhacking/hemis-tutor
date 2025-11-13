import UncontrolledFlow from '@/components/ControlledFlow';
import { getBaseUrl } from '@/services/api/const';
import { RootState } from '@/store/store';
import { Button, Flex, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './Profile.scss';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';

const ProfilePage = ({ hasTitle = true }: { hasTitle?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [form] = useForm();
  const token = useSelector((store: RootState) => store.authSlice.access);
  const { t } = useTranslation();

  const handleFormSubmit = () => {
    (async () => {
      try {
        await form.validateFields();
        const values = form.getFieldsValue();
        const data = {
          phone: values?.phoneNumber,
          email: values?.email,
          change_contacts: values?.phoneNumber && values?.email ? true : false,
          password: values?.password,
          confirmation: values?.repeatedPassword,
          change_password: values?.password !== '',
        };
        await axios.post(getBaseUrl(`/account/update`), data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        message.success(t('components.message.save_data_success'));
        form.setFieldsValue({
          password: '',
          repeatedPassword: '',
        });
        setCurrentIndex(0);
      } catch (error) {
        message.error(
          `${t('components.message.save_data_error')} ${error?.response?.data?.error ?? ''}`
        );
      }
    })();
  };

  return (
    <section className="section dashboard__outlet profile__outlet upper-element">
      <Flex justify="space-between">
        {hasTitle && (
          <h2 className="section_title">
            {t('dashboard.settings.profile.title')}
          </h2>
        )}
        {currentIndex !== 0 && (
          <Flex gap={8}>
            <Button onClick={() => setCurrentIndex(0)}>
              {t('const.cancel')}
            </Button>
            <Button type="primary" onClick={handleFormSubmit}>
              {t('const.save')}
            </Button>
          </Flex>
        )}
      </Flex>
      <div className="dashboard__outlet--content">
        <UncontrolledFlow
          indexState={[currentIndex, setCurrentIndex]}
          onSubmit={handleFormSubmit}
          form={form}
        >
          <ProfileCard />
          <ProfileForm />
        </UncontrolledFlow>
      </div>
    </section>
  );
};

export default ProfilePage;
