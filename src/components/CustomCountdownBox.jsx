import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SpinnerMini from "../ui/SpinnerMini";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateRoundDrafted } from "../authentication/useUpdateRoundDrafted";
import { useUpdateDraftedBy } from "../authentication/useUpdateDraftedBy";
import { useUpdateNumberPicked } from "../authentication/useUpdateNumberPicked";
import { setUsersPicks } from "../store/slices/liveDraftSlice";

const Countdown = styled.div`
  font-size: 5rem;
`;

function CustomCountdownBox({
  duration,
  onComplete,
  currRound,
  userId,
  currTurn,
  activeUser,
}) {
  const [remainingTime, setRemainingTime] = useState(null);
  const pickStartTime = useSelector((state) => state.liveDraft.pickStartTime);
  const participant = useSelector((state) => state.liveDraft.participant);
  const admin = useSelector((state) => state.liveDraft.admin);
  const dispatch = useDispatch();

  const selectedFavorites = useSelector(
    (state) => state.liveDraft.selectedFavorites
  );
  const usersPicks = useSelector((state) => state.liveDraft.usersPicks);

  const { setRoundDrafted } = useUpdateRoundDrafted();
  const { setDraftedBy } = useUpdateDraftedBy();
  const { setNumberPicked } = useUpdateNumberPicked();

  const updateRemainingTime = useCallback(
    (startTime) => {
      const now = dayjs();
      const endTime = startTime.add(duration, "second");
      const timeDiff = endTime.diff(now, "second");

      if (timeDiff > 0) {
        setRemainingTime(timeDiff);
      } else {
        setRemainingTime(0);
      }
    },
    [duration]
  );

  const handleAutoPick = useCallback(() => {
    if (selectedFavorites.length > 0) {
      const firstPoi = selectedFavorites[0];

      // Delay the dispatch to the next event loop cycle
      setTimeout(() => {
        const updatedDraftedPois = [...usersPicks, firstPoi.poi_name];
        dispatch(setUsersPicks(updatedDraftedPois));

        setRoundDrafted({ poiId: firstPoi.poi_id, roundDrafted: currRound });
        setDraftedBy({ poiId: firstPoi.poi_id, userUuid: userId });
        setNumberPicked({ poiId: firstPoi.poi_id, numberPicked: currTurn });
      }, 0); // This ensures that the dispatch happens after the component renders
    }
  }, [
    currRound,
    currTurn,
    dispatch,
    selectedFavorites,
    setDraftedBy,
    setNumberPicked,
    setRoundDrafted,
    userId,
    usersPicks,
  ]);

  useEffect(() => {
    if (pickStartTime) {
      const startTime = dayjs(pickStartTime);
      updateRemainingTime(startTime);
    }
  }, [pickStartTime, updateRemainingTime]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev - 1 <= 0) {
            clearInterval(interval);
            if (userId && activeUser === participant && admin !== participant) {
              handleAutoPick();
            }
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    remainingTime,
    onComplete,
    userId,
    handleAutoPick,
    activeUser,
    participant,
    admin,
  ]);

  if (remainingTime === null) {
    return (
      <Countdown>
        <SpinnerMini />
      </Countdown>
    );
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Format seconds to always have two digits
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <Countdown>
      {minutes}:{formattedSeconds}
    </Countdown>
  );
}

export default CustomCountdownBox;
