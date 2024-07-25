import styled from "styled-components";

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
