import Loading from '@/components/Common/Loading';
import { RootState } from '@/store/store';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Flex, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CLIENT_ID = '999';
const CLIENT_SECRET = '746d4999359843467d434f348ef26215ecfeb799';

const OAuthCallbackPage = () => {
  const location = useLocation();
  const isLogged = useSelector((store: RootState) => store.authSlice.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    const body = new Object();
    const queryParams = new URLSearchParams(location.search);
    queryParams?.forEach((value, key) => {
      body[key] = value;
    });
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) return;

        // Prepare x-www-form-urlencoded body
        const data = qs.stringify({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: 'https://my.hemis.uz/auth/oauth-callback',
          code: code,
        });
        const res = await axios.post(
          `${((getLocalStorage(localStorageNames.universityApi) as string) || '')?.replace('/rest/v1', '')}/oauth/access-token`,
          data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.error(err);
        message.warning(JSON.parse(err?.request?.response)?.error);
        navigate('/');
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

export default OAuthCallbackPage;
