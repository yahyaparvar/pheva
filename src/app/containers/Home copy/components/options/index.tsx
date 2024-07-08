import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import backDrop from "./backDrop.png";
import optionsImage from "./option.png";

export const Options = () => {
  return (
    <Wrapper>
      <Title>Play with magic</Title>
      <Description>
        Summarize, decline or accept a email with just a button
      </Description>
      <OptionImage src={optionsImage} alt="" />
      <BackDrop src={backDrop} alt="" />
    </Wrapper>
  );
};
const OptionImage = styled.img`
  width: 800px;
  height: 340px;
  margin-top: 24px;
  z-index: 1;
  @media screen and (max-width: 880px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  ${COLUMN_CENTER}
  padding-top:140px;
  padding-bottom: 340px;
  width: 100%;
  @media screen and (max-width: 880px) {
    padding-bottom: 240px;
  }
`;
const Title = styled.h2`
  margin: 0;
  font-size: 60px;
  z-index: 1;
  @media screen and (max-width: 880px) {
    font-size: 42px;
    text-align: center;
    padding: 20px;
  }
`;
const Description = styled.p`
  font-size: 26px;
  @media screen and (max-width: 880px) {
    padding: 20px;
    text-align: center;
    font-size: 20px;
  }
  text-align: center;
  font-weight: 300;
  z-index: 1;
`;
const BackDrop = styled.img`
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  max-width: 1100px;
  @media screen and (max-width: 880px) {
  }
`;
