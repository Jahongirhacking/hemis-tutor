import { CardProps } from 'antd';
import { FC } from 'react';

export interface IStatisticsCardProps extends CardProps {
  PRIMARY: string;
  isDark: boolean;
  COLORS?: string[];
  CustomTooltip?: FC<any>;
}

export enum ExpandItem {
  GROUPS = 'groups',
  STUDENTS = 'students',
  GENDER_STATISTICS = 'gender_statistics',
  EDUCATION_FORM_STATISTICS = 'education_form_statistics',
  COURSE_STATISTICS = 'course_statistics',
  SOCIAL_STATISTICS = 'social_statistics',
  TERRAIN_STATISTICS = 'terrain_statistics',
  LIVING_STATUS_STATISTICS = 'living_status_statistics',
  DISTRICT_STATISTICS = 'district_statistics',
  GEO_LOCATION_STATISTICS = 'geo_location_statistics',
  ATTENDANCE = 'attendance',
  ABSENTEEISM = 'absenteeism',
  PERFORMANCE = 'performance',
  CONTRACTS = 'contracts',
  SEMESTER = 'semester',
  EDUCATION_YEAR = 'education_year',
}
