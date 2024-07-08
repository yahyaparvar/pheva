import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";

import history from "app/router/history";
import { Button } from "../buttons/landing";
import FooterComponent from "./footer";
import backDrop from "./gradient.jpg";
import { AppPages } from "app/types";
export const Footer = () => {
  return (
    <Wrapper>
      <Title>Over 2,000 Active Users</Title>
      <SecondTitle>In Pheva</SecondTitle>
      <ButtonWrapper>
        <Button
          size="large"
          onClick={(e) => {
            e.preventDefault();
            history.push(AppPages.RootPage);
          }}
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          }
          variant="primary"
        >
          Get started now - free
        </Button>
      </ButtonWrapper>
      <FooterComponent />
      <BackDrop src={backDrop} />
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  width: 100%;
  margin-top: 160px;
  ${COLUMN_CENTER}
  position:relative;
  @media screen and (max-width: 1025px) {
    margin-top: 24px;
  }
`;
const BackDrop = styled.img`
  position: absolute;
  top: -185px;
  width: 100%;
  max-width: 1600px;
  @media screen and (max-width: 1025px) {
    top: 0px;
  }
`;
const Title = styled.h2`
  margin: 0;
  font-size: 60px;
  z-index: 1;
  font-weight: 600;
  margin-top: 340px;
  text-align: center;
  @media screen and (max-width: 1025px) {
    margin-top: 104px;
  }
  @media screen and (max-width: 880px) {
    font-size: 42px;
    padding: 20px;
  }
`;
const SecondTitle = styled.h2`
  margin: 0;
  font-size: 60px;
  font-weight: 100;
  font-family: "Gideon Roman", serif;
  text-align: center;
  z-index: 1;
  @media screen and (max-width: 880px) {
    font-size: 42px;
    padding: 20px;
  }
`;
const ButtonWrapper = styled.div`
  z-index: 1;
  margin-top: 85px;
`;
