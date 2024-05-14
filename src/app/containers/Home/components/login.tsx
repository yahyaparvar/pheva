import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useDispatch } from "react-redux";
import { globalActions } from "store/slice";
import styled from "styled-components";
// Define clientId in a .env file or similar for security

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  });
  const responseMessage = (response: any) => {
    dispatch(globalActions.setLoggedIn(response.credential));
  };
  const errorMessage = () => {
    alert("Failed");
  };
  return (
    <Container>
      <Title>React Google Login</Title>
      <GoogleButtonStyle>
        <GoogleLogin
          shape="circle"
          size="large"
          onSuccess={responseMessage}
          onError={errorMessage}
        />
      </GoogleButtonStyle>
    </Container>
  );
};

const GoogleButtonStyle = styled.div`
  width: 225px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
