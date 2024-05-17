import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, useTable } from "react-table";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import styled from "styled-components";
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

  useEffect(() => {
    dispatch(InboxActions.getEmails());
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
            <div className="subject">{row.original.subject}</div>
            <div> - </div>
            <div className="snippet">{row.original.snippet}</div>
          </StyledTdSubjectSnippet>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => (
          <StyledTdDate>{customDateFormat(value)}</StyledTdDate>
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
      <StyledTable {...getTableProps()}>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto; /* Allow horizontal scrolling if content overflows */
`;

// Styled component for the table
const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed; /* Ensure table does not overflow its container */

  th,
  td {
    cursor: pointer;

    padding: 1px;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Display ellipsis on overflow */
    padding: 12px 5px;
  }
  tr:hover {
    opacity: 0.7;
  }
`;

// Styled component for table row
const StyledTr = styled.tr<{ isUnread: boolean }>`
  opacity: ${({ isUnread }) => (isUnread ? 1 : 0.5)};
`;

// Define fixed width for specific cells
const StyledTdSender = styled.td`
  width: 250px;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .subject {
    font-weight: bold;
  }

  .snippet {
    font-style: italic;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
