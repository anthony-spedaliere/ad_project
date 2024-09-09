import { useSelector } from "react-redux";
import styled from "styled-components";
import CountdownBox from "./CountdownBox";

const StyledSidebar = styled.aside`
  grid-area: left;
  background-color: var(--background-color-light);
  border-right: 1px solid var(--background-color);
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const FixedTopArea = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--background-color);
  min-height: 18rem;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: ${(props) => props.size || "1fr"};

  &:first-child,
  &:last-child {
    background-color: var(--background-color);
    color: var(--brand-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  &:nth-child(2) {
    background-color: var(--brand-color);
    color: var(--background-color-dark);
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  width: 100%;
  padding-left: 1rem;
`;

const TimerSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;
  font-size: 3rem;
  font-weight: bold;
  margin: 0rem 1rem;
  color: var(--brand-color);
`;

const RoundAndPickContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`;

function DraftLeftSidebar() {
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraft);

  return (
    <>
      <StyledSidebar>
        <FixedTopArea>
          <TimerSection>
            <CountdownBox
              draftId={liveDraftInfo?.draft?.draft_id}
              sidebar={true}
            />
            <RoundAndPickContainer>
              <div>Round 1</div>
              <div>Pick 4</div>
            </RoundAndPickContainer>
          </TimerSection>
          <Section size="4rem">User Status</Section>
          <Section size="7rem">Draft Starting Soon!</Section>
        </FixedTopArea>
        <ScrollableContent>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
          <h1>Left Sidebar</h1>
        </ScrollableContent>
      </StyledSidebar>
    </>
  );
}

export default DraftLeftSidebar;
