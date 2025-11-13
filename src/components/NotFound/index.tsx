import { privateRoutes } from '@/router/routes/privateRoutes';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      style={{ height: '100dvh', paddingTop: '80px' }}
      subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
      extra={
        <Button type="primary" onClick={() => navigate(privateRoutes[0].path)}>
          Orqaga qaytish
        </Button>
      }
    />
  );
};

export default NotFound;
