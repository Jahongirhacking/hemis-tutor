import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Button, Result } from 'antd';
import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      const lng = getLocalStorage(localStorageNames.language);
      return (
        <Result
          style={{ height: '100dvh', paddingTop: '80px' }}
          status="500"
          title="500"
          subTitle={
            lng === 'ru-RU'
              ? 'Извините, произошла ошибка'
              : lng === 'oz-UZ'
                ? 'Кечирасиз, хатолик юзага келди'
                : lng === 'en-US'
                  ? 'Sorry, an error occurred'
                  : 'Kechirasiz, xatolik yuzaga keldi'
          }
          extra={
            <Button type="primary" href="/">
              {lng === 'ru-RU'
                ? 'Вернуться на главную страницу'
                : lng === 'oz-UZ'
                  ? 'Бош саҳифага қайтиш'
                  : lng === 'en-US'
                    ? 'Return to the homepage'
                    : 'Bosh sahifaga qaytish'}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
