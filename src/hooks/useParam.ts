import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const useParamActions = () => {
  const navigate = useNavigate();
  const pathLocation = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMakeParams = (key: string, value: string) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const searchQuery = Object.fromEntries(searchParams);

  return {
    navigate,
    searchQuery,
    pathLocation,
    searchParams,
    handleMakeParams,
  };
};
