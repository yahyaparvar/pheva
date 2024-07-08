/**
 *
 * Home
 *
 */

import { Helmet } from "react-helmet-async";

import { Footer } from "app/components/footer";
import { Header } from "app/components/header";
import styled from "styled-components";
import { MaxWidthContainer } from "styles/globalStyles";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { Options } from "./components/options";
import { MarqueeSection } from "./components/text";
import { Wrapper } from "./styles";

interface Props {}

export function Home(props: Props) {
  return (
    <>
      <Header />
      <Wrapper>
        <Helmet>
          <title>
            Pheva | AI-Powered Virtual Assistance for Effortless Email and
            Calendar Management
          </title>
          <meta
            name="description"
            content="Experience seamless email and calendar management with Pheva, the AI-powered virtual assistant. Summarize and respond to emails effortlessly and keep track of your events with ease."
          />
          <meta
            name="keywords"
            content="Pheva, yahya parvar, AI, virtual assistant, email management, calendar management, AI email assistant, virtual assistance app, email summarization, event tracking"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Yahya Parvar" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="canonical" href="https://yourwebsiteurl.com" />
          <meta
            property="og:title"
            content="Pheva | AI-Powered Virtual Assistance for Effortless Email and Calendar Management"
          />
          <meta
            property="og:description"
            content="Manage your emails and calendar with Pheva, the AI-powered virtual assistant. Summarize and respond to emails easily and stay organized with your events."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourwebsiteurl.com" />
          <meta
            property="og:image"
            content="https://yourwebsiteurl.com/path-to-image.jpg"
          />
          <meta property="og:site_name" content="Pheva" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:video"
            content="https://www.youtube.com/channel/UCAH6rw_O6p2ery3WG-t7GEQ"
          />
          <meta
            property="og:profile"
            content="https://www.linkedin.com/in/yahya-parvar-22b6591ba/"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Pheva | AI-Powered Virtual Assistance for Effortless Email and Calendar Management"
          />
          <meta
            name="twitter:description"
            content="Stay on top of your emails and events with Pheva, the AI-powered virtual assistant. Summarize and respond to emails with ease and manage your calendar efficiently."
          />
          <meta
            name="twitter:image"
            content="https://yourwebsiteurl.com/path-to-image.jpg"
          />
          <meta name="twitter:site" content="@yaya_parvar" />
          <meta name="twitter:creator" content="@yaya_parvar" />
        </Helmet>
        <Container>
          <Hero />
          <Options />
        </Container>
        <Features />
        <MarqueeSection></MarqueeSection>
      </Wrapper>
      <Footer />
    </>
  );
}
const Container = styled.div`
  ${MaxWidthContainer}
`;
