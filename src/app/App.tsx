import React, { ReactElement, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { globalSelectors } from "store/selector";
import { globalActions, useglobalSlice } from "store/slice";
import styled from "styled-components";
import {
  COLUMN_ALIGN_START__JUSTIFY_START,
  COLUMN_CENTER,
} from "styles/globalStyles";
import { initGA } from "./analytics";
import { Calendar } from "./containers/Calendar/Loadable";
import { EmailDetail } from "./containers/EmailDetail/Loadable";
import { Home as Dashboard } from "./containers/Home";
import { Home } from "./containers/Home copy";
import { Inbox } from "./containers/Inbox/Loadable";
import { Login } from "./containers/Login";
import { NotFoundPage } from "./containers/NotFound";
import PrivacyPolicy from "./containers/Privacy";
import { Sent } from "./containers/Sent/Loadable";
import { Spam } from "./containers/Spam/Loadable";
import { Tasks } from "./containers/Tasks/Loadable";
import MainLayout from "./layout";
import { CustomRouter } from "./router";
import history from "./router/history";
import { AppPages } from "./types";

interface RequireAuthProps {
  children: ReactElement;
}

const Auth: React.FC<RequireAuthProps> = ({ children }) => {
  const isLoggedIn = useSelector(globalSelectors.isLoggedIn);
  if (!isLoggedIn) {
    history.push(AppPages.Login);
  }

  return children;
};

function App() {
  useEffect(() => {
    initGA();
  }, []);
  useglobalSlice();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(globalActions.getAndSetTheme());
  }, []);

  return (
    <>
      <Wrapper>
        <CustomRouter history={history}>
          <Routes>
            <Route path={AppPages.RootPage} element={<MainLayout />}>
              <Route
                index
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Dashboard />
                    </Auth>
                  </>
                }
              />
              <Route
                path={AppPages.RootPage + AppPages.Inbox}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Inbox />
                    </Auth>
                  </>
                }
              />
              <Route
                path={AppPages.RootPage + AppPages.Sent}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Sent />
                    </Auth>
                  </>
                }
              />
              <Route
                path={AppPages.RootPage + AppPages.Calendar}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Calendar />
                    </Auth>
                  </>
                }
              />
              <Route
                path={AppPages.RootPage + AppPages.Spam}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Spam />
                    </Auth>
                  </>
                }
              />
              <Route
                path={AppPages.RootPage + AppPages.Tasks}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <Tasks />
                    </Auth>
                  </>
                }
              />
              <Route
                path={`${AppPages.RootPage + AppPages.EmailDetail}/:id`}
                element={
                  <>
                    <MobileView>
                      <h1>Download the mobile app. (coming soon)</h1>
                    </MobileView>
                    <Auth>
                      <EmailDetail />
                    </Auth>
                  </>
                }
              />
            </Route>
            <Route
              path={`${AppPages.PrivacyPolicy}`}
              element={<PrivacyPolicy />}
            />
            <Route path={AppPages.Login} element={<Login />}></Route>
            <Route path={AppPages.HomePage} element={<Home />}></Route>
            <Route path={AppPages.NotFoundPage} element={<NotFoundPage />} />
          </Routes>
        </CustomRouter>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  ${COLUMN_ALIGN_START__JUSTIFY_START}
`;
const MobileView = styled.div`
  display: none;
  @media (max-width: 1000px) {
    z-index: 10000;
    position: absolute;
    left: 0;
    top: 0;
    ${COLUMN_CENTER}
    width:100vw;
    height: 100vh;
    background-color: var(--background);
    body {
      overflow: hidden;
    }
  }
`;

export default App;
