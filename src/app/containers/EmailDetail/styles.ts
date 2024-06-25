
import { motion } from "framer-motion";
import styled from "styled-components";
import { COLUMN_CENTER, COLUMN_ALIGN_START__JUSTIFY_CENTER, ROW_ALIGN_CENTER__SPACE_B, ROW_ALIGN_START__JUSTIFY_START } from "styles/globalStyles";

export const Container = styled.div`
  padding-bottom: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
`;

export const Wrapper = styled.div`
  ${COLUMN_CENTER}
  min-height:100vh;
  background-color: var(--background);
  position: relative;
`;

export const EmailInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const EmailTitle = styled.h3`
  font-size: 20px;
  color: var(--text);
  font-weight: 600;
  margin: 7px 0;
  margin-top: 4px;
  margin-left: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 700px;
`;

export const EmailField = styled.p`
  font-size: 13px;
  margin: 4px 0;
  color: var(--text);
  strong {
    color: var(--text);
    margin-right: 12px;
  }
`;

export const EmailContent = styled.div`
  box-sizing: border-box !important;
  width: 97%;
  margin: 0 auto;
  margin-top: 24px;
  background-color: #747171;
  padding: 12px;
  border-radius: 8px;
  * {
    color: unset;
  }
`;

export const EmailPartContainer = styled.div`
  ${COLUMN_CENTER}
  margin-bottom: 10px;
  width: 100%;
`;
export const EmailPartTextContainer = styled.div`
  ${COLUMN_ALIGN_START__JUSTIFY_CENTER}
  margin-bottom: 10px;
  width: 100%;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  margin-right: 15px;
  width: 35px;
  height: 35px;
`;
export const SendToAndDate = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
export const AiActions = styled(motion.div)`
  ${ROW_ALIGN_START__JUSTIFY_START}
  gap:8px;
  padding: 14px;
`;
export const EditorContainer = styled(motion.div)`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
`;
export const EmailHeaderDiv = styled.div`
  box-sizing: border-box;
  background: var(--dark-gray);
  padding: 5px 20px 3px 20px;
`;

export const ThreadInfo = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
export const ThreadImageAndEmail = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_START}
`;
export const ThreadDivider = styled.div`
  height: 1px;
  width: 100%;
  margin-bottom: 24px;
  background-color: var(--background);
`;
