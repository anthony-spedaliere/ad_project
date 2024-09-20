import { useSelector } from "react-redux";
import CustomCountdownBox from "./CustomCountdownBox";
import { useState } from "react";
import {
  StyledSidebar,
  FixedTopArea,
  Section,
  ScrollableContent,
  TimerSection,
  RoundAndPickContainer,
  RoundHeader,
  TeamList,
  TeamListItem,
} from "../styles/DraftLeftSidebarStyles";
import { useUpdateDraftTurn } from "../authentication/useUpdateDraftTurn";
import dayjs from "dayjs";
import { useUpdateStartClock } from "../authentication/useUpdateStartClock";

function DraftLeftSidebar() {
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);
  const currentTurn = useSelector((state) => state.liveDraft.currentTurn);
  const teamOwnersArray = useSelector((state) => state.liveDraft.teamTurnList);
  const { setDraftTurn, isPending, error } = useUpdateDraftTurn();

  // Initialize teamOwnersArray without including round numbers
  const numberOfMaps = liveDraftInfo?.draft?.number_of_maps || 0;
  const groups = liveDraftInfo?.draft?.groups || {};

  const { setStartClock } = useUpdateStartClock();

  const [currentTeamOwner, setCurrentTeamOwner] = useState(
    teamOwnersArray[0] || null
  );

  // Function to update the current team owner based on the turn number
  const handleTurnChange = (turn, dId) => {
    if (teamOwnersArray.length > 0) {
      setCurrentTeamOwner(teamOwnersArray[turn - 1]); // turn - 1 to match the 0-based index
      setDraftTurn({
        newTurn: turn,
        draftId: dId,
      });
    }
  };

  const renderRounds = () => {
    let rounds = [];
    let pickNumber = 1;
    let teamIndex = 0;

    for (let i = 0; i < numberOfMaps; i++) {
      const isAscending = i % 2 === 0;

      let teams = Object.values(groups)
        .flatMap((group) => Object.values(group.teams))
        .sort((a, b) =>
          isAscending
            ? a.draft_priority - b.draft_priority
            : b.draft_priority - a.draft_priority
        );

      rounds.push(
        <div key={`round-${i + 1}`}>
          <RoundHeader>--------Round {i + 1}--------</RoundHeader>
          <TeamList>
            {teams.map((team) => {
              const currentPick = pickNumber;
              pickNumber++;

              const isHighlighted = currentTurn === teamIndex + 1; // Check if this team is the current turn
              teamIndex++; // Increment team index

              return (
                <TeamListItem
                  key={team.team_id}
                  $isHighlighted={isHighlighted}
                  $fontColor={isHighlighted}
                >
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
            <CustomCountdownBox
              duration={11}
              onComplete={() => {
                const now = dayjs();
                setStartClock({
                  startTime: now,
                  draftId: liveDraftInfo?.draft?.draft_id,
                });

                handleTurnChange(
                  currentTurn + 1,
                  liveDraftInfo?.draft?.draft_id
                );
              }}
            />
            <RoundAndPickContainer>
              <div>Round 1</div>
              <div>Pick 4</div>
            </RoundAndPickContainer>
          </TimerSection>
          <Section size="4rem">User Status</Section>
          <Section size="7rem">Draft</Section>
        </FixedTopArea>
        <ScrollableContent>{renderRounds()}</ScrollableContent>
      </StyledSidebar>
    </>
  );
}

export default DraftLeftSidebar;
