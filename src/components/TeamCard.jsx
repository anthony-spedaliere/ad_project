import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUpdateHasJoined } from "../authentication/useUpdateHasJoined";
import { useDispatch } from "react-redux";
import {
  setCurrentTurn,
  setPickStartTime,
  setSelectedByListUpdate,
  setUsersPicks,
} from "../store/slices/liveDraftSlice";
import { fetchLatestDraftTurnAndStartTime } from "../services/apiDrafts";
import { useCallback } from "react";

const Card = styled.div`
  height: 15rem;
  width: 15rem;
  background-color: var(--brand-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  text-align: center;
`;

const DraftPriority = styled.div`
  color: var(--background-color);
  font-size: 1.5rem;
  font-weight: bold;
`;

const TeamName = styled.div`
  font-size: 2rem;
  color: var(--background-color);
`;

export const JoinButton = styled.button`
  color: var(--background-color);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--blue-color);
  }
`;

function TeamCard({
  draftPriority,
  teamName,
  participant,
  teamOwner,
  selectedByListUpdate,
  myPicksListUpdate,
  draftId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setHasJoined, isPending } = useUpdateHasJoined();

  const handleJoinDraft = useCallback(async () => {
    // Fetch the latest turn and start time
    const latestData = await fetchLatestDraftTurnAndStartTime(draftId);

    if (latestData) {
      dispatch(setCurrentTurn(latestData.turn));
      dispatch(setPickStartTime(latestData.start_clock));
    }

    if (selectedByListUpdate) {
      dispatch(setSelectedByListUpdate(selectedByListUpdate));
    }
    if (myPicksListUpdate) {
      dispatch(setUsersPicks(myPicksListUpdate));
    }

    setHasJoined({ hasJoined: true, teamOwner: participant });
    navigate("/draft/poi-pool");
  }, [
    draftId,
    selectedByListUpdate,
    myPicksListUpdate,
    setHasJoined,
    participant,
    navigate,
    dispatch,
  ]);

  // function handleJoinDraft() {
  //   if (selectedByListUpdate) {
  //     dispatch(setSelectedByListUpdate(selectedByListUpdate));
  //   }
  //   if (myPicksListUpdate) {
  //     dispatch(setUsersPicks(myPicksListUpdate));
  //   }
  //   if (latestDraftTurnAndStartTime) {
  //     dispatch(setCurrentTurn(latestDraftTurnAndStartTime.turn));
  //     dispatch(setPickStartTime(latestDraftTurnAndStartTime.start_clock));
  //   }
  //   setHasJoined({ hasJoined: true, teamOwner: participant });
  //   navigate("/draft/poi-pool");
  // }

  return (
    <Card>
      <DraftPriority>Spot {draftPriority}</DraftPriority>
      <TeamName>{teamName}</TeamName>
      {teamOwner === participant ? (
        <JoinButton onClick={handleJoinDraft} disabled={isPending}>
          Join Draft
        </JoinButton>
      ) : (
        <p></p>
      )}
    </Card>
  );
}

export default TeamCard;
