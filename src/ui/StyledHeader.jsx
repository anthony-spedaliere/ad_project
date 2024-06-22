import styled from "styled-components";

const StyledHeader = styled.h1`
  color: ${(props) => props.$color || "inherit"};
  font-weight: ${(props) => props.$fontWeight || "700"};
  font-size: ${(props) => props.$fontSize || "inherit"};
`;

export default StyledHeader;
