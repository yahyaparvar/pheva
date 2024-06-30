import React from "react";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { Loginselectors } from "../../selectors";

const gradient1 = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const gradient2 = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 50% 50%;
  }
`;

const gradient3 = keyframes`
  0% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 75% 50%;
  }
`;

const gradient4 = keyframes`
  0% {
    background-position: 75% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

interface BodyProps {
  stage: number;
}

const Body = styled.div<BodyProps>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  background: linear-gradient(
    -45deg,
    #ee7752,
    #ee7752,
    #e73c7e,
    #e73c7e,
    #23a6d5,
    #23a6d5,
    #23d5ab,
    #23d5ab,
    #23d5ab,
    #255b41,
    #2c2c2c,
    #2c2c2c
  );
  background-size: 400% 400%;
  ${(props) =>
    props.stage === 1 &&
    css`
      animation: ${gradient1} 2s ease forwards;
    `}
  ${(props) =>
    props.stage === 2 &&
    css`
      animation: ${gradient2} 2s ease forwards;
    `}
  ${(props) =>
    props.stage === 3 &&
    css`
      animation: ${gradient3} 2s ease forwards;
    `}
  ${(props) =>
    props.stage === 4 &&
    css`
      animation: ${gradient4} 2s ease forwards;
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

const Background: React.FC = () => {
  const steps = useSelector(Loginselectors.step);
  return (
    <Body stage={steps}>
      <ContentContainer></ContentContainer>
    </Body>
  );
};

export default Background;
