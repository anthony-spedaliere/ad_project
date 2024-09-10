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

const RoundHeader = styled.h2`
  margin-bottom: 0.5rem;
`;

const TeamList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const TeamListItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
`;

function DraftLeftSidebar() {
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);
  const draftStatus = useSelector((state) => state.liveDraft.draftStatus);

  const renderRounds = () => {
    const numberOfMaps = liveDraftInfo?.draft?.number_of_maps || 0;
    const groups = liveDraftInfo?.draft?.groups || {};

    let rounds = [];
    let pickNumber = 1; // Initialize pick number globally

    // Loop through the number of maps to create rounds
    for (let i = 0; i < numberOfMaps; i++) {
      const isAscending = i % 2 === 0; // Alternate between ascending and descending

      // Collect all teams and sort by draft_priority
      let teams = Object.values(groups)
        .flatMap((group) => Object.values(group.teams))
        .sort((a, b) =>
          isAscending
            ? a.draft_priority - b.draft_priority
            : b.draft_priority - a.draft_priority
        );

      // Push each round's header and teams into rounds array
      rounds.push(
        <div key={`round-${i + 1}`}>
          <RoundHeader>--------Round {i + 1}--------</RoundHeader>
          <TeamList>
            {teams.map((team) => {
              const currentPick = pickNumber; // Store current pick number
              pickNumber++; // Increment pick number

              return (
                <TeamListItem key={team.team_id}>
                  {currentPick} {team.team_name}
                </TeamListItem>
              );
            })}
          </TeamList>
        </div>
      );
    }

    return rounds;
  };

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
          <Section size="7rem">{draftStatus}</Section>
        </FixedTopArea>
        <ScrollableContent>{renderRounds()}</ScrollableContent>
      </StyledSidebar>
    </>
  );
}

export default DraftLeftSidebar;
