import { Button } from "app/components/buttons";
import history from "app/router/history";
import { AppPages, Status } from "app/types";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import he from "he";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, useTable } from "react-table";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import styled, { css } from "styled-components";
import {
  ROW_JUSTIFY_END__ALIGN_CENTER,
  UNSELECTABLE,
} from "styles/globalStyles";
import RowMouseHover from "./components/rowHover";
import { inboxSaga } from "./saga";
import { Inboxselectors } from "./selectors";
import { InboxActions, InboxReducer, sliceKey } from "./slice";
import { Email, customDateFormat } from "./types";

interface Props {}
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.7, x: 0.6 },
  });
};
export function Inbox(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: InboxReducer });
  useInjectSaga({ key: sliceKey, saga: inboxSaga });

  const dispatch = useDispatch();
  const emails = useSelector(Inboxselectors.emails);
  const emailsStatus = useSelector(Inboxselectors.emailsStatus);
  const emailsSummariesStatus = useSelector(
    Inboxselectors.emailsSummariesStatus
  );
  const emailsSummaries = useSelector(Inboxselectors.emailsSummaries);
  const lastPageTokens = useSelector(Inboxselectors.lastPageTokens);
  const isShowAiAnimation = useSelector(Inboxselectors.showAiAnimation);

  useEffect(() => {
    if (emailsStatus !== Status.SUCCESS) {
      dispatch(InboxActions.getEmails());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isShowAiAnimation) {
      triggerConfetti();
      setTimeout(() => {
        dispatch(InboxActions.setShowAiAnimation(false));
      }, 500);
    }
  }, [isShowAiAnimation]);

  const columns: Column<Email>[] = useMemo(
    () => [
      {
        Header: "Sender",
        accessor: "sender",
        Cell: ({ value }) => <StyledTdSender>{value}</StyledTdSender>,
      },
      {
        Header: "Subject-Snippet",
        accessor: (row) => `${row.subject} ${row.snippet}`,
        Cell: ({ row }: any) => (
          <StyledTdSubjectSnippet>
            <div className="subject">{he.decode(row.original.subject)}</div>
            <div>{`-`}</div>
            <div className="snippet">{he.decode(row.original.snippet)}</div>
          </StyledTdSubjectSnippet>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => (
          <StyledTdDate>{value ? customDateFormat(value) : ""}</StyledTdDate>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => emails || [], [emails]);

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <TableContainer
        initial={{ opacity: 0, y: 0, rotate: 0 }} // Initial rotation
        animate={{
          opacity: 1,
          y: 0,
          scale: isShowAiAnimation ? 1.1 : 1,
          // rotate: isShowAiAnimation ? [0, 10, -10, 10, -10, 0] : 0, // Rotate effect
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            // rotate: { duration: 0.5 }, // Adjust duration and ease for rotate effect
          },
        }}
        exit={{ opacity: 0, y: 20, rotate: 0 }} // Exit rotation
      >
        {emailsStatus === Status.INITIAL ? (
          <></>
        ) : (
          <FixedTableHeader>
            <Button
              loading={emailsSummariesStatus === Status.LOADING}
              rightIcon={
                emailsSummariesStatus === Status.SUCCESS ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )
              }
              onClick={() => {
                dispatch(InboxActions.fetchEmailSummaries());
              }}
            >
              Summarize with AI
            </Button>
            <NextPrevButton
              disabled={lastPageTokens.length === 0 ? "true" : "false"}
              onClick={() => dispatch(InboxActions.previousEmailPage())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </NextPrevButton>
            <NextPrevButton
              onClick={() => dispatch(InboxActions.nextEmailPage())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </NextPrevButton>
          </FixedTableHeader>
        )}
        <StyledTable
          style={{
            opacity: emailsStatus === Status.LOADING ? "0.4" : "1",
            pointerEvents: emailsStatus === Status.LOADING ? "none" : "all",
          }}
          {...getTableProps()}
        >
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const isUnread = row.original.labels.includes("UNREAD");
              return (
                <StyledTr
                  isUnread={isUnread}
                  onClick={() => {
                    history.push(AppPages.EmailDetail + `/${row.original.id}`);
                  }}
                  {...row.getRowProps()}
                >
                  <StyledTdHover />
                  {row.cells.map((cell) => cell.render("Cell"))}
                  <StyledTdHover>
                    {emailsSummariesStatus === Status.SUCCESS ? (
                      <RowMouseHover className={row.id}>
                        {
                          emailsSummaries.find((emailSummary) => {
                            return emailSummary.id === row.original.id;
                          })?.summary
                        }
                      </RowMouseHover>
                    ) : (
                      <></>
                    )}
                  </StyledTdHover>
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      </TableContainer>
    </>
  );
}

// Styled component for the grid container
const TableContainer = styled(motion.div)`
  height: 100%;
  padding: 16px;
  padding-top: 40px;
  padding-bottom: 50px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto; /* Allow horizontal scrolling if content overflows */
`;

const NextPrevButton = styled.div<{ disabled?: "true" | "false" }>`
  ${UNSELECTABLE}
  ${({ disabled }) =>
    disabled === "true" &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
  width: 20px;
  padding: 5px;
  box-sizing: initial;
  cursor: pointer;
  height: 20px;
`;

const FixedTableHeader = styled.th`
  ${ROW_JUSTIFY_END__ALIGN_CENTER}
  position: sticky;
  background-color: var(--table-header);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  z-index: 1;
  top: -40px; /* Offset the parent's padding */
  left: 0;
  width: 100%;
  padding: 7px;
  padding-right: 50px;
`;

// Styled component for the table
const StyledTable = styled.table`
  border-collapse: collapse;
  transition: all 0.2s;
  width: 100%;
  table-layout: fixed; /* Ensure table does not overflow its container */

  td {
    cursor: pointer;
    padding: 1px;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Display ellipsis on overflow */
    padding: 12px 5px;
  }
  tr {
    transition: all 0.1s;
  }
  tr:hover {
    box-shadow: 0 4px 8px rgba(105, 105, 105, 0.566);
  }
`;

// Styled component for table row
const StyledTr = styled.tr<{ isUnread: boolean }>`
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  td,
  div {
    color: ${({ isUnread }) => (isUnread ? `white` : `grey`)};
  }
`;

// Define fixed width for specific cells
const StyledTdSender = styled.td`
  width: 230px;
  font-weight: bold;
  font-size: 14px;
`;

const StyledTdDate = styled.td`
  width: 100px;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
`;

const StyledTdHover = styled.td`
  width: 0px;
`;

// Styled component for the subject and snippet
const StyledTdSubjectSnippet = styled.td`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  gap: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .subject {
    font-weight: bold;
  }

  .snippet {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
