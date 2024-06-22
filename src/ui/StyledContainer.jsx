// CenteredContainer.js
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || "column"};
  row-gap: 2rem;
  align-items: ${(props) => props.$alignItems || "none"};
  justify-content: ${(props) => props.$justifyContent || "none"};
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  background-color: ${(props) => props.$bgColor || "var(--brand-color)"};
  border-radius: ${(props) => props.$borderRadius || "1rem"};
  padding: ${(props) => props.$customPadding || "1rem"};
  margin: ${(props) => props.$margin || "none"};
  color: ${(props) => props.$color || "inherit"};
`;

export default StyledContainer;
