import styled from "styled-components";

const StyledHeader = styled.h1`
  color: ${(props) => props.$color || "inherit"};
  font-weight: ${(props) => props.$fontWeight || "700"};
  font-size: ${(props) => props.$fontSize || "inherit"};
  margin-bottom: ${(props) => props.$mgBottom || "0"};
  margin-top: ${(props) => props.$mgTop || "0"};
  text-decoration: ${(props) => props.$textDecoration || "none"};
`;

export default StyledHeader;
