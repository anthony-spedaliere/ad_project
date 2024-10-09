import { useDispatch, useSelector } from "react-redux";
import CustomCountdownBox from "./CustomCountdownBox";
import { useEffect, useState } from "react";
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
import StyledHeader from "../ui/StyledHeader";
import { setActiveUser } from "../store/slices/liveDraftSlice";
import { useUpdateIsDraftComplete } from "../authentication/useUpdateIsDraftComplete";
import { useNavigate } from "react-router-dom";

function DraftLeftSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [draftComplete, setDraftComplete] = useState(false);

  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);
  const currentTurn = useSelector((state) => state.liveDraft.currentTurn);
  const teamOwnersArray = useSelector((state) => state.liveDraft.teamTurnList);
  const participant = useSelector((state) => state.liveDraft.participant);
  const activeUser = useSelector((state) => state.liveDraft.activeUser);
  const teamIds = useSelector((state) => state.liveDraft.teamIdList);
  const admin = useSelector((state) => state.liveDraft.admin);
  const { setDraftTurn } = useUpdateDraftTurn();

  // Initialize teamOwnersArray without including round numbers
  const numberOfMaps = liveDraftInfo?.draft?.number_of_maps || 0;
  const groups = liveDraftInfo?.draft?.groups || {};

  const { setStartClock } = useUpdateStartClock();
  const { setIsDraftComplete } = useUpdateIsDraftComplete();

  const [currentTeamOwner, setCurrentTeamOwner] = useState(
    teamOwnersArray[0] || null
  );

  // Function to update the current team owner based on the turn number
  const handleTurnChange = (turn, dId) => {
    if (teamOwnersArray.length > 0) {
      setCurrentTeamOwner(teamOwnersArray[turn - 1]);

      setDraftTurn({
        newTurn: turn,
        draftId: dId,
      });
    }
  };

  useEffect(() => {
    dispatch(setActiveUser(teamOwnersArray[currentTurn - 1]));
  }, [currentTurn, dispatch, teamOwnersArray]);

  useEffect(() => {
    if (draftComplete) {
      navigate("/dashboard/my-drafts", { replace: true });
    }
  }, [draftComplete, navigate]);

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

  const totalPicks = teamOwnersArray.length;

  // Calculate picks per round
  const picksPerRound = totalPicks / numberOfMaps;

  // Calculate round based on the currentTurn and picksPerRound
  const currentRound =
    currentTurn > 0 ? Math.floor((currentTurn - 1) / picksPerRound) + 1 : 1; // Default to 1 if turn is 0

  return (
    <>
      <StyledSidebar>
        <FixedTopArea>
          <TimerSection>
            {currentTurn === 0 ? (
              <CustomCountdownBox
                duration={21}
                onComplete={() => {
                  const now = dayjs();
                  setStartClock({
                    startTime: now,
                    draftId: liveDraftInfo?.draft?.draft_id,
                  });

                  // Delay the state update to prevent the warning
                  setTimeout(() => {
                    handleTurnChange(
                      currentTurn + 1,
                      liveDraftInfo?.draft?.draft_id
                    );
                  }, 0); // Delay by 0ms to ensure it's in the next event loop
                }}
              />
            ) : currentTurn > 0 && currentTurn <= teamOwnersArray.length ? (
              <CustomCountdownBox
                duration={11}
                currRound={currentRound}
                userId={teamIds[currentTurn - 1]}
                currTurn={currentTurn}
                activeUser={activeUser}
                onComplete={() => {
                  const now = dayjs();
                  setStartClock({
                    startTime: now,
                    draftId: liveDraftInfo?.draft?.draft_id,
                  });

                  // Delay the state update to prevent the warning
                  setTimeout(() => {
                    handleTurnChange(
                      currentTurn + 1,
                      liveDraftInfo?.draft?.draft_id
                    );
                  }, 0); // Delay by 0ms to ensure it's in the next event loop
                }}
              />
            ) : currentTurn === teamOwnersArray.length + 1 ? (
              <CustomCountdownBox
                duration={21}
                onComplete={() => {
                  const now = dayjs();
                  setStartClock({
                    startTime: now,
                    draftId: liveDraftInfo?.draft?.draft_id,
                  });

                  // Delay the state update to prevent the warning
                  setTimeout(() => {
                    handleTurnChange(
                      currentTurn + 1,
                      liveDraftInfo?.draft?.draft_id
                    );
                    setDraftComplete(true);
                    setIsDraftComplete({
                      isDraftComplete: true,
                      draftId: liveDraftInfo?.draft?.draft_id,
                    });
                  }, 0); // Delay by 0ms to ensure it's in the next event loop
                }}
              />
            ) : (
              <StyledHeader $fontSize="5rem">0:00</StyledHeader>
            )}
            <RoundAndPickContainer>
              <div>
                Round{" "}
                {currentRound <= numberOfMaps ? currentRound : numberOfMaps}
              </div>
              <div>
                Pick{" "}
                {currentTurn <= teamOwnersArray.length
                  ? currentTurn
                  : teamOwnersArray.length}
              </div>
            </RoundAndPickContainer>
          </TimerSection>
          <Section size="4rem">
            {currentTurn === 0
              ? "-"
              : admin === participant
              ? "Draft Admin." // Admin should only see "-"
              : currentTurn > teamOwnersArray.length
              ? "Draft Finished!"
              : teamOwnersArray[currentTurn - 1] === participant
              ? "It's your turn to draft!"
              : (() => {
                  // Get all indices where the participant is in teamOwnersArray
                  const participantPicks = teamOwnersArray.reduce(
                    (acc, owner, index) => {
                      if (owner === participant) acc.push(index + 1); // Store 1-based pick numbers
                      return acc;
                    },
                    []
                  );

                  // Find the next pick the participant has
                  const nextPick = participantPicks.find(
                    (pick) => pick > currentTurn
                  );

                  // If the participant has no more picks (i.e. they have picked all their turns)
                  const isLastPickDone =
                    participantPicks.length > 0 &&
                    participantPicks[participantPicks.length - 1] <=
                      currentTurn;

                  // Calculate total picks left in the draft
                  const picksLeftInDraft =
                    teamOwnersArray.length - currentTurn + 1;

                  if (!nextPick && !isLastPickDone) {
                    return "Draft Finished!";
                  } else if (
                    isLastPickDone &&
                    currentTurn <= teamOwnersArray.length &&
                    picksLeftInDraft > 1
                  ) {
                    // Participant has finished their last pick but the draft is still ongoing
                    return `${picksLeftInDraft} picks left in the draft`;
                  } else if (
                    isLastPickDone &&
                    currentTurn <= teamOwnersArray.length &&
                    picksLeftInDraft === 1
                  ) {
                    return "Last pick!";
                  } else if (nextPick === currentTurn + 1) {
                    return "Your turn is next!";
                  } else {
                    const picksLeftUntilTurn = nextPick - currentTurn;
                    return `${picksLeftUntilTurn} picks until your turn`;
                  }
                })()}
          </Section>

          <Section size="7rem">
            {currentTurn === 0
              ? "Draft Starting Soon!"
              : currentTurn > 0 && currentTurn <= teamOwnersArray.length
              ? "Draft in Progress!"
              : "Review Draft Results!"}
          </Section>
        </FixedTopArea>
        <ScrollableContent>{renderRounds()}</ScrollableContent>
      </StyledSidebar>
    </>
  );
}

export default DraftLeftSidebar;
