import { RootState } from '@/store/store';
import { isTestUniversity as checkTestUniversity } from '@/utils/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTestUniversity = () => {
  const profile = useSelector((store: RootState) => store.authSlice?.profile);
  const [isTestUniversity, setIsTestUniversity] = useState(false);

  useEffect(() => {
    setIsTestUniversity(checkTestUniversity());
  }, [profile]);

  return {
    isTestUniversity,
  };
};

export default useTestUniversity;
