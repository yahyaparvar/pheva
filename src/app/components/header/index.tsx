import styled from "styled-components";
import {
  COLUMN_CENTER,
  ROW_ALIGN_CENTER__SPACE_B,
  ROW_CENTER,
} from "styles/globalStyles";
import { Button } from "../buttons/landing";

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <ItemContainer>
          <Logo
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Pheva
          </Logo>
          <Item target="_blank" href="https://github.com/yahyaparvar/pheva">
            Github
          </Item>
          <Item target="_blank" href="https://github.com/yahyaparvar">
            Blog
          </Item>
          <Item target="_blank" href="https://github.com/yahyaparvar">
            Docs
          </Item>
          <Item
            target="_blank"
            href="https://github.com/yahyaparvar?tab=repositories"
          >
            Other
          </Item>
        </ItemContainer>
        <LoginButtonContainer>
          <Item href="https://pheva.vercel.app">Login</Item>
          <Button
            onClick={(e) => {
              e.preventDefault();
              window.open("https://pheva.vercel.app", "_blank");
            }}
            variant="secondary"
            rightIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Sign Up Free
          </Button>
        </LoginButtonContainer>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  ${COLUMN_CENTER}
  cursor: pointer;
  position: relative;
  z-index: 1000;
  @media screen and (max-width: 600px) {
  }
`;

const Container = styled.nav`
  ${ROW_ALIGN_CENTER__SPACE_B}
  padding: 8px;
  box-shadow: 0 1px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(0.6rem);
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 0.6rem;
  position: fixed;
  top: 20px;
  @media screen and (max-width: 600px) {
    width: calc(100% - 48px);
  }
`;
const Item = styled.a`
  padding: 8px;
  color: #222;
  text-decoration: none;
  border-radius: 8px;
  font-family: "Public Sans", sans-serif;
  transition: 0.1s ease-in-out;
  &:hover {
    background-color: hsla(0, 0%, 0%, 0.06);
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const ItemContainer = styled.div`
  ${ROW_CENTER}
  margin-left:1rem;
`;
const LoginButtonContainer = styled.div`
  ${ROW_CENTER}
  margin-left:1.5rem;
  gap: 0.2rem;
`;
const Logo = styled.div`
  font-family: "Playwrite DE Grund", cursive;
  cursor: pointer;
  font-optical-sizing: auto;
  margin-top: -5px;
  margin-right: 16px;
  margin-left: 7px;
  font-weight: bolder;
  color: #222;
`;
