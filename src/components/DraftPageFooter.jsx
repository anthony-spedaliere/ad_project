import styled from "styled-components";

const StyledFooter = styled.footer`
  grid-area: footer;
  background-color: var(--background-color-dark);
  color: var(--brand-color);
  text-align: center;
  padding: 1rem 0;
  min-height: 5rem;
`;

function DraftPageFooter() {
  return (
    <StyledFooter>
      <p>Footer</p>
    </StyledFooter>
  );
}

export default DraftPageFooter;
