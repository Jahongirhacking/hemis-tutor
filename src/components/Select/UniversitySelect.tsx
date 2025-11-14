import { IUniversity } from '@/services/type';
import { parseXML } from '@/utils/objectFunc';
import { localStorageNames, setLocalStorage } from '@/utils/storageFunc';
import { toFirstLowerLetter } from '@/utils/stringFunc';
import { SearchOutlined } from '@ant-design/icons';
import { message, Select } from 'antd';
import axios from 'axios';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const UniversitySelect = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (value) {
          const universityApiUrl = `${value}rest/v1`;
          setLocalStorage(localStorageNames.universityApi, universityApiUrl);
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
      } catch (err) {
        message.warning(
          `${(t('login.steps', { returnObjects: true }) as string[])[0]} ${toFirstLowerLetter(t('const.info'))} ${t('const.not_found')}`
        );
        console.error(err);
      }
    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://student.hemis.uz/rest/v1/public/university-api-urls`
      );
      setUniversities(
        res?.data?.data?.filter(
          (university: IUniversity) => university?.employee_url
        )
      );
    })();
  }, []);

  useEffect(() => {
    if (!universities.length) return;
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [universities]);

  return (
    <Select
      className="university-select"
      size="large"
      options={universities?.map(university => ({
        key: university?.name,
        label: university?.name,
        value: university?.employee_url,
      }))}
      placeholder={t('login.university_form.input_placeholder')}
      value={value}
      onChange={(val: string) => setValue(val)}
      showSearch
      filterOption={(inputValue, option) => {
        const arr = inputValue.split(' ');
        return arr.reduce(
          (acc, curr) =>
            acc && option.label.toLowerCase().includes(curr.toLowerCase()),
          true
        );
      }}
      suffixIcon={<SearchOutlined />}
      optionFilterProp="label"
      style={{ maxWidth: 'min(calc(100% - 50px), 400px)' }}
    />
  );
};

export default UniversitySelect;
