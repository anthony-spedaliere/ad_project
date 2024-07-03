import styled from "styled-components";

export const DraftHistoryContentContainer = styled.div`
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  color: var(--brand-color);
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--brand-color);
  font-size: 3rem;
  vertical-align: top; /* Ensure header aligns with the content */
`;

export const TableRow = styled.tr`
  color: var(--brand-color);
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--brand-color);
  color: var(--brand-color);
  font-size: 2rem;
  vertical-align: top; /* Ensure cell content aligns with the header */
`;

export const ActionButton = styled.button`
  background: none;
  color: #3840f4;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 5px 0;

  &:hover {
    color: #2a30b8;
  }
`;

export const CenteredMessage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #c9c7f2;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
