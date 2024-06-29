import styled, { css } from "styled-components";
import {
  COLUMN_ALIGN_START__JUSTIFY_START,
  COLUMN_CENTER,
  UNSELECTABLE,
} from "styles/globalStyles";
import logo from "./logo.png";

export const NameInput = () => {
  return (
    <InputContainer>
      <InputAndButton>
        <StyledInput type="text" name="name" placeholder="First Name" />
        <StyledButton disabled={false}>Start</StyledButton>
      </InputAndButton>
      <LogoAndInfo>
        <Logo src={logo}></Logo>
        <Info>
          Pheva is an AI powered virtual assistance which helps you manage your
          daily work. Powered by <br /> OpenAI GPT 3.5
        </Info>
      </LogoAndInfo>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  ${UNSELECTABLE}
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  align-items: center;
`;
const InputAndButton = styled.div`
  ${COLUMN_ALIGN_START__JUSTIFY_START}
`;

const Logo = styled.img`
  height: auto;
  width: 200px;
`;

const LogoAndInfo = styled.div`
  ${COLUMN_CENTER}
`;

const Info = styled.div`
  font-size: 18px;
  line-height: 26px;
  margin-top: 24px;
  width: 450px;
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  height: 51px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 16px;
  color: #eee;
  background-color: #333;
  width: 100%;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    border-color: #4285f4;
    box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
    outline: none;
  }
  width: 400px;
  &::placeholder {
    color: #777;
  }
`;

const StyledButton = styled.button<{ disabled: boolean }>`
  padding: 7px 30px;
  margin-top: 16px;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  color: #fff;
  font-size: 18px;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
    `}
  cursor: pointer;
  ${UNSELECTABLE}
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  &:active {
    transform: scale(0.98);
  }
`;
