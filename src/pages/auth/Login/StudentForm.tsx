import { ControlledFlowContext } from '@/components/ControlledFlow';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { LoadingOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Image, Input, Typography } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const StudentForm = ({ isLoading = false }: { isLoading?: boolean }) => {
  const { form, onSubmit, data } = useContext(ControlledFlowContext);
  const { t } = useTranslation();
  const universityInfo = useSelector(
    (store: RootState) => store.authSlice.universityInfo
  );

  const handleSubmit = async () => {
    try {
      onSubmit({
        login: form.getFieldsValue()?.login?.split(' ')?.join(''),
        password: form.getFieldsValue()?.password,
        ...data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customBox login__main--card">
      <Flex vertical justify="center" gap={4} align="center" className="mb-5">
        <Image
          fallback="/images/gerb.png"
          width={80}
          preview={false}
          src={universityInfo?.logo}
        />
        <Typography.Text strong className="text-[15pt] text-center">
          {universityInfo?.name}
        </Typography.Text>
      </Flex>

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
        className="login__main--form"
      >
        <Form.Item name={'login'} label={t('login.student_form.login_label')}>
          <Input
            autoFocus
            size="large"
            placeholder={t('login.student_form.login_placeholder')}
          />
        </Form.Item>
        <Form.Item
          name={'password'}
          label={t('login.student_form.password_label')}
        >
          <Input.Password
            size="large"
            placeholder={t('login.student_form.password_placeholder')}
          />
        </Form.Item>

        <Flex vertical gap={10}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isLoading}
              icon={isLoading ? <LoadingOutlined /> : <LoginOutlined />}
            >
              {t('login.student_form.button_text')}
            </Button>
          </Form.Item>

          <Divider style={{ margin: '3px 0', fontSize: '11pt' }}>
            {t('const.enter_via_other_method')}
          </Divider>

          <Button
            size="large"
            type="link"
            style={{
              width: '100%',
              backgroundColor: '#4825c2',
              color: '#fff',
            }}
            icon={<UserOutlined />}
            href={`${getLocalStorage(localStorageNames.universityApi)}/auth/oauth?redirect_uri=https://tyutor.hemis.uz/auth/callback`}
            target="_blank"
          >
            One ID
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default StudentForm;
