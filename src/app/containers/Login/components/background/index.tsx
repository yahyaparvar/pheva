// App.tsx
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const gradient = keyframes`
  to {
    background-position: 100% 50%;
  }
`;

interface BodyProps {
  animate: boolean;
}

const Body = styled.div<BodyProps>`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  ${(props) =>
    props.animate &&
    css`
      animation: ${gradient} 2s ease forwards;
    `}
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 300;
  color: white;
  margin: 0;
`;


const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  color: white;
  background: none;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  i {
    margin-right: 0.5rem;
  }
`;


const App: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  const handleAnimationStart = () => {
    setAnimate(true);
    // No need for setTimeout to reset animate state here, as we want it to stay after animation ends
  };

  return (
    <Body animate={animate}>
      <ContentContainer>
        <Title>Pure CSS Gradient Background Animation</Title>
        <Button onClick={handleAnimationStart}>
          <i className="fas fa-play"></i> Start Animation
        </Button>
      </ContentContainer>
    </Body>
  );
};

export default App;
