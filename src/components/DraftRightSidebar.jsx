import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--background-color-light);
  padding: 1rem;
  overflow: auto;
`;

const UpdateStatusContainer = styled.div`
  background-color: var(--brand-color);
  color: var(--background-color);
  border-radius: 1rem;
  padding: 0.5rem;
`;

function DraftRightSidebar() {
  const teamsHaveJoinedArr = useSelector(
    (state) => state.liveDraft.teamsHaveJoined
  );

  // Reference for the scrollable div (Body)
  const updatesContainerRef = useRef(null);

  const [isUserScrolling, setIsUserScrolling] = useState(false); // track manual scrolling

  // Function to scroll to the bottom of the updates
  const scrollToBottom = useCallback(() => {
    if (updatesContainerRef.current && !isUserScrolling) {
      updatesContainerRef.current.scrollTop =
        updatesContainerRef.current.scrollHeight;
    }
  }, [isUserScrolling]);

  // Scroll to bottom whenever teamsHaveJoinedArr updates
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, teamsHaveJoinedArr]);

  // Handle user scroll to stop auto-scrolling
  const handleScroll = () => {
    if (updatesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        updatesContainerRef.current;
      // If the user scrolls up, stop auto-scroll; else keep scrolling to the bottom
      if (scrollHeight - scrollTop > clientHeight + 20) {
        setIsUserScrolling(true);
      } else {
        setIsUserScrolling(false);
      }
    }
  };

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
        <Body ref={updatesContainerRef} onScroll={handleScroll}>
          {teamsHaveJoinedArr.map((item, index) => (
            <UpdateStatusContainer key={index}>
              {item.has_joined
                ? `${item.team_name} has joined!`
                : `${item.team_name} has left.`}
            </UpdateStatusContainer>
          ))}
        </Body>
      </Section>
    </StyledSidebar>
  );
}

export default DraftRightSidebar;
