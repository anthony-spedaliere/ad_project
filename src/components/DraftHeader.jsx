import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--background-color-dark);
  color: var(--text-color-light);
  padding: 2rem;
  text-align: center;
  z-index: 1;
  grid-area: header;
  min-height: 18rem;
`;

function DraftHeader() {
  return (
    <StyledHeader>
      <h1>Draft Header</h1>
    </StyledHeader>
  );
}

export default DraftHeader;
