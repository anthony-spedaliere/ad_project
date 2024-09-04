import dayjs from "dayjs";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import styled from "styled-components";

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

const TimeRemaining = styled.div`
  font-size: 3rem;
`;

const Countdown = styled.div`
  font-size: 5rem;
  font-weight: 700;
`;

function CountdownBox({ draftId }) {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchDraftData = async () => {
      const { data } = await supabase
        .from("draft")
        .select("start_clock")
        .eq("id", draftId)
        .single();

      if (data) {
        const startTime = dayjs(data.start_clock);
        updateRemainingTime(startTime);
      }
    };

    fetchDraftData();
  }, [draftId]);

  const updateRemainingTime = (startTime) => {
    const now = dayjs();
    const endTime = startTime.add(10, "minute");
    const timeDiff = endTime.diff(now, "second");

    if (timeDiff > 0) {
      setRemainingTime(timeDiff);
    } else {
      setRemainingTime(0);
    }
  };

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  if (remainingTime === null) {
    return <div>Loading...</div>;
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Format seconds to always have two digits
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <CountdownBoxStyle>
      {remainingTime > 0 ? (
        <>
          <TimeRemaining>Starting in:</TimeRemaining>

          <Countdown>
            {minutes}:{formattedSeconds}
          </Countdown>
        </>
      ) : (
        <span>Draft has started!</span>
      )}
    </CountdownBoxStyle>
  );
}

export default CountdownBox;
