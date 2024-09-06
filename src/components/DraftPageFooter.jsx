import styled from "styled-components";

const StyledFooter = styled.footer`
  grid-area: footer;
  background-color: var(--background-color-dark);
  color: var(--brand-color);
  display: flex;
  justify-content: flex-end;
  text-align: left;
  padding: 1rem 0;
  margin-right: 2rem;
  min-height: 5rem;
`;

const LeaveDraftButton = styled.button`
  color: ${(props) => props.$customColor || "var(--red-color)"};
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-bottom: ${(props) => props.$mgBottom || "0rem"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

function DraftPageFooter() {
  return (
    <StyledFooter>
      <LeaveDraftButton>Leave Draft</LeaveDraftButton>
    </StyledFooter>
  );
}

export default DraftPageFooter;
