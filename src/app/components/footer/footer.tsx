import styled from "styled-components";

const Footer = styled.div`
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  padding-top: 120px; /* 6rem * 20 */
  display: flex;
  position: relative;
  &.bg-black {
    grid-column-gap: 160px; /* 8rem * 20 */
    grid-row-gap: 160px; /* 8rem * 20 */
    padding-top: 200px; /* 10rem * 20 */
  }

  &.section-overflow {
    z-index: 50;
    margin-top: -60px; /* -3rem * 20 */
    padding-top: 280px; /* 14rem * 20 */
  }

  &.pt-0 {
    padding-top: 0;
  }

  &.pt-4 {
    padding-top: 80px; /* 4rem * 20 */
  }
`;

const FooterNavigation = styled.div`
  z-index: 50;
  grid-column-gap: 100px; /* 5rem * 20 */
  grid-row-gap: 60px; /* 3rem * 20 */
  color: rgba(255, 255, 255, 0.6);
  flex-wrap: wrap;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  align-content: center;
  justify-content: center;
  display: flex;
  position: relative;
`;

const FooterNavGroup = styled.ul`
  grid-column-gap: 8px; /* 0.4rem * 20 */
  grid-row-gap: 8px; /* 0.4rem * 20 */
  flex-direction: column;

  font-size: 16px; /* 0.8rem * 20 */
  font-weight: 400;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 880px) {
    align-items: center;
  }
`;

const FooterNavTitle = styled.li`
  color: #fff;
  font-weight: 600;
  margin-bottom: 16px; /* 8px * 2 */
`;

const FooterListLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  padding-top: 4px; /* 0.2em * 20 */
  padding-bottom: 4px; /* 0.2em * 20 */
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
  display: block;

  &:hover {
    color: #fff;
  }

  &.w--current {
    font-weight: bold;
  }
`;

const FooterComponent = () => {
  return (
    <Footer>
      <FooterNavigation>
        <FooterNavGroup role="list">
          <FooterNavTitle>Product</FooterNavTitle>
          <li>
            <FooterListLink href="https://pheva.vercel.app">
              Editor
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="https://pheva.vercel.app">
              Content AI
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="https://github.com/yahyaparvar/pheva">
              Documents
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="https://github.com/yahyaparvar?tab=repositories">
              Other
            </FooterListLink>
          </li>
        </FooterNavGroup>
        <FooterNavGroup role="list">
          <FooterNavTitle>Company</FooterNavTitle>
          <li>
            <FooterListLink href="https://github.com/yahyaparvar?tab=repositories">
              Blog
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="https://yaya-parvar.vercel.app">
              About
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="mailto:yahyaparvar1@gmail.com">
              Contact us
            </FooterListLink>
          </li>
        </FooterNavGroup>
        <FooterNavGroup role="list">
          <FooterNavTitle>Docs</FooterNavTitle>

          <li>
            <FooterListLink
              href="https://yaya-parvar.vercel.app"
              target="_blank"
            >
              Examples
            </FooterListLink>
          </li>
        </FooterNavGroup>
        <FooterNavGroup role="list">
          <FooterNavTitle>Resources</FooterNavTitle>
          <li>
            <FooterListLink href="https://github.com/yahyaparvar/pheva/commits/main/">
              Release notes
            </FooterListLink>
          </li>

          <li>
            <FooterListLink href="https://github.com/yahyaparvar/pheva-landing?tab=MIT-1-ov-file#readme" target="_blank">
              MIT license
            </FooterListLink>
          </li>
          <li>
            <FooterListLink
              href="https://pheva.vercel.app/privacy-policy"
              target="_blank"
            >
              Privacy Policy
            </FooterListLink>
          </li>
        </FooterNavGroup>
        <FooterNavGroup role="list">
          <FooterNavTitle>Connect</FooterNavTitle>
          <li>
            <FooterListLink
              href="https://www.youtube.com/channel/UCAH6rw_O6p2ery3WG-t7GEQ"
              target="_blank"
            >
              Youtube
            </FooterListLink>
          </li>
          <li>
            <FooterListLink
              href="https://github.com/yahyaparvar"
              target="_blank"
            >
              GitHub
            </FooterListLink>
          </li>
          <li>
            <FooterListLink href="" target="_blank">
              Discord
            </FooterListLink>
          </li>
          <li>
            <FooterListLink
              href="https://www.linkedin.com/in/yahya-parvar-22b6591ba/"
              target="_blank"
            >
              LinkedIn
            </FooterListLink>
          </li>
          <li>
            <FooterListLink
              href="https://twitter.com/yaya_parvar"
              target="_blank"
            >
              X
            </FooterListLink>
          </li>
        </FooterNavGroup>
      </FooterNavigation>
    </Footer>
  );
};

export default FooterComponent;
