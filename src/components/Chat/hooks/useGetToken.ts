import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useGetToken = () => {
  const [ready, setReady] = useState(false);
  const student_id_number = useSelector(
    (store: RootState) => store.authSlice.profile?.data?.student_id_number
  );
  const student_url = (
    getLocalStorage(localStorageNames.universityApi) as string
  )?.replace('rest/v1', '');

  useEffect(() => {
    if (student_id_number && student_url) setReady(true);
  }, [student_id_number, student_url]);

  return {
    ready,
    token: `${student_id_number}~${student_url}`,
  };
};

export default useGetToken;
