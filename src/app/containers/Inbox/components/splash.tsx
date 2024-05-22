// SplashAnimation.tsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the splash animation
const splashAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

// Define the props for the Splash component
interface SplashProps {
  show: boolean;
}

// Create a styled component for the splash
const Splash = styled.div<SplashProps>`
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #282c34;
  color: white;
  font-size: 2em;
  animation: ${splashAnimation} 3s ease-out forwards;
`;

const SplashAnimation: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Hide the splash screen after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Splash show={showSplash}>Welcome to My SplashAnimation</Splash>
      <div style={{ display: showSplash ? "none" : "block" }}>
        {/* Your main splashAnimation content goes here */}
        <h1>My Main SplashAnimation</h1>
      </div>
    </>
  );
};

export default SplashAnimation;
