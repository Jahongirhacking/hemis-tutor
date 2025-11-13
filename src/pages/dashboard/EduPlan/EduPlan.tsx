import { useGetSubjectListMutation } from '@/services/dashboard';
import { ISubjectList } from '@/services/dashboard/type';
import { useGetSemestrMutation } from '@/services/users';
import { ISemestr } from '@/services/users/type';
import { RootState } from '@/store/store';
import { message } from 'antd';
import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './EduPlan.scss';
import InnerEduPlanPage from './InnerEduPlan';

export interface ISemesterWithSubjects extends ISemestr {
  subjects: ISubjectList[];
}
export interface IEduPlanContext {
  sortedSemesterSubjects: ISemesterWithSubjects[];
  isSemestersLoading: boolean;
  isSubjectsLoading: boolean;
}

export const EduPlanContext = createContext<IEduPlanContext>(null);

export const EduPlanPage = () => {
  const [_, { isLoading: isSemestersLoading }] = useGetSemestrMutation();
  const [getSubjectList, { isLoading: isSubjectsLoading }] =
    useGetSubjectListMutation();
  const [subjects, setSubjects] = useState<ISubjectList[][] | null>(null);
  const { semestrs } = useSelector((store: RootState) => store.authSlice);
  const semesters = semestrs?.data;

  useEffect(() => {
    if (!semesters) return;
    const fetchSubjects = async () => {
      try {
        const promises = semesters.map(semester =>
          getSubjectList({ semester: semester.code })
        );
        if (!promises) return;
        const responses = await Promise.all(promises);
        setSubjects(
          responses.map(res => {
            if ('data' in res && 'data' in res.data) {
              return res.data.data;
            }
          })
        );
      } catch (err) {
        message.warning("Fan ma'lumotlarini olishda xatolik yuzaga keldi!");
        console.error(err);
      }
    };
    fetchSubjects();
  }, [semesters]);

  const sortedSemesterSubjects =
    semesters &&
    subjects &&
    subjects.length &&
    semesters
      .map((semester, index) => ({
        ...semester,
        subjects: [...subjects[index]],
      }))
      .filter(semester => semester.subjects.length > 0)
      .sort(
        (semester1, semester2) =>
          semester2?.weeks[0]?.start_date - semester1?.weeks[0]?.start_date
      );

  return (
    <EduPlanContext.Provider
      value={{ sortedSemesterSubjects, isSemestersLoading, isSubjectsLoading }}
    >
      <InnerEduPlanPage />
    </EduPlanContext.Provider>
  );
};
