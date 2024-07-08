import Marquee from "react-fast-marquee";
import styled from "styled-components";
export const MarqueeSection = () => {
  return (
    <Wrapper>
      <Marquee direction="left" speed={50}>
        <Text>
          AI Summarizer
          <span> For </span>
        </Text>
      </Marquee>
      <Marquee direction="right" speed={50}>
        <Text>
          <span>Email Response</span>
          <>And</>
        </Text>
      </Marquee>
      <Marquee direction="left" speed={50}>
        <Text>
          Managing <span> Calendar </span>
          <>Events</>
        </Text>
      </Marquee>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #1a1919;
  border-radius: 60px;
  padding-top: 120px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-top: -120px;
  position: relative;
  z-index: 2;
`;
const Text = styled.div`
  font-size: 180px;
  font-weight: 600;
  color: #fff;
  span {
    font-weight: 600;
    margin: 0;
    color: rgba(255, 255, 255, 0);
    -webkit-text-stroke-width: 0.1rem;
    -webkit-text-stroke-color: #fff;
  }
`;
