import { IBaseDataRes, IUniversity } from '@/services/type';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import {
  convertIfCyrillic,
  keepOnlyLatinLettersAndWhitespace,
  removeTrailingSlash,
} from '@/utils/stringFunc';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Image, message, Select, Tabs, Typography } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IUniversityInfo } from '../Login/UniversityForm';
import './main.scss';
import Struktura from './Struktura';
import Students from './Students';
import Teachers from './Teachers';

export interface IStatisticsContext {
  studentsInfo: any;
  teachersInfo: any;
  structuresInfo: any;
}
export const StatisticsContext = createContext<IStatisticsContext | object>({});

const StatisticsDashboard: React.FC = () => {
  const [univer, setUniver] = useState(
    getLocalStorage(localStorageNames.universityApi)
      ? {
          label: getLocalStorage(localStorageNames?.university)?.name,
          value: getLocalStorage(localStorageNames.universityApi),
        }
      : {
          label: 'Hemis Testlash',
          value: 'https://student.hemis.uz/rest/v1',
        }
  );
  const [univerInfo, setUniverInfo] = useState<any>();
  const [studentsInfo, setStudentsInfo] = useState<any>();
  const [teachersInfo, setTeachersInfo] = useState<any>();
  const [structuresInfo, setStructuresInfo] = useState<any>();
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const { t } = useTranslation();

  const hemis: IUniversityInfo = {
    logo: '/images/hemis-icon.svg',
    name: 'HEMIS - axborot tizimi',
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (univer?.value) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${univer?.value}/public/university-profile`
          );
          setUniverInfo({
            logo: data?.data?.logo || data?.logo,
            name: data?.data?.name || data?.name,
          });
        } catch (err) {
          console.error(err);
          message.warning(
            "Ushbu oliygoh bo'yicha statistika ma'lumoti topilmadi!"
          );
        }
      })();
    }
  }, [univer]);

  useEffect(() => {
    (async () => {
      const { data }: { data: IBaseDataRes<IUniversity[]> } = await axios.get(
        `https://student.hemis.uz/rest/v1/public/university-api-urls`
      );
      setUniversities(
        data?.data?.filter(university => university?.student_url)
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${univer?.value}/public/stat-student`);
      setStudentsInfo(data?.data);
    })();
  }, [univer?.value]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${univer?.value}/public/stat-employee`);
      setTeachersInfo(data?.data);
    })();
  }, [univer?.value]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${univer?.value}/public/stat-structure`
      );
      setStructuresInfo(data?.data);
    })();
  }, [univer?.value]);

  return (
    <StatisticsContext.Provider
      value={{ studentsInfo, teachersInfo, structuresInfo }}
    >
      <Helmet>
        <title>Statistika - OTM kesimida</title>
        <meta
          name="description"
          content="OTM kesimi bo'yicha batafsil statistika ma'lumotlari. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta
          name="keywords"
          content="HEMIS, Oliy ta’lim tizimi, boshqarish axborot tizimi, ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, moliyaviy boshqaruv, OTM, talaba axborot tizimi, o‘qituvchi axborot tizimi, oliy ta’lim boshqaruvi, HEMIS yo‘riqnoma, Oliy ta’lim muassasalari, my hemis, statistika, hemis statistika"
        />
        <meta property="og:title" content="TUTOR.HEMIS.UZ" />
        <meta
          property="og:description"
          content="OTM kesimi bo'yicha batafsil statistika ma'lumotlari. HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
        />
        <meta property="og:image" content="/images/hemis-icon.svg" />
      </Helmet>
      <Flex vertical className="stat-page">
        <div className="header ">
          <Link to={'/'} className="logo">
            <Image
              preview={false}
              src={'/images/edu-logo.png'}
              alt="Company logo"
              width={60}
            />
            <span>
              O‘ZBEKISTON RESPUBLIKASI OLIY TA’LIM, FAN VA INNOVATSIYALAR
              VAZIRLIGI{' '}
            </span>
          </Link>
        </div>
        <div className="home container">
          <Flex
            wrap
            gap={15}
            justify="space-between"
            style={{ marginBottom: '10px' }}
          >
            <Select
              className="university-select"
              size="large"
              options={universities?.map(university => ({
                key: university?.name,
                label: university?.name,
                value: removeTrailingSlash(university?.api_url),
              }))}
              placeholder={t('login.university_form.input_placeholder')}
              value={univer}
              onChange={val => setUniver(val)}
              labelInValue
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
              style={{ width: 'min(100%, 400px)' }}
            />
            {univerInfo && (
              <Flex gap={10} align="center">
                <Image
                  src={univerInfo?.logo || hemis?.logo}
                  width={40}
                  preview={false}
                  fallback="/images/gerb.png"
                  style={{ borderRadius: 4 }}
                />
                <Typography.Title style={{ color: '#fff' }} level={4}>
                  {univerInfo?.name || hemis?.name}
                </Typography.Title>
              </Flex>
            )}
          </Flex>
          <Tabs
            className="home_tabs"
            defaultActiveKey="1"
            items={[
              {
                label: `Talabalar`,
                key: '1',
                children: <Students />,
              },
              {
                label: `O‘qituvchilar`,
                key: '2',
                children: <Teachers />,
              },
              {
                label: `Struktura`,
                key: '3',
                children: <Struktura />,
              },
            ]}
          />
        </div>
      </Flex>
    </StatisticsContext.Provider>
  );
};

export default StatisticsDashboard;
