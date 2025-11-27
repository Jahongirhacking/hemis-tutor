import { useGetVisitListQuery } from '@/services/student';
import { SearchParams } from '@/utils/config';
import { Badge, Flex } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomTabs from '../components/CustomTabs';
import StudentFullInfo, {
  StudentInfoTypes,
} from '../components/StudentFullInfo';
import CreateVisit from './components/CreateVisit';
import VisitDetails from './components/VisitDetails';

export const CREATE_VISIT_DRAWER = 'visit-drawer';

export enum DrawerTabKeys {
  CREATE = 'create',
  HISTORY = 'history',
}

const CreateVisitPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const studentId = useMemo(
    () => Number(searchParams.get(CREATE_VISIT_DRAWER)),
    [searchParams]
  );
  const { data: visitData } = useGetVisitListQuery(
    { student_id: studentId },
    { skip: !studentId }
  );

  return (
    <Flex vertical gap={12}>
      <StudentFullInfo
        studentId={studentId}
        infoTypes={[StudentInfoTypes.ADDRESS]}
      />
      <CustomTabs
        field={SearchParams.DrawerTab}
        items={[
          {
            key: DrawerTabKeys.CREATE,
            label: 'Tashrifni qayd etish',
            children: (
              <CreateVisit
                studentId={studentId}
                onSuccess={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete(CREATE_VISIT_DRAWER);
                  setSearchParams(params);
                }}
              />
            ),
          },
          {
            key: DrawerTabKeys.HISTORY,
            label: (
              <Flex gap={6} align="center">
                Tashriflar tarixi{' '}
                {visitData?.result?.items?.[0] && (
                  <Badge
                    color="blue"
                    count={visitData?.result?.items?.[0]?.tutorVisits?.length}
                  />
                )}
              </Flex>
            ),
            children: <VisitDetails studentId={studentId} />,
          },
        ]}
        type="line"
      />
    </Flex>
  );
};

export default CreateVisitPage;
