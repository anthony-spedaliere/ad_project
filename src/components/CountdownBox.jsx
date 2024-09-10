import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SpinnerMini from "../ui/SpinnerMini";
import { useGetStartClock } from "../authentication/useGetStartClock";
import { useDispatch } from "react-redux";
import { setDraftStatus } from "../store/slices/liveDraftSlice";

const CountdownBoxStyle = styled.div`
  background-color: var(--brand-color);
  min-height: 13rem;
  min-width: 16rem;
  padding: 0.5rem;
  color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-left: 2rem;
  border-radius: 1rem;
`;

const SidebarCountdownBoxStyle = styled.div`
  background-color: var(--background-color);
  padding: 0.5rem;
  color: var(--brand-color);
`;

const TimeRemaining = styled.div`
  font-size: 3rem;
`;

const Countdown = styled.div`
  font-size: 5rem;
`;

const DraftStartingHeader = styled.h2``;

const SidebarDraftStartingHeader = styled.h3``;

function CountdownBox({ draftId, sidebar }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const { data } = useGetStartClock(draftId);
  const dispatch = useDispatch();

  const updateRemainingTime = useCallback(
    (startTime) => {
      const now = dayjs();
      const endTime = startTime.add(10, "minute");
      const timeDiff = endTime.diff(now, "second");

      if (timeDiff > 0) {
        setRemainingTime(timeDiff);
      } else {
        setRemainingTime(0);
        dispatch(setDraftStatus("Drafting Now!"));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (data) {
      const startTime = dayjs(data.start_clock);
      updateRemainingTime(startTime);
    }
  }, [data, updateRemainingTime]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  if (remainingTime === null) {
    // Conditionally render styles based on 'sidebar' prop during loading state
    const StyledBox = sidebar ? SidebarCountdownBoxStyle : CountdownBoxStyle;

    return (
      <StyledBox>
        <Countdown>
          <SpinnerMini />
        </Countdown>
      </StyledBox>
    );
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Format seconds to always have two digits
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <>
      {sidebar ? (
        <SidebarCountdownBoxStyle>
          {remainingTime > 0 ? (
            <>
              <Countdown>
                {minutes}:{formattedSeconds}
              </Countdown>
            </>
          ) : (
            <SidebarDraftStartingHeader>0:00</SidebarDraftStartingHeader>
          )}
        </SidebarCountdownBoxStyle>
      ) : (
        <CountdownBoxStyle>
          {remainingTime > 0 ? (
            <>
              <TimeRemaining>Starting in:</TimeRemaining>

              <Countdown>
                {minutes}:{formattedSeconds}
              </Countdown>
            </>
          ) : (
            <DraftStartingHeader>Draft started!</DraftStartingHeader>
          )}
        </CountdownBoxStyle>
      )}
    </>
  );
}

export default CountdownBox;
