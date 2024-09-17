import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SpinnerMini from "../ui/SpinnerMini";
import { useGetStartClock } from "../authentication/useGetStartClock";
import { useSelector } from "react-redux";

const Countdown = styled.div`
  font-size: 5rem;
`;

function CustomCountdownBox({ draftId, duration, onComplete }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const { data, isPending } = useGetStartClock(draftId);
  const currentTurn = useSelector((state) => state.liveDraft.currentTurn);

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

  useEffect(() => {
    if (data && !isPending) {
      const startTime = dayjs(data.start_clock);
      updateRemainingTime(startTime);
    }
  }, [data, isPending, updateRemainingTime]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev - 1 <= 0) {
            clearInterval(interval);
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
  }, [remainingTime, onComplete]);

  if (isPending || remainingTime === null) {
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
