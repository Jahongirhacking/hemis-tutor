import {
  useGetGradeTypeListQuery,
  useGetSubjectListMutation,
  useGetSubjectsMutation,
} from '@/services/dashboard';
import {
  EducationYear,
  IMarkingSystem,
  ISubjectList,
  ISubjects,
} from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

type IGradeObject = Record<string, number>;

type Action = { type: 'UPDATE_GRADES'; payload: IGradeObject };

const MIN_GRADE = 0;

const useCalculate = () => {
  const [subjectsData, setSubjects] = useState<ISubjects[]>([]);
  const [subjectListData, setSubjectList] = useState<ISubjectList[]>([]);
  const { semestrs: semesters, currentSemester } = useSelector(
    (store: RootState) => store?.authSlice
  );
  const [activeEduYear, setActiveEduYear] = useState<EducationYear['code']>();

  const { data: gradeTypeData, isFetching } = useGetGradeTypeListQuery();
  const [getSubjectList] = useGetSubjectListMutation();
  const [getSubjects, { isLoading: isSubjectsFetching }] =
    useGetSubjectsMutation();

  const currentSemesters = useMemo(
    () =>
      semesters?.data?.filter(s => s?.education_year?.code === activeEduYear),
    [semesters, activeEduYear]
  );

  const reducer = (state: IGradeObject, action: Action): IGradeObject => {
    switch (action.type) {
      case 'UPDATE_GRADES':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [grades, setGrades] = useReducer(reducer, {});

  const eduYears = useMemo(
    () =>
      semesters?.data?.reduce(
        (acc: EducationYear[], curr) => [
          ...acc,
          ...(acc?.find(s => s?.code === curr?.education_year?.code)
            ? []
            : [curr?.education_year]),
        ],
        []
      ),
    [semesters]
  );

  const markingSystems = useMemo(
    () =>
      gradeTypeData?.data
        ?.reduce(
          (acc, curr) =>
            acc?.find(
              (el: IMarkingSystem) => el?.code === curr?.markingSystem?.code
            )
              ? acc
              : [...acc, curr?.markingSystem],
          [] as IMarkingSystem[]
        )
        ?.sort((a, b) => Number.parseInt(a?.code) - Number.parseInt(b?.code)),
    [gradeTypeData]
  );

  const [currentMarkingSystem, setCurrentMarkingSystem] = useState<string>();

  const maxBorder = useMemo(
    () =>
      gradeTypeData?.data
        ?.filter(t => t?.markingSystem?.code === currentMarkingSystem)
        ?.reduce((acc, curr) => Math.max(acc, curr?.max_border || 0), 5),
    [gradeTypeData, currentMarkingSystem]
  );

  const convertGrade = useCallback(
    (grade: number) => {
      if (gradeTypeData?.data?.length) {
        return (
          Number.parseFloat(
            gradeTypeData?.data?.find(
              g =>
                g?.markingSystem?.code === currentMarkingSystem &&
                g?.max_border >= grade &&
                g?.min_border <= grade
            )?.name
          ) || MIN_GRADE
        );
      }
    },
    [gradeTypeData, currentMarkingSystem]
  );

  const calculatedGPA = useMemo(() => {
    if (
      (subjectsData || subjectListData) &&
      Object.keys(grades).length &&
      gradeTypeData
    ) {
      const hasGrade = !!subjectListData?.length;
      if (hasGrade) {
        const sum = subjectListData?.reduce((acc, curr) => {
          const subjectInfo = subjectsData?.find(
            s => s?.subject?.id === curr?.curriculumSubject?.subject?.id
          );
          const temp_grade = grades[curr?.curriculumSubject?.subject?.id] || 0;
          const real_grade = convertGrade(temp_grade);
          return acc + subjectInfo?.credit * real_grade;
        }, 0);
        return (
          sum /
          subjectListData?.reduce(
            (acc, curr) => acc + (curr?.curriculumSubject?.credit || 0),
            0
          )
        );
      }

      const sum = subjectsData?.reduce((acc, curr) => {
        const temp_grade = grades[curr?.subject?.id] || 0;
        const real_grade = convertGrade(temp_grade);
        return acc + curr?.credit * real_grade;
      }, 0);
      return sum / subjectsData?.reduce((acc, curr) => acc + curr?.credit, 0);
    }
  }, [subjectsData, subjectListData, grades, gradeTypeData]);

  const visibleSubjects = useMemo(
    () =>
      !!subjectListData?.length
        ? [...subjectListData?.map(s => s?.curriculumSubject)]
        : [...subjectsData],
    [subjectListData, subjectsData]
  );

  useEffect(() => {
    if (getLocalStorage(localStorageNames.markingSystem)) {
      setCurrentMarkingSystem(
        String(getLocalStorage(localStorageNames.markingSystem))
      );
    } else if (markingSystems?.length) {
      setCurrentMarkingSystem(markingSystems[0]?.code);
    }
  }, [markingSystems]);

  useEffect(() => {
    if (currentSemester?.education_year) {
      setActiveEduYear(currentSemester?.education_year?.code);
    }
  }, [currentSemester]);

  useEffect(() => {
    if (currentSemesters?.length) {
      Promise.all(
        currentSemesters?.map(el => getSubjectList({ semester: el?.code }))
      ).then(results => {
        const res = results?.reduce(
          (acc, curr) => [...acc, ...('data' in curr ? curr?.data?.data : [])],
          []
        );
        setSubjectList(res);
      });
    }
  }, [getSubjectList, currentSemesters]);

  useEffect(() => {
    if (currentSemesters?.length) {
      Promise.all(
        currentSemesters?.map(el => getSubjects({ semester: el?.code }))
      ).then(results => {
        const res = results?.reduce(
          (acc, curr) => [...acc, ...('data' in curr ? curr?.data?.data : [])],
          []
        );
        setSubjects(res);
      });
    }
  }, [getSubjectList, currentSemesters]);

  useEffect(() => {
    if (subjectsData) {
      let temp_grades = subjectsData?.reduce(
        (acc, curr) => ({ ...acc, [curr?.subject?.id]: 0 }),
        {}
      );
      if (subjectListData) {
        temp_grades = subjectListData?.reduce(
          (acc, curr) => ({
            ...acc,
            [curr?.curriculumSubject?.subject?.id]: curr?.overallScore?.grade,
          }),
          temp_grades
        );
      }
      setGrades({ type: 'UPDATE_GRADES', payload: temp_grades });
    }
  }, [subjectsData, subjectListData, currentMarkingSystem]);

  return {
    subjectListData,
    subjectsData,
    grades,
    setGrades,
    maxBorder,
    isFetching,
    isSubjectsFetching,
    markingSystems,
    currentMarkingSystem,
    setCurrentMarkingSystem,
    activeEduYear,
    setActiveEduYear,
    semesters,
    currentSemester,
    eduYears,
    calculatedGPA,
    currentSemesters,
    gradeTypeData,
    convertGrade,
    visibleSubjects,
  };
};

export default useCalculate;
