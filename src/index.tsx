import { GoogleOAuthProvider } from "@react-oauth/google";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { FontLoadingPage } from "app/components/fontLoading";
import { Themes } from "app/types";
import FontFaceObserver from "fontfaceobserver";
import i18n from "locales/i18n";
import { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureAppStore } from "store/configureStore";
import { LocalStorageKeys, storage } from "store/storage";
import GlobalStyle from "styles/globalStyles";
import App from "./app/App";

interface Props {
  Component: typeof App;
}

const getThemeBeforeRedux = () => {
  const savedTheme = storage.read(LocalStorageKeys.THEME);
  const app = document.querySelector("body");
  if (app) {
    app.classList.add(savedTheme);
  }
  if (!savedTheme) {
    storage.write(LocalStorageKeys.THEME, Themes.LIGHT);
  }
};

const store = configureAppStore({});

const ConnectedApp = ({ Component }: Props) => {
  const [areFontsLoaded, setAreFontsLoaded] = useState(false);

  useLayoutEffect(() => {
    const fontObservers = [
      new FontFaceObserver("Inter"),
      new FontFaceObserver("Rubik"),
      new FontFaceObserver("Luxurious Script"),
      new FontFaceObserver("Playwrite DE Grund"),
      new FontFaceObserver("Public Sans"),
      new FontFaceObserver("Gideon Roman"),
    ];

    Promise.all(fontObservers.map(observer => observer.load()))
      .then(() => {
        setAreFontsLoaded(true);
        document.body.classList.add("fontsLoaded");
      })
      .catch(err => {
        console.error("One or more fonts failed to load", err);
      });

    getThemeBeforeRedux();
  }, []);

  const clientId = "1084561252653-rp5e7io2uq9gh8e0hkcu2mc9vl67g3r1.apps.googleusercontent.com";

  return (
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <I18nextProvider i18n={i18n}>
          <SkeletonTheme
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          >
            <GlobalStyle />
            <ToastContainer />
            <HelmetProvider>
              {areFontsLoaded ? <Component /> : <FontLoadingPage />}
            </HelmetProvider>
          </SkeletonTheme>
        </I18nextProvider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<ConnectedApp Component={App} />);
