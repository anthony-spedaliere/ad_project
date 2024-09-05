import styled from "styled-components";

const StyledHeader = styled.header`
  grid-column: 2 / 3; /* Span only the middle section (between the sidebars) */
  background-color: var(--background-color-dark);
  color: var(--text-color-light);
  padding: 2rem;
  text-align: center;
  z-index: 1;
`;

function DraftHeader() {
  return (
    <StyledHeader>
      <h1>Draft Header</h1>
    </StyledHeader>
  );
}

export default DraftHeader;
