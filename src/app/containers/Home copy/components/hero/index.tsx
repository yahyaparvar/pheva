import { Button } from "app/components/buttons/landing";
import history from "app/router/history";
import { AppPages } from "app/types";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  COLUMN_ALIGN_START__JUSTIFY_START,
  COLUMN_CENTER,
  ROW_ALIGN_START__JUSTIFY_START,
  ROW_CENTER,
} from "styles/globalStyles";
import heroImage from "./heroImage.png";
export const Hero = () => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
    >
      <HeroImage src={heroImage}></HeroImage>
      <Container>
        <TagText>Powered by OpenAI</TagText>
        <Title>AI Assistance</Title>
        <SecondTitle>Free forever</SecondTitle>
        <Description>
          Reply emails, summarize them and write answers all with the power of
          Chat-GPT's 3.5 turbo version. Pheva is open source and is designed to
          be FREE forever.
        </Description>
        <ButtonRow>
          <Button
            onClick={(e) => {
              e.preventDefault();
              history.push(AppPages.RootPage);
            }}
            size="large"
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
            Get started free
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              window.open("https://github.com/yahyaparvar/pheva", "_blank");
            }}
            size="large"
            variant="outline"
          >
            Github
          </Button>
        </ButtonRow>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled(motion.div)`
  ${ROW_CENTER}
  min-height: 500px;
  width: 100%;
  padding-top: 220px;
  @media screen and (max-width: 1024px) {
    padding-top: 180px;
    gap: 50px;
    ${COLUMN_CENTER}
    * {
      text-align: center;
    }
  }
  @media screen and (max-width: 560px) {
    padding: 100px 24px;
  }
`;
const HeroImage = styled.img`
  width: 400px;
  @media screen and (max-width: 560px) {
    width: 100%;
  }
`;
const Container = styled.div`
  max-width: 680px;
  margin-left: 116px;
  ${COLUMN_ALIGN_START__JUSTIFY_START}
  @media screen and (max-width: 1200px) {
    margin: 0;
    ${COLUMN_CENTER}
  }
`;
const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  color: #fff;
  font-size: 96px;
  margin-bottom: 24px;
  @media screen and (max-width: 1024px) {
    text-align: center;
  }
  @media screen and (max-width: 560px) {
    margin-bottom: 44px;
    font-size: 52px;
  }
`;
const SecondTitle = styled.div`
  font-size: 96px;
  margin-top: -40px;
  font-weight: 100;
  font-family: "Gideon Roman", serif;
  @media screen and (max-width: 560px) {
    font-size: 52px;
  }
`;
const Description = styled.p`
  color: #fff;
  line-height: 35px;
  font-size: 26px;
  @media screen and (max-width: 560px) {
    font-size: 20px;
  }
`;
const ButtonRow = styled.div`
  margin-top: 24px;
  ${ROW_ALIGN_START__JUSTIFY_START}
  gap:0.6rem;
  @media screen and (max-width: 560px) {
    ${COLUMN_CENTER}
    button {
      width: 100%;
    }
  }
`;
const TagText = styled.div`
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(135deg, #0df28f, #2bf3d7 40%, #333bff);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.1;
`;
