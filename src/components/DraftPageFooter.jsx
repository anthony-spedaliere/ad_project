import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color-dark);
  color: var(--brand-color);
  text-align: center;
  padding: 1rem 0;
  z-index: 1000;
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
