/**
 *
 * Login
 *
 */

import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";

import { GoogleLogin } from "@react-oauth/google";
import history from "app/router/history";
import { AppPages } from "app/types";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { globalActions } from "store/slice";
import styled from "styled-components";
import { loginSaga } from "./saga";
import { Loginselectors } from "./selectors";
import { LoginReducer, sliceKey } from "./slice";
interface Props {}

export function Login(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: LoginReducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useSelector(Loginselectors.root);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const responseMessage = (response: any) => {
    dispatch(globalActions.setLoggedIn(response.credential));
    history.push(AppPages.RootPage);
  };
  const errorMessage = () => {
    alert("Failed");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Container>
        <Title>Login</Title>
        <GoogleButtonStyle>
          <GoogleLogin
            shape="circle"
            size="large"
            onSuccess={responseMessage}
            onError={errorMessage}
          />
        </GoogleButtonStyle>
      </Container>
    </>
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
