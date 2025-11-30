import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import Snowfalling from './components/SpecialComponents/Snowfalling.tsx';
import './i18n.ts';
import i18n from './i18n.ts';
import './index.scss';
import AntConfigProvider from './layouts/AndtTheme.tsx';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <ErrorBoundary>
      <Provider store={store}>
        <AntConfigProvider>
          <HelmetProvider>
            <>
              <Helmet>
                <title>TUTOR.HEMIS.UZ - Talaba Boshqaruv Tizimi</title>
                <meta
                  name="description"
                  content="HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
                />
                <meta
                  name="keywords"
                  content="HEMIS, Oliy ta’lim tizimi, boshqarish axborot tizimi, ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, moliyaviy boshqaruv, OTM, talaba axborot tizimi, o‘qituvchi axborot tizimi, oliy ta’lim boshqaruvi, HEMIS yo‘riqnoma, Oliy ta’lim muassasalari"
                />
                <meta property="og:title" content="TUTOR.HEMIS.UZ" />
                <meta
                  property="og:description"
                  content="HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi."
                />
                <meta property="og:image" content="/images/hemis-icon.svg" />
              </Helmet>
              <App />
              <Snowfalling />
            </>
          </HelmetProvider>
        </AntConfigProvider>
      </Provider>
    </ErrorBoundary>
  </I18nextProvider>
);
