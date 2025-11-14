import { LeftArrowSVG } from '@/assets/icon';
import ControlledFlow from '@/components/ControlledFlow';
import { useLoginMutation } from '@/services/auth';
import { ILoginReq } from '@/services/auth/type';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Button, Flex, Form, Steps } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../style.scss';
import StudentForm from './StudentForm';
import UniversityForm from './UniversityForm';

const LoginPage = () => {
  const [step, setStep] = useState(
    getLocalStorage(localStorageNames.universityApi) ? 1 : 0
  );
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();

  const { access } = useSelector((store: RootState) => store.authSlice);
  const { t } = useTranslation();

  const submit = async (values: ILoginReq) => {
    try {
      await login({
        login: values?.login,
        password: values?.password
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (access) return <Navigate to="/dashboard" />;

  return (
    <>
      <Helmet>
        <title>TUTOR.HEMIS.UZ - Talaba Boshqaruv Tizimi</title>
        <meta
          name="description"
          content="OTM tomonidan berilgan shaxsiy login va parol orqali HEMIS tizimiga kirish. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta
          name="keywords"
          content="HEMIS, Oliy ta’lim tizimi, boshqarish axborot tizimi, ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, moliyaviy boshqaruv, OTM, talaba axborot tizimi, o‘qituvchi axborot tizimi, oliy ta’lim boshqaruvi, HEMIS yo‘riqnoma, Oliy ta’lim muassasalari, my hemis, hemis kirish, TUTOR.HEMIS.UZ kirish, my hemis kirish"
        />
        <meta property="og:title" content="TUTOR.HEMIS.UZ" />
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
    </>
  );
};

export default LoginPage;
