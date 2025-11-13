import { LeftArrowSVG } from '@/assets/icon';
import UniversitySelect from '@/components/Select/UniversitySelect';
import { paths } from '@/router/paths';
import { getBaseUrl } from '@/services/api/const';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Button, Flex, Form, Input, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../style.scss';

const CancelPasswordPage = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClickPrev = () => {
    if (step === 0) {
      navigate(paths.base);
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleUniver = () => {
    if (getLocalStorage(localStorageNames.universityApi)) {
      navigate('/');
      window.location.href = getBaseUrl('', false).replace(
        'rest/v1',
        'dashboard/reset'
      );
    }
  };

  useEffect(() => {
    handleUniver();
  }, []);

  return (
    <Flex vertical gap={15} style={{ width: '100%' }}>
      <Helmet>
        <title>Parolni bekor qilish</title>
        <meta
          name="description"
          content="HEMIS shaxsiy parolingizni qayta tiklash. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta
          name="keywords"
          content="HEMIS, Oliy ta’lim tizimi, boshqarish axborot tizimi, ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, moliyaviy boshqaruv, OTM, talaba axborot tizimi, o‘qituvchi axborot tizimi, oliy ta’lim boshqaruvi, HEMIS yo‘riqnoma, Oliy ta’lim muassasalari, hemis parolni bekor qilish, parolni bekor qilish"
        />
        <meta property="og:title" content="TUTOR.HEMIS.UZ" />
        <meta
          property="og:description"
          content="HEMIS shaxsiy parolingizni qayta tiklash. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta property="og:image" content="/images/hemis-icon.svg" />
      </Helmet>
      {!getLocalStorage(localStorageNames.universityApi) ? (
        <Flex
          gap={10}
          align="center"
          justify="center"
          style={{ width: '100%' }}
        >
          <UniversitySelect />
          <Button type="primary" onClick={handleUniver}>
            {t('const.choose')}
          </Button>
        </Flex>
      ) : (
        <>
          <Flex
            justify="space-between"
            gap={24}
            style={{ width: '100%', maxWidth: '520px' }}
          >
            <Button
              className="login__prev-btn"
              onClick={() => handleClickPrev()}
            >
              <LeftArrowSVG />
            </Button>
            <Steps
              progressDot
              current={step}
              className="login__main--steps"
              items={(
                t('cancel_password.steps', { returnObjects: true }) as any[]
              ).map(step => ({ title: step.name }))}
            />
          </Flex>

          {step === 0 ? (
            <div
              className="customBox login__main--card"
              style={{ position: 'relative', overflowX: 'hidden' }}
            >
              <div className="test-page">{t('components.soon_card.text')}</div>
              <h2 className="customBox__title">
                {
                  (
                    t('cancel_password.steps', { returnObjects: true }) as any[]
                  )[0].title
                }
              </h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={values => console.log(values)}
                className="login__main--form"
              >
                <Form.Item
                  name={'university'}
                  label={
                    (
                      t('cancel_password.steps', {
                        returnObjects: true,
                      }) as any[]
                    )[0].input_label
                  }
                  required
                >
                  <Input
                    size="large"
                    placeholder={
                      (
                        t('cancel_password.steps', {
                          returnObjects: true,
                        }) as any[]
                      )[0].input_placeholder
                    }
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    onClick={() => setStep(1)}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >
                    {
                      (
                        t('cancel_password.steps', {
                          returnObjects: true,
                        }) as any[]
                      )[0].button_text
                    }
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className="customBox login__main--card">
              <h2 className="customBox__title">
                {
                  (
                    t('cancel_password.steps', { returnObjects: true }) as any[]
                  )[1].title
                }
              </h2>
              <Form
                layout="vertical"
                form={form}
                onFinish={values => console.log(values)}
                className="login__main--form"
              >
                <Form.Item
                  name={'login'}
                  label={
                    (
                      t('cancel_password.steps', {
                        returnObjects: true,
                      }) as any[]
                    )[1].input_label
                  }
                  required
                >
                  <Input
                    size="large"
                    placeholder={
                      (
                        t('cancel_password.steps', {
                          returnObjects: true,
                        }) as any[]
                      )[1].input_placeholder
                    }
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    onClick={() => setStep(0)}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >
                    {
                      (
                        t('cancel_password.steps', {
                          returnObjects: true,
                        }) as any[]
                      )[1].button_text
                    }
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </>
      )}
    </Flex>
  );
};

export default CancelPasswordPage;
