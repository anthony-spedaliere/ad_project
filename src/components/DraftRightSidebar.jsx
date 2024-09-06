import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
// import { FaRegStar } from "react-icons/fa6";

const StyledSidebar = styled.aside`
  grid-area: right;
  grid-row: 1 / 3;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: var(--background-color-light);
  border-left: 1px solid var(--background-color);

  overflow: auto;
  max-height: 100vh;

  /* Custom scrollbar styles for WebKit browsers (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-color-light);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--background-color-dark);
    border-radius: 10px;
    border: 3px solid var(--background-color-light);
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--background-color-dark) var(--background-color-light);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  overflow: auto;
`;

const Header = styled.div`
  background-color: var(--background-color);
  width: 100%;
  padding: 1rem;
  text-align: left;
  font-size: 2.5rem;
  font-weight: 700;
  overflow: auto;
`;

const Body = styled.div`
  flex: 1;
  background-color: var(--background-color-light);
  padding: 1rem;
  overflow: auto;
`;

function DraftRightSidebar() {
  return (
    <StyledSidebar>
      <Section>
        <Header>
          <FaStar />
          My Queue
        </Header>
        <Body>
          <h1>Body 1</h1>
        </Body>
      </Section>
      <Section>
        <Header>My Picks</Header>
        <Body>
          <h1>Body 2</h1>
        </Body>
      </Section>
      <Section>
        <Header>Updates</Header>
        <Body>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
          <h1>Body 3</h1>
        </Body>
      </Section>
    </StyledSidebar>
  );
}

export default DraftRightSidebar;
