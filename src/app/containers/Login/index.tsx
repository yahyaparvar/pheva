import { useGoogleLogin } from "@react-oauth/google";
import MotionBox from "app/components/animated";
import history from "app/router/history";
import { AppPages } from "app/types";

import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "service/apiClient";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { globalActions } from "store/slice";
import styled from "styled-components";
import { loginSaga } from "./saga";
import { LoginReducer, sliceKey } from "./slice";

interface Props {}

export function Login(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: LoginReducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });

  const dispatch = useDispatch();

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
    <MotionBox>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Container>
        <Title>Login</Title>
        <GoogleButtonStyle>
          <button onClick={() => googleLogin()}>Login with Google</button>
        </GoogleButtonStyle>
        <ToastContainer />
      </Container>
    </MotionBox>
  );
}

const GoogleButtonStyle = styled.div`
  width: 225px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background-color: #4285f4;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  &:active {
    background-color: #3367d6;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;
