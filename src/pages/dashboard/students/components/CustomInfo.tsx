import PieChartWithCustomizedLabel from '@/components/Charts/PieChart';
import { useGetGroupDetailsQuery } from '@/services/student';
import { SearchParams } from '@/utils/config';
import { Card, Descriptions, Flex, Skeleton, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CustomTabs from '../../components/CustomTabs';
import AcademicInfo from './AcademicInfo';
import StudentDetails from './StudentDetails';
import StudentHistory from './StudentHistory';
import StudentPassport from './StudentPassport';

const CustomInfo = () => { };

enum StudentTabKeys {
  PASSPORT = 'passport',
  ACADEMIC = 'academic',
  DETAILS = 'details',
  HISTORY = 'history',
}

const StudentInfo = (props: any) => {
  return (
    <CustomTabs
      field={SearchParams.DrawerTab}
      defaultActiveKey={StudentTabKeys.PASSPORT}
      items={[
        {
          key: StudentTabKeys.PASSPORT,
          label: 'Talaba pasporti',
          children: <StudentPassport {...props} />,
        },
        {
          key: StudentTabKeys.DETAILS,
          label: "Talaba ma'lumoti",
          children: <StudentDetails {...props} />,
        },
        {
          key: StudentTabKeys.HISTORY,
          label: 'Talaba tarixi',
          children: <StudentHistory {...props} />,
        },
        {
          key: StudentTabKeys.ACADEMIC,
          label: "Akademik ma'lumot",
          children: <AcademicInfo {...props} />,
        },
      ]}
      type="line"
    />
  );
};

const GROUP_INFO_SIZE = {
  xs: 24,
  md: 12,
};

const GroupInfo = ({ props: groupId }: { props?: string }) => {
  const { data: groupData, isFetching } = useGetGroupDetailsQuery(
    { id: Number(groupId) },
    { skip: !groupId }
  );
  const { t } = useTranslation();

  return isFetching ? (
    <Card>
      <Skeleton active />
    </Card>
  ) : (
    <Flex gap={18} vertical align="center">
      <Typography.Title level={3} className="m-0">
        {groupData?.result?.group?.name}
      </Typography.Title>
      <Descriptions
        className="w-full"
        bordered
        items={[
          {
            label: t('const.education_form'),
            children: groupData?.result?.group?.education_form?.name,
            span: { ...GROUP_INFO_SIZE },
          },
          {
            label: t('const.faculty'),
            children: groupData?.result?.group?.department?.name,
            span: { ...GROUP_INFO_SIZE },
          },
          {
            label: t('const.education_type'),
            children: groupData?.result?.group?.education_type?.name,
            span: { ...GROUP_INFO_SIZE },
          },
          {
            label: "Ta'lim tili",
            children: groupData?.result?.group?.education_lang?.name,
          },
        ]}
      />
      <Flex className="w-full flex-wrap md:flex-nowrap">
        <PieChartWithCustomizedLabel
          data={[
            {
              value: groupData?.result?.statistics?.male_students,
              name: 'Erkak',
            },
            {
              value: groupData?.result?.statistics?.female_students,
              name: 'Ayol',
            },
          ]}
          colors={['#438deeff', '#d826c0ff']}
        />
        <PieChartWithCustomizedLabel
          data={[
            {
              value: groupData?.result?.statistics?.active_students,
              name: 'Faol',
            },
            {
              value:
                groupData?.result?.statistics?.total_students -
                groupData?.result?.statistics?.active_students,
              name: 'Nofaol',
            },
          ]}
          colors={['#32d36fff', '#8d8d8dff']}
        />
      </Flex>
    </Flex>
  );
};

CustomInfo.Student = StudentInfo;
CustomInfo.Group = GroupInfo;
export default CustomInfo;
