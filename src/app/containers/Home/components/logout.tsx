import { GoogleLogin } from "@react-oauth/google";
import React from "react";
// Define clientId in a .env file or similar for security

export const Login: React.FC = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    alert("Failed");
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin
        auto_select={false}
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </div>
  );
};
