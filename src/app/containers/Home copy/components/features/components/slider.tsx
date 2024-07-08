import styled from "styled-components";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { UNSELECTABLE } from "styles/globalStyles";
import { FreeMode } from "swiper/modules";
import aiContent from "./ai-content.svg";
import calendar from "./calendar.svg";
import comment from "./comment.svg";
import niceUi from "./nice-ui.svg";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 4rem;
`;

const StyledSwiper = styled(Swiper)`
  padding: 40px;
  @media screen and (max-width: 450px) {
    padding: 20px;
  }
`;

const Slide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background: #fff;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  padding: 2rem 2rem 1.5rem;
  text-decoration: none;
  border-radius: 2rem;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.04),
    0 1px 4px rgba(0, 0, 0, 0.03),
    0 1px 2px rgba(0, 0, 0, 0.02);
  transition:
    0.3s cubic-bezier(0.65, 0, 0.35, 1),
    box-shadow 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  width: 370px;
  height: 450px;
  &:hover {
    border-radius: 3rem;
    scale: 1.1;
  }

  &:first-of-type {
    margin-left: 150px;
  }
  @media screen and (max-width: 1024px) {
    &:first-of-type {
      margin-left: 0px;
    }
  }
  @media screen and (max-width: 450px) {
    width: 270px;
  }
`;

const SlideIcon = styled.img``;

const SlideTitle = styled.h3`
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: #0d0d0d;
  margin-top: 24px;
`;

const SlideDesc = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  opacity: 0.8;
  line-height: 1.3;
  color: #0d0d0d;
  flex-grow: 1; /* This will take up remaining space */
`;

const SlideButton = styled.div`
  ${UNSELECTABLE}
  color: #0d0d0d;
  font-weight: 600;
  margin-top: auto; /* This pushes the button to the bottom */
`;

export default function App() {
  return (
    <Container>
      <StyledSwiper
        slidesPerView={"auto"} // Change to auto for static width
        spaceBetween={30}
        freeMode={true}
        pagination={{}}
        modules={[FreeMode]}
        className="mySwiper"
      >
        <Slide>
          <SlideIcon src={niceUi} />
          <SlideTitle>Nice UI</SlideTitle>
          <SlideDesc>
            An Incredible User Interface that makes you be able to sped hours
            and even days on Pheva. Check it out now!
          </SlideDesc>
          <SlideButton>Learn more!</SlideButton>
        </Slide>
        <Slide>
          <SlideIcon src={aiContent} />
          <SlideTitle>AI Actions</SlideTitle>
          <SlideDesc>
            A free tool with the help of AI with can automate your tasks and
            make your life easier. Did I mention the AI answer and summary of
            emails? well yeah a million times haha.
          </SlideDesc>
          <SlideButton>Learn more!</SlideButton>
        </Slide>
        <Slide>
          <SlideIcon src={calendar} />
          <SlideTitle>Calendar</SlideTitle>
          <SlideDesc>
            Edit your calendar with ease. Add, edit, and delete events. Export
            your calendar to Google Calendar. Maybe even import other calendars
          </SlideDesc>
          <SlideButton>Learn more!</SlideButton>
        </Slide>
        <Slide>
          <SlideIcon src={comment} />
          <SlideTitle>Emails</SlideTitle>
          <SlideDesc>
            Well well well. I have no idea what to write here.
            <br />
          </SlideDesc>
          <SlideButton>Learn more!</SlideButton>
        </Slide>
      </StyledSwiper>
    </Container>
  );
}
