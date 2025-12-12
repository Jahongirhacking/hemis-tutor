import Loading from '@/components/Common/Loading';
import { getBaseUrl } from '@/services/api/const';
import { register } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';
import { Flex, message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = !!useSelector((store: RootState) => store.authSlice.access);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new Object();
    const queryParams = new URLSearchParams(location.search);
    queryParams?.forEach((value, key) => {
      params[key] = value;
    });
    (async () => {
      try {
        const { data } = await axios.get(getBaseUrl('/auth/oauth', false), {
          params,
        });
        dispatch(register(data?.data?.token));
        message.success(data?.data?.message);
      } catch (err) {
        console.error(err);
        const res = JSON.parse(err?.request?.response);
        message.warning(res?.description || res?.exception?.message);
        navigate('/login');
      }
    })();
  }, []);

  if (isLogged) return <Navigate to="/dashboard" />;

  return (
    <Flex vertical gap={10}>
      <Loading />
    </Flex>
  );
};

export default CallbackPage;
