import { Status } from "app/types";
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
import { inboxSaga } from "./saga";
import { Inboxselectors } from "./selectors";
import { InboxActions, InboxReducer, sliceKey } from "./slice";
import { Email, customDateFormat } from "./types";
interface Props {}

export function Inbox(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: InboxReducer });
  useInjectSaga({ key: sliceKey, saga: inboxSaga });

  const dispatch = useDispatch();
  const emails = useSelector(Inboxselectors.emails);
  const emailsStatus = useSelector(Inboxselectors.emailsStatus);
  const lastPageTokens = useSelector(Inboxselectors.lastPageTokens);

  useEffect(() => {
    if (emailsStatus !== Status.SUCCESS) {
      dispatch(InboxActions.getEmails());
    }
  }, [dispatch]);

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
          <StyledTdDate>
            {customDateFormat(value || new Date().toString())}
          </StyledTdDate>
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
    <TableContainer>
      <FixedTableHeader>
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
        <NextPrevButton onClick={() => dispatch(InboxActions.nextEmailPage())}>
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
      <StyledTable
        style={{ opacity: emailsStatus === Status.LOADING ? "0.4" : "1" }}
        {...getTableProps()}
      >
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const isUnread = row.original.labels.includes("UNREAD");
            return (
              <StyledTr isUnread={isUnread} {...row.getRowProps()}>
                {row.cells.map((cell) => cell.render("Cell"))}
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

// Styled component for the grid container
const TableContainer = styled.div`
  height: 100%;
  padding: 16px;
  padding-top: 40px;
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
  width:20px;
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
  z-index: 10;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: scale(1.007);
  }
`;

// Styled component for table row
const StyledTr = styled.tr<{ isUnread: boolean }>`
  opacity: ${({ isUnread }) => (isUnread ? 1 : 0.5)};
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
