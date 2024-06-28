import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";

import MotionBox from "app/components/animated";
import { useTranslation } from "react-i18next";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import DoughnutChart from "./components/chart";
import BackDrop from "./components/radiants";
import { homeSaga } from "./saga";
import { selectHome } from "./selectors";
import { homeReducer, sliceKey } from "./slice";
import {
  BackDropContainer,
  Box,
  BoxContainer,
  BoxIcon,
  BoxInfo,
  BoxInfoAndToolTip,
  BoxNumber,
  BoxQuestion,
  BoxToolTip,
  ChartAndTable,
  ChartBox,
  ChartDivider,
  ChartTableContainer,
  ChartTitle,
  Container,
  Count,
  IconWrapper,
  TableAndRows,
  TableRow,
  TableRowColorDiv,
  TableRowTitleWrapper,
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
        <Container>
          <BoxContainer>
            <Box>
              <BackDropContainer>
                <BackDrop />
              </BackDropContainer>
              <BoxIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </BoxIcon>
              <BoxNumber>{12}</BoxNumber>
              <BoxInfoAndToolTip>
                <BoxInfo>Unread Emails</BoxInfo>
                <BoxToolTip>
                  <BoxQuestion data-tooltip-id="email-tooltip">
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
                  </BoxQuestion>
                  <ReactTooltip
                    id="email-tooltip"
                    place="top"
                    content="An overview of your usage statistics within the app. Unread emails and today's events"
                    style={{ maxWidth: "200px" }}
                  />
                </BoxToolTip>
              </BoxInfoAndToolTip>
            </Box>
            <Box>
              <BackDropContainer>
                <BackDrop />
              </BackDropContainer>
              <BoxIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </BoxIcon>
              <BoxNumber>{12}</BoxNumber>
              <BoxInfoAndToolTip>
                <BoxInfo>Events</BoxInfo>
                <BoxToolTip>
                  <BoxQuestion data-tooltip-id="events-tooltip">
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
                  </BoxQuestion>
                  <ReactTooltip
                    id="events-tooltip"
                    place="top"
                    content="An overview of your usage statistics within the app. Unread emails and today's events"
                    style={{ maxWidth: "200px" }}
                  />
                </BoxToolTip>
              </BoxInfoAndToolTip>
            </Box>
            <Box>
              <BackDropContainer>
                <BackDrop />
              </BackDropContainer>
              <BoxIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </BoxIcon>
              <BoxNumber>{12}</BoxNumber>
              <BoxInfoAndToolTip>
                <BoxInfo>Monthly visit</BoxInfo>
                <BoxToolTip>
                  <BoxQuestion data-tooltip-id="visit-tooltip">
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
                  </BoxQuestion>
                  <ReactTooltip
                    id="visit-tooltip"
                    place="top"
                    content="An overview of your usage statistics within the app. Unread emails and today's events"
                    style={{ maxWidth: "200px" }}
                  />
                </BoxToolTip>
              </BoxInfoAndToolTip>
            </Box>
            <Box>
              <BackDropContainer>
                <BackDrop />
              </BackDropContainer>
              <BoxIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                </svg>
              </BoxIcon>
              <BoxNumber>ø</BoxNumber>
              <BoxInfoAndToolTip>
                <BoxInfo>Tasks to do</BoxInfo>
                <BoxToolTip>
                  <BoxQuestion data-tooltip-id="avg-tooltip">
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
                  </BoxQuestion>
                  <ReactTooltip
                    id="avg-tooltip"
                    place="top"
                    content="An overview of your usage statistics within the app. Unread emails and today's events"
                    style={{ maxWidth: "200px" }}
                  />
                </BoxToolTip>
              </BoxInfoAndToolTip>
            </Box>
          </BoxContainer>
          <ChartBox>
            <ChartTitle>Event Types</ChartTitle>
            <ChartDivider />
            <ChartAndTable>
              <TableAndRows>
                <ChartTableContainer>
                  <div>type</div>
                  <div>count</div>
                </ChartTableContainer>
                <TableRow>
                  <TableRowTitleWrapper>
                    <TableRowColorDiv background="#E17CFD"></TableRowColorDiv>
                    <div>Default</div>
                  </TableRowTitleWrapper>
                  <Count>4</Count>
                </TableRow>
                <TableRow>
                  <TableRowTitleWrapper>
                    <TableRowColorDiv background="#4CD7F6"></TableRowColorDiv>
                    <div>Out</div>
                  </TableRowTitleWrapper>
                  <Count>4</Count>
                </TableRow>
                <TableRow>
                  <TableRowTitleWrapper>
                    <TableRowColorDiv background="#FFABAB"></TableRowColorDiv>
                    <div>Focus</div>
                  </TableRowTitleWrapper>
                  <Count>4</Count>
                </TableRow>
                <TableRow>
                  <TableRowTitleWrapper>
                    <TableRowColorDiv background="#9B59B6"></TableRowColorDiv>
                    <div>Work</div>
                  </TableRowTitleWrapper>
                  <Count>4</Count>
                </TableRow>
              </TableAndRows>
              <DoughnutChart />
            </ChartAndTable>
          </ChartBox>
        </Container>
      </Wrapper>
    </MotionBox>
  );
}
