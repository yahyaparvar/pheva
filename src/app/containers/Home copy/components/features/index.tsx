import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import Carousel from "./components/slider";

export const Features = () => {
  return (
    <Wrapper>
      <Title>Get it all in one</Title>
      <SecondTitle>Google related</SecondTitle>
      <Description>
        To boost your productivity, Pheva is designed to include all
        productivity related features such as tasks, calendar management and
        email. All this in one place. Don't forget the AI powered features
      </Description>
      <Carousel />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 120px;
  padding-bottom: 410px;
  border-radius: 60px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  background-color: #f5f5f4;
  z-index: 1;
  position: relative;
  ${COLUMN_CENTER}
`;

const Title = styled.h2`
  font-size: 72px;
  color: #0d0d0d;
  margin: 0;
  padding: 0 20px;
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 880px) {
    font-size: 42px;
  }
`;
const SecondTitle = styled.h2`
  padding: 0 20px;
  font-size: 72px;
  color: #0d0d0d;
  font-weight: 100;
  font-family: "Gideon Roman", serif;
  margin: 0;
  text-align: center;
  @media screen and (max-width: 880px) {
    font-size: 42px;
  }
`;
const Description = styled.p`
  font-size: 24px;
  line-height: 1.5;
  color: #0d0d0d;
  font-weight: 300;
  padding: 0 20px;
  max-width: 800px;
  text-align: center;
  @media screen and (max-width: 880px) {
    font-size: 18px;
  }
`;
