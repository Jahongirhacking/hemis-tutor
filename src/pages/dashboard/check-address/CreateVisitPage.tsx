import { Flex, Tabs } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CreateVisit from './components/CreateVisit';
import StudentAddressInfo from './components/StudentAddressInfo';
import VisitDetails from './components/VisitDetails';

export const CREATE_VISIT_DRAWER = 'visit-drawer';

const CreateVisitPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const studentId = useMemo(
    () => Number(searchParams.get(CREATE_VISIT_DRAWER)),
    [searchParams]
  );

  return (
    <Flex vertical gap={12}>
      <StudentAddressInfo studentId={studentId} />

      <Tabs
        items={[
          {
            key: 'create',
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
            key: 'history',
            label: 'Tashriflar tarixi',
            children: <VisitDetails studentId={studentId} />,
          },
        ]}
      />
    </Flex>
  );
};

export default CreateVisitPage;
