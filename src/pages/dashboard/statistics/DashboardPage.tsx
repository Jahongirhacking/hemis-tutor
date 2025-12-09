import { IEducationYear, IGroup, ISemester } from '@/services/student/type';
import { RootState } from '@/store/store';
import { Card, Flex, Row, Typography } from 'antd';
import { createContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomCol from '../components/CustomCol';
import CustomFilter, { FilterKey } from '../components/forms/CustomFilter';
import useCustomFilter from '../components/forms/useCustomFilter';
import {
  ContractCard,
  DistrictsCard,
  GenderCard,
  GeoLocationCard,
  LivingStatusCard,
  SocialCard,
  StatisticsCard,
  TopAbsentCard,
} from './components';
import AccommodationCard from './components/AccommodationCard';
import ContractTypeCard from './components/ContractTypeCard';
import GeoLocationMapCard from './components/GeoLocationMapCard';

export const StatisticsContext = createContext<{
  educationYear: IEducationYear['code'];
  groupId: IGroup['id'];
  semester: ISemester['code'];
}>({ educationYear: undefined, groupId: undefined, semester: undefined });

const PRIMARY = '#14b8a6';
const COLORS = [
  '#14b8a6',
  '#0d9488',
  '#5eead4',
  '#2dd4bf',
  '#99f6e4',
  '#06b6d4',
  '#0891b2',
];

const Dashboard = () => {
  const { form, values } = useCustomFilter();
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);
  const isDark = useMemo(() => themeColor === 'dark', [themeColor]);
  const { t } = useTranslation();

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card
          style={{
            background: isDark
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${PRIMARY}40`,
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        >
          <Typography.Text strong style={{ color: isDark ? '#fff' : '#000' }}>
            {payload?.[0]?.name}
          </Typography.Text>
          <br />
          <Typography.Text style={{ color: PRIMARY }}>
            {`${t('const.number_count', { number: payload?.[0]?.value })}`}
          </Typography.Text>
        </Card>
      );
    }
    return null;
  };

  return (
    <StatisticsContext.Provider
      value={{
        educationYear: values?.[FilterKey.EducationYear],
        groupId: values?.[FilterKey.GroupId],
        semester: values?.[FilterKey.Semester],
      }}
    >
      <Flex vertical gap={18} className="dashboard__page main-dashboard-page">
        <Flex vertical gap={24} className="dashboard-stats upper-element">
          {/* Header */}
          <Flex
            className="w-full flex-col lg:flex-row"
            justify="space-between"
            align="center"
            wrap
            gap={16}
          >
            <Typography.Title
              level={2}
              style={{
                margin: 0,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1a1a1a',
                minWidth: 'min(180px, 100%)',
              }}
            >
              Dashboard
            </Typography.Title>
            <CustomFilter
              form={form}
              className="flex flex-1"
              filterClassName="!justify-end"
            >
              <CustomFilter.ByEducationYear />
              <CustomFilter.ByGroup
                education_year={values?.[FilterKey.EducationYear]}
                formItemClassName="!max-w-[220px]"
              />
              <CustomFilter.BySemester
                education_year={values?.[FilterKey.EducationYear]}
                group_id={values?.[FilterKey.GroupId]}
                formItemClassName="!max-w-[220px]"
              />
            </CustomFilter>
          </Flex>

          {/* Stat Cards */}
          <StatisticsCard className="upper-element" {...{ isDark, PRIMARY }} />

          {/* Main Charts Row */}
          <Flex className="flex flex-col xl:flex-row gap-4" align="stretch">
            {/* Living Status & Geo Location */}
            <LivingStatusCard {...{ isDark, PRIMARY, COLORS, CustomTooltip }} />

            {/* Course Distribution Bar Chart */}
            <ContractTypeCard {...{ CustomTooltip, COLORS, PRIMARY, isDark }} />

            {/* Gender Distribution */}
            <GenderCard {...{ isDark, PRIMARY, CustomTooltip }} />
          </Flex>

          <Row gutter={[18, 18]}>
            <CustomCol>
              <TopAbsentCard {...{ isDark, PRIMARY, CustomTooltip }} />
            </CustomCol>

            <CustomCol>
              <AccommodationCard {...{ isDark, PRIMARY, CustomTooltip }} />
            </CustomCol>

            <CustomCol>
              <SocialCard {...{ isDark, PRIMARY, CustomTooltip, COLORS }} />
            </CustomCol>

            <CustomCol>
              <DistrictsCard {...{ isDark, PRIMARY, COLORS }} />
            </CustomCol>

            <CustomCol>
              <ContractCard {...{ isDark, PRIMARY }} />
            </CustomCol>

            <CustomCol>
              <GeoLocationCard {...{ isDark, PRIMARY }} />
            </CustomCol>
          </Row>

          <GeoLocationMapCard {...{ isDark, PRIMARY }} />
        </Flex>
      </Flex>
    </StatisticsContext.Provider>
  );
};

export default Dashboard;
