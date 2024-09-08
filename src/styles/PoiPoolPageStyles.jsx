import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: var(--table-header-bg);
`;

export const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid var(--background-color);
  text-align: left;
`;

export const HeaderRow = styled.tr`
  background-color: var(--background-color-light);
`;

export const TableBody = styled.tbody`
  background-color: var(--table-body-bg);
`;

export const DataRow = styled.tr``;

export const DataCell = styled.td`
  padding: 10px;
  border: 1px solid var(--background-color-light);
  text-align: left;
`;
