import styled from "styled-components";
import {
  ROW_ALIGN_START__JUSTIFY_START,
  ROW_CENTER,
} from "styles/globalStyles";

export const Wrapper = styled.div`
  width: 100%;
  padding: 110px 60px;
`;
export const Box = styled.div`
  height: 190px;
  width: 240px;
  background-color: var(--dark-gray);
  border-radius: 32px;
  position: relative;
  transition: 0.3s ease;
  &:hover {
    scale: 1.04;
    box-shadow: 0 4px 8px var(--drop-secondary);
    background-color: var(--drop-bg-color);
    div {
      opacity: 1 !important;
    }
  }
`;
export const BackDropContainer = styled.div`
  opacity: 0;
  transition: 0.3s ease;
  position: absolute;
  top: 0px;
`;
export const BoxContainer = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_START}
  gap: 24px;
  flex-wrap: wrap;
  width: 600px;
  margin-top: 40px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 34px;
  color: var(--title);
  margin-bottom: 10px;
`;
export const TitleWrapper = styled.div`
  ${ROW_CENTER}
  width: fit-content;
`;

export const IconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: #5a67d8;
  }
`;
