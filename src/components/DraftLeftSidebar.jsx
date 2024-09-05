import styled from "styled-components";

const StyledSidebar = styled.aside`
  grid-area: left;
  background-color: var(--background-color-light);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--background-color);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: flex-start;
`;

function DraftLeftSidebar() {
  return (
    <StyledSidebar>
      <h1>Left Sidebar</h1>
    </StyledSidebar>
  );
}

export default DraftLeftSidebar;
