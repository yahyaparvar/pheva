import LazyImageComponent from "app/components/image/lazyImage";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import done from "./done.png";
export const Google: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DoneImage src={done}></DoneImage>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  ${COLUMN_CENTER}
`;
const DoneImage = styled(LazyImageComponent)`
  position: absolute;
  left: 32px;
  top: 64px;
`;
