import { useGetSubjectListMutation } from '@/services/dashboard';
import { ISubjectList } from '@/services/dashboard/type';
import { RootState } from '@/store/store';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useGetSubjectsList = (skip: boolean = false) => {
  const { semestrs } = useSelector((store: RootState) => store.authSlice);
  const [getSubjectList] = useGetSubjectListMutation();
  const semesters = semestrs?.data;
  const [isLoading, setIsLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState<ISubjectList[]>();

  useEffect(() => {
    if (skip) return;
    if (semesters && semesters?.length) {
      const fetchSubjects = async () => {
        setIsLoading(true);
        try {
          const promises = semesters.map(semester =>
            getSubjectList({ semester: semester.code })
          );
          if (!promises) return;
          const responses = await Promise.all(promises);
          setSubjectsList(
            responses
              ?.map(res => {
                if ('data' in res && 'data' in res.data) {
                  return res.data.data;
                }
              })
              ?.reduce((acc, curr) => [...acc, ...curr])
          );
        } catch (err) {
          message.warning("Fan ma'lumotlarini olishda xatolik yuzaga keldi!");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSubjects();
    }
  }, [semesters, skip]);

  return {
    isLoading,
    subjectsList,
  };
};

export default useGetSubjectsList;
