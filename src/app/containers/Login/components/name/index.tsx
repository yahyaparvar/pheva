import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  COLUMN_ALIGN_START__JUSTIFY_START,
  COLUMN_CENTER,
  UNSELECTABLE,
} from "styles/globalStyles";
import { Loginselectors } from "../../selectors";
import { LoginActions } from "../../slice";
import logo from "./logo.png";
import LazyImageComponent from "app/components/image/lazyImage";

export const NameInput = () => {
  const dispatch = useDispatch();
  const name = useSelector(Loginselectors.name);

  return (
    <InputContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <InputAndButton>
        <StyledInput
          value={name}
          onChange={(e) => {
            dispatch(LoginActions.setName(e.target.value));
          }}
          type="text"
          name="name"
          placeholder="First Name"
        />
        <StyledButton
          onClick={() => {
            dispatch(LoginActions.nextStep());
          }}
          disabled={name === ""}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
        </StyledButton>
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

const InputContainer = styled(motion.div)`
  display: flex;
  ${UNSELECTABLE}
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  align-items: center;
  z-index: 1;
`;

const InputAndButton = styled.div`
  ${COLUMN_ALIGN_START__JUSTIFY_START}
`;

const Logo = styled(LazyImageComponent)`
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

const StyledButton = styled(motion.button)<{ disabled: boolean }>`
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
      opacity: 0.2;
    `}
  cursor: pointer;
  ${UNSELECTABLE}
  transition: 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  &:active {
    transform: scale(0.98);
  }
`;
