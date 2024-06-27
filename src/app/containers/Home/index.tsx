import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";

import MotionBox from "app/components/animated";
import { useTranslation } from "react-i18next";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import BackDrop from "./components/radiants";
import { homeSaga } from "./saga";
import { selectHome } from "./selectors";
import { homeReducer, sliceKey } from "./slice";
import {
  BackDropContainer,
  Box,
  BoxContainer,
  IconWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from "./styles";

interface Props {}

export function Home(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: homeReducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });
  const { t } = useTranslation();
  const home = useSelector(selectHome);
  const dispatch = useDispatch();

  return (
    <MotionBox>
      <Wrapper>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <TitleWrapper>
          <Title>Your statistics</Title>
          <IconWrapper data-tooltip-id="my-tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <ReactTooltip
              id="my-tooltip"
              place="top"
              content="An overview of your usage statistics within the app. Unread emails and today's events"
              style={{ maxWidth: "200px" }}
            />
          </IconWrapper>
        </TitleWrapper>
        <BoxContainer>
          <Box>
            <BackDropContainer>
              <BackDrop />
            </BackDropContainer>
          </Box>
          <Box>
            <BackDropContainer>
              <BackDrop />
            </BackDropContainer>
          </Box>
          <Box>
            <BackDropContainer>
              <BackDrop />
            </BackDropContainer>
          </Box>
          <Box>
            <BackDropContainer>
              <BackDrop />
            </BackDropContainer>
          </Box>
        </BoxContainer>
      </Wrapper>
    </MotionBox>
  );
}
