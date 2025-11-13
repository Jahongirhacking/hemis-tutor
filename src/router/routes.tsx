import Drawer from '@/components/Drawer';
import Wrapper from '@/router/wrapper';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { paths } from './paths';
import PrivateRoute from './privateRoute';
import { privateRoutes } from './routes/privateRoutes';
import { publicRoutes } from './routes/publicRoutes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(publicRoute => (
          <Route
            key={publicRoute.path}
            path={publicRoute.path}
            element={<Wrapper>{publicRoute.element}</Wrapper>}
          >
            {publicRoute?.children?.map(item => (
              <Route
                key={item.path}
                path={item.path}
                element={<Wrapper>{item.element}</Wrapper>}
              ></Route>
            ))}
          </Route>
        ))}

        <Route
          path={paths.base}
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          {privateRoutes.map(publicRoute => (
            <Route
              key={publicRoute.path}
              path={publicRoute.path}
              element={<Wrapper>{publicRoute.element}</Wrapper>}
            >
              {publicRoute?.children?.map(item => (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Wrapper>{item.element}</Wrapper>}
                ></Route>
              ))}
            </Route>
          ))}
        </Route>
      </Routes>

      <Drawer />
    </BrowserRouter>
  );
}
