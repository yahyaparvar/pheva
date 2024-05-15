import React, { ReactElement, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { globalSelectors } from "store/selector";
import { globalActions, useglobalSlice } from "store/slice";
import styled from "styled-components";
import { COLUMN_ALIGN_START__JUSTIFY_START } from "styles/globalStyles";
import { Home } from "./containers/Home";
import { Inbox } from "./containers/Inbox/Loadable";
import { Login } from "./containers/Login";
import { NotFoundPage } from "./containers/NotFound";
import MainLayout from "./layout";
import { CustomRouter } from "./router";
import history from "./router/history";
import { AppPages } from "./types";
import { Sent } from "./containers/Sent/Loadable";

interface RequireAuthProps {
  children: ReactElement;
}

const Auth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(globalSelectors.isLoggedIn);
  if (!isLoggedIn) {
    history.push(AppPages.Login);
  }

  return children;
};

function App() {
  useglobalSlice();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(globalActions.getAndSetTheme());
  }, []);

  return (
    <Wrapper>
      <CustomRouter history={history}>
        <Routes>
          <Route path={AppPages.RootPage} element={<MainLayout />}>
            <Route
              index
              element={
                <Auth>
                  <Home />
                </Auth>
              }
            />
            <Route
              path={AppPages.Inbox}
              element={
                <Auth>
                  <Inbox />
                </Auth>
              }
            />
            <Route
              path={AppPages.Sent}
              element={
                <Auth>
                  <Sent />
                </Auth>
              }
            />
          </Route>
          <Route path={AppPages.Login} element={<Login />}></Route>
          <Route path={AppPages.NotFoundPage} element={<NotFoundPage />} />
        </Routes>
      </CustomRouter>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  ${COLUMN_ALIGN_START__JUSTIFY_START}
`;

export default App;
