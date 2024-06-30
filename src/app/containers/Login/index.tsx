import { useGoogleLogin } from "@react-oauth/google";
import history from "app/router/history";
import { AppPages } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "service/apiClient";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { globalActions } from "store/slice";
import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import ChangingBackground from "./components/background";
import { From } from "./components/from";
import { Google } from "./components/google";
import { NameInput } from "./components/name";
import { Work } from "./components/work";
import { loginSaga } from "./saga";
import { Loginselectors } from "./selectors";
import { LoginReducer, sliceKey } from "./slice";
interface Props {}

export function Login(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: LoginReducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });
  const step = useSelector(Loginselectors.step);
  const dispatch = useDispatch();
  const GoogleStaticButton = (
    <GoogleButton onClick={() => googleLogin()}>
      <i className="fab fa-google"></i> Login with Google
    </GoogleButton>
  );
  const renderComponents = () => {
    switch (step) {
      case 1:
        return (
          <AnimatePresence mode="wait">
            <NameInput />
          </AnimatePresence>
        );
      case 2:
        return <Work></Work>;
      case 3:
        return <From></From>;
      default:
        return <Google>{GoogleStaticButton}</Google>;
    }
  };

  const responseMessage = async (response: any) => {
    try {
      // Send the authorization code to your backend
      const result = await axiosInstance.post("auth/google", {
        code: response.code,
      });

      const token = result.data;
      dispatch(globalActions.setLoggedIn(token));
      history.push(AppPages.RootPage);
    } catch (error) {
      console.error("Error during authentication", error);
      toast.error("Login Failed!");
    }
  };

  const errorMessage = (error: any) => {
    console.error("Login failed", error);
    toast.error("Login Failed!");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly",
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Container>
        <ChangingBackground></ChangingBackground>
        <ComponentsWrapper>{renderComponents()}</ComponentsWrapper>
        <ToastContainer />
      </Container>
    </>
  );
}

const GoogleButton = styled(motion.button)`
  width: 225px;
  padding: 10px;
  background-color: #23a6d5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  i {
    font-size: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;
const ComponentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  ${COLUMN_CENTER}
`;
