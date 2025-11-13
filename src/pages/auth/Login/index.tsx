import { NiceGuySmileEmoji } from '@/assets/emojis';
import { LeftArrowSVG } from '@/assets/icon';
import ControlledFlow from '@/components/ControlledFlow';
import BottomInfoMessage from '@/components/SpecialComponents/BottomInfoMessage';
import { IBaseDataRes } from '@/services/type';
import { useLoginMutation } from '@/services/users';
import { ILogin, ILoginRes } from '@/services/users/type';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { toFirstLowerLetter } from '@/utils/stringFunc';
import {
  BarChartOutlined,
  KeyOutlined,
  LinkOutlined,
  LoginOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Form, message, Steps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import '../style.scss';
import StudentForm from './StudentForm';
import UniversityForm from './UniversityForm';

const LoginPage = () => {
  const [step, setStep] = useState(
    getLocalStorage(localStorageNames.universityApi) ? 1 : 0
  );
  const [isUnsuccessfulAttempt, setIsUnsuccessfulAttempt] = useState(false);
  const [form] = Form.useForm();
  const [login, { error, isSuccess, isLoading }] = useLoginMutation();
  const { access, isLogged } = useSelector(
    (store: RootState) => store.authSlice
  );
  const { t } = useTranslation();

  const submit = async (data: ILogin) => {
    if (!isLoading) {
      const res = await login({ login: data.login, password: data.password });
      if (
        'error' in res &&
        res.error &&
        'data' in res.error &&
        res.error.data &&
        (res.error.data as IBaseDataRes<ILoginRes>).success === false
      ) {
        setIsUnsuccessfulAttempt(true);
      }
    }
  };

  const clearInstitution = () => {
    localStorage.removeItem(localStorageNames.university);
    localStorage.removeItem(localStorageNames.universityApi);
    window.location.reload();
  };

  useEffect(() => {
    if (isSuccess) {
      message.success(t('login.success_message_text'));
    }
  }, [isSuccess]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err: any = error;
    if (err) {
      // message.error(err.error);
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (access && isLogged) return <Navigate to="/dashboard" />;

  return (
    <>
      <Helmet>
        <title>MY.HEMIS.UZ - Kirish</title>
        <meta
          name="description"
          content="OTM tomonidan berilgan shaxsiy login va parol orqali HEMIS tizimiga kirish. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta
          name="keywords"
          content="HEMIS, Oliy ta’lim tizimi, boshqarish axborot tizimi, ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, moliyaviy boshqaruv, OTM, talaba axborot tizimi, o‘qituvchi axborot tizimi, oliy ta’lim boshqaruvi, HEMIS yo‘riqnoma, Oliy ta’lim muassasalari, my hemis, hemis kirish, my.hemis.uz kirish, my hemis kirish"
        />
        <meta property="og:title" content="MY.HEMIS.UZ" />
        <meta
          property="og:description"
          content="OTM tomonidan berilgan shaxsiy login va parol orqali HEMIS tizimiga kirish. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta property="og:image" content="/images/hemis-icon.svg" />
      </Helmet>
      <Flex justify="space-between" gap={24} style={{ marginBottom: '8px' }}>
        {step !== 0 && (
          <Button
            className="login__prev-btn"
            onClick={() => setStep(prev => prev - 1)}
          >
            <LeftArrowSVG />
          </Button>
        )}
        <Steps
          progressDot
          current={step}
          className="login__main--steps"
          items={(t('login.steps', { returnObjects: true }) as string[]).map(
            title => ({ title })
          )}
        />
      </Flex>

      <ControlledFlow
        indexState={[step, setStep]}
        form={form}
        onSubmit={submit}
        data={{}}
      >
        <UniversityForm />
        <StudentForm isLoading={isLoading} />
      </ControlledFlow>

      {/* // If login or password is incorrect */}
      <BottomInfoMessage
        title={t('off_topic.qa_chat')}
        isOpen={isUnsuccessfulAttempt}
        setIsOpen={setIsUnsuccessfulAttempt}
        defaultText={
          <Flex gap={5} align="center">
            <p>{t('off_topic.famous_questions')}</p>
            <img width={20} src={NiceGuySmileEmoji} />
          </Flex>
        }
        questions={[
          {
            value: 'password',
            label: t('off_topic.forget_password'),
            icon: <KeyOutlined />,
          },
          {
            value: 'login',
            label: t('off_topic.forget_login'),
            icon: <LoginOutlined />,
          },
          {
            value: 'extra',
            label: t('const.additional_info'),
            icon: <PlusCircleOutlined />,
          },
        ]}
        answers={{
          login: (
            <Typography.Paragraph style={{ margin: 0 }}>
              {t('off_topic.about_find_login')}
            </Typography.Paragraph>
          ),
          password: (
            <Flex vertical gap={5}>
              <Typography.Text strong>
                {t('off_topic.about_find_password_title')}
              </Typography.Text>
              <ol className="ordered-list">
                <li>
                  <Link to={'/cancel-password'}>
                    {t('off_topic.about_find_password_1')}
                  </Link>
                </li>
                <li>{t('off_topic.about_find_password_2')}</li>
                <li>
                  <Button
                    onClick={clearInstitution}
                    type="link"
                    style={{ padding: 0 }}
                  >
                    {t('off_topic.about_find_password_3')}
                  </Button>
                </li>
                <li>{t('off_topic.about_find_password_4')}</li>
              </ol>
            </Flex>
          ),
          extra: (
            <Flex vertical gap={10}>
              <Typography.Text strong>
                {t('const.additional_info')}
              </Typography.Text>
              <Flex vertical>
                <Button
                  icon={<LinkOutlined />}
                  href="https://t.me/HEMIS_support"
                  type="link"
                  style={{ padding: 0, marginRight: 'auto' }}
                >{`MY.HEMIS.UZ - Telegram ${toFirstLowerLetter(t('const.group'))}`}</Button>
                <Divider />
                <Button
                  icon={<LinkOutlined />}
                  href="https://hemis.uz/"
                  type="link"
                  style={{ padding: 0, marginRight: 'auto' }}
                >
                  {t('off_topic.hemis_more_info')}
                </Button>
                <Divider />
                <Link
                  to="/statistics"
                  style={{ padding: 0, marginRight: 'auto' }}
                >
                  <BarChartOutlined style={{ marginRight: 5 }} />{' '}
                  {t('const.statistics')}
                </Link>
              </Flex>
            </Flex>
          ),
        }}
      />
    </>
  );
};

export default LoginPage;
