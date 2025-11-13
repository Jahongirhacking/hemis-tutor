import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import SubjectDetailSkeleton from '@/components/Skeletons/SubjectDetailSkeleton';
import {
  useGetSubjectIDMutation,
  useGetSubjectResourceMutation,
} from '@/services/dashboard';
import { RootState } from '@/store/store';
import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { Result, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Resources from './_Resources';
import Tasks from './_Tasks';
import './style.scss';

const SubjectDetailPage = () => {
  const TAB_NAME = 'subject-tab';
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [getSubjectID, { data, isLoading }] = useGetSubjectIDMutation();
  const [getSubjectRES, { data: resources }] = useGetSubjectResourceMutation();
  const [activeTab, setActiveTab] = useState(
    getExistedOne(
      getLocalStorage(localStorageNames.temporaryTabs)[TAB_NAME],
      'resources'
    )
  );
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const prevRefSemesterCode = useRef<string | null>(null);
  const { t } = useTranslation();

  const tabItems = [
    {
      label: t('const.resources'),
      key: 'resources',
      children: <Resources resources={resources?.data} />,
    },
    {
      label: t('const.tasks'),
      key: 'tasks',
      children: <Tasks tasks={data?.data} />,
    },
    // {
    //   label: t('const.thematic_tests'),
    //   key: 'tests',
    //   children: <Tests />,
    // },
  ];

  useEffect(() => {
    setLocalStorage(localStorageNames.temporaryTabs, {
      ...getLocalStorage(localStorageNames.temporaryTabs),
      [TAB_NAME]: activeTab,
    });
  }, [activeTab]);

  useEffect(() => {
    if (currentSemester) {
      getSubjectID({
        semestr: getExistedOne(currentSemester?.code, '11'),
        subject: `${subjectId}`,
      });
      getSubjectRES({
        semestr: getExistedOne(currentSemester?.code, '11'),
        subject: `${subjectId}`,
      });
    }
  }, [getSubjectRES, getSubjectID, subjectId, currentSemester]);

  useEffect(() => {
    if (!currentSemester) return;
    if (!prevRefSemesterCode.current) {
      prevRefSemesterCode.current = currentSemester.code;
      return;
    }
    if (prevRefSemesterCode.current !== currentSemester.code) {
      navigate('/dashboard/subjects');
    }
  }, [currentSemester]);

  if (isLoading)
    return (
      <GenerateSkeleton>
        <SubjectDetailSkeleton />
      </GenerateSkeleton>
    );

  if (!data?.data) {
    return (
      <Result
        style={{ height: '100dvh', paddingTop: '80px' }}
        status="404"
        title="404"
        subTitle={`${t('const.sorry')}, ${t('const.subject')} ${t('const.not_found')}!`}
        extra={
          <Link to={'/dashboard/subjects'}>
            {t('const.back_to_section', { section: t('const.subjects') })}
          </Link>
        }
      />
    );
  }

  return (
    <section className="section dashboard__outlet">
      <h2 className="section_title">{data?.data?.subject?.name}</h2>
      <div className="dashboard__outlet--content">
        <Tabs
          className="subject__tabs"
          type="card"
          items={tabItems}
          onChange={key => setActiveTab(key)}
          activeKey={activeTab}
        />
      </div>
    </section>
  );
};

export default SubjectDetailPage;
