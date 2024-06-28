import styled, { css } from "styled-components";
import {
  COLUMN_CENTER,
  ROW_ALIGN_CENTER__SPACE_AROUND,
  ROW_ALIGN_CENTER__SPACE_B,
  ROW_ALIGN_START__JUSTIFY_START,
  ROW_CENTER,
} from "styles/globalStyles";

export const Wrapper = styled.div`
  width: 100%;
  padding: 110px 60px;
`;
export const Box = styled.div`
  height: 190px;
  padding: 35px 16px;
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
export const Container = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_START}
`;
export const BackDropContainer = styled.div`
  opacity: 0;
  z-index: -1;
  transition: 0.3s ease;
  position: absolute;
  top: 0px;
  left: 0;
`;
export const BoxContainer = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_START}
  gap: 24px;
  flex-wrap: wrap;
  width: 525px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 34px;
  color: var(--title);
`;
export const TitleWrapper = styled.div`
  margin-bottom: 40px;
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
export const BoxIcon = styled.div`
  z-index: 1;
  width: 25px;
  height: 25px;
`;
export const BoxNumber = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin-top: 35px;
  color: var(--title);
`;
export const BoxInfoAndToolTip = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
export const BoxToolTip = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`;
export const BoxInfo = styled.div``;

export const BoxQuestion = styled.div`
  width: 12px;
  height: 12px;
`;
export const ChartBox = styled.div`
  border-radius: 32px;
  background-color: var(--dark-gray);
  padding: 16px 24px;
  min-width: 400px;
`;
export const ChartTitle = styled.div`
  font-size: 20px;
`;
export const ChartDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #c4c4c4;
  margin-top: 7px;
  margin-bottom: 17px;
`;
export const ChartTableContainer = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_AROUND}
  background-color: var(--background);
  width: 100%;
  padding: 9px;
  height: 30px;
  border-radius: 12px;
`;
export const ChartAndTable = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
export const TableAndRows = styled.div`
  ${COLUMN_CENTER}
  width:100%;
  margin-right: 40px;
`;
export const TableRow = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
  width:100%;
  padding: 0 34px;
  margin: 14px 0;
`;
export const TableRowTitleWrapper = styled.div`
  ${ROW_CENTER}
`;
export const TableRowColorDiv = styled.div<{ background: string }>`
  width: 20px;
  height: 14px;
  border-radius: 2px;
  margin-right: 5px;
  ${({ background }) =>
    background &&
    css`
      background-color: ${background};
    `}
`;
export const Count = styled.div`
  margin-right: 16px;
`;
