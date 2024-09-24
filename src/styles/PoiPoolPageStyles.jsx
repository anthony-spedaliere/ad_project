import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--brand-color);
  border-radius: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: var(--background-color-light);
`;

export const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid var(--background-color-light);
  text-align: left;
`;

export const HeaderRow = styled.tr`
  background-color: var(--background-color);
`;

export const TableBody = styled.tbody`
  background-color: var(--brand-color);
`;

export const DataRow = styled.tr`
  color: ${({ $isSelected, $isPicked }) =>
    $isSelected
      ? "var(--brand-color)"
      : $isPicked
      ? "var(--background-color)"
      : "var(--background-color)"};
  background-color: ${({ $isSelected, $isPicked }) =>
    $isSelected
      ? "var(--background-color-light)"
      : $isPicked
      ? "var(--brand-color-light)"
      : "transparent"};
`;

export const DataCell = styled.td`
  padding: 10px;
  border: 1px solid var(--background-color-dark);
  text-align: left;
`;
