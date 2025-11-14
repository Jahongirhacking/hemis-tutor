import Loading from '@/components/Common/Loading';
import { ControlledFlowContext } from '@/components/ControlledFlow';
import { IUniversity } from '@/services/type';
import { parseXML } from '@/utils/objectFunc';
import { localStorageNames, setLocalStorage } from '@/utils/storageFunc';
import {
  convertIfCyrillic,
  keepOnlyLatinLettersAndWhitespace,
  toFirstLowerLetter,
} from '@/utils/stringFunc';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, message, Select } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IUniversityInfo {
  logo: string;
  name: string;
}

const UniversityForm = () => {
  const { form, setNextIndex, pushData } = useContext(ControlledFlowContext);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isUniProfileLoading, setIsUniProfileLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsUniProfileLoading(true);
      const university = form?.getFieldValue('university');
      if (university) {
        const universityApiUrl = `${university}rest/v1`;
        setLocalStorage(localStorageNames.universityApi, universityApiUrl);
        const employeeApiUrl = `${university}rest/ver1/tutor`;
        setLocalStorage(localStorageNames.employeeApi, employeeApiUrl);
        const response = await axios.get(
          `${universityApiUrl}/public/university-profile`
        );
        let universityProfile: { data?: any; name?: any; logo?: any } =
          response;
        const contentType = response.headers['content-type'];
        if (
          contentType.includes('application/xml') ||
          contentType.includes('text/xml')
        ) {
          const parsedXML = parseXML(response.data);
          universityProfile = parsedXML?.response;
        }
        while (
          universityProfile &&
          typeof universityProfile === 'object' &&
          'data' in universityProfile
        ) {
          universityProfile = universityProfile.data;
        }
        setLocalStorage(localStorageNames.university, {
          name:
            typeof universityProfile?.name === 'object'
              ? universityProfile?.name?.value
              : universityProfile?.name,
          logo:
            typeof universityProfile?.logo === 'object'
              ? universityProfile?.logo?.value
              : universityProfile?.logo,
        });
      }
      pushData(form.getFieldsValue());
      setNextIndex();
    } catch (err) {
      message.warning(
        `${(t('login.steps', { returnObjects: true }) as string[])[0]} ${t('const.problem_with_server')}, ${toFirstLowerLetter(t('const.please'))} ${t('const.try_again_later')}`
      );
      console.error(err);
    } finally {
      setIsUniProfileLoading(false);
    }
  };

  useEffect(() => {
    if (!universities.length) return;
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [universities]);

  useEffect(() => {
    form.setFieldsValue({ university: value });
  }, [form, value]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://student.hemis.uz/rest/v1/public/university-api-urls`
      );
      setUniversities(
        res?.data?.data?.filter(
          (university: IUniversity) => university?.student_url
        )
      );
    })();
  }, []);

  return (
    <div className="customBox login__main--card">
      {isLoading && <Loading />}
      <h2 className="customBox__title">{t('login.university_form.title')}</h2>
      <Form form={form} className="login__main--form">
        <Form.Item name={'university'} initialValue={value}>
          <Select
            className="university-select"
            size="large"
            options={universities?.map(university => ({
              key: university?.name,
              label: university?.name,
              value: university?.student_url,
            }))}
            placeholder={t('login.university_form.input_placeholder')}
            value={value}
            onChange={(val: string) => setValue(val)}
            showSearch
            filterOption={(inputValue, option) => {
              const translatedInputValue = keepOnlyLatinLettersAndWhitespace(
                convertIfCyrillic(inputValue)
              );
              const translatedOptionLabel = keepOnlyLatinLettersAndWhitespace(
                convertIfCyrillic(option?.label)
              );
              const arr = translatedInputValue.split(' ');
              return arr.reduce(
                (acc, curr) =>
                  acc &&
                  translatedOptionLabel
                    .toLowerCase()
                    .includes(curr.toLowerCase()),
                true
              );
            }}
            suffixIcon={<SearchOutlined />}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            onClick={handleClick}
            icon={isUniProfileLoading && <LoadingOutlined />}
            disabled={value === undefined || isUniProfileLoading}
          >
            {t('login.university_form.button_text')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UniversityForm;
