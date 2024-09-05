import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
// import { FaRegStar } from "react-icons/fa6";

const StyledSidebar = styled.aside`
  grid-area: right;
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;

  background-color: var(--background-color-light);
  border-left: 1px solid var(--background-color);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

const Header = styled.div`
  background-color: var(--background-color);
  width: 100%;
  padding: 1rem;
  text-align: left;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Body = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: var(--background-color-light);
`;

function DraftRightSidebar() {
  return (
    <StyledSidebar>
      <Section>
        <Header>
          <FaStar />
          My Queue
        </Header>
        <Body>Body 1</Body>
      </Section>
      <Section>
        <Header>My Picks</Header>
        <Body>Body 2</Body>
      </Section>
      <Section>
        <Header>Updates</Header>
        <Body>Body 3</Body>
      </Section>
    </StyledSidebar>
  );
}

export default DraftRightSidebar;
