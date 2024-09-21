import styled from "styled-components";

export const StyledSidebar = styled.aside`
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

export const FixedTopArea = styled.div`
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

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: ${(props) => props.size || "1fr"};

  &:first-child,
  &:last-child {
    background-color: var(--background-color);
    color: var(--brand-color);
    font-size: 2rem;
    font-weight: 700;
  }

  &:nth-child(2) {
    background-color: var(--brand-color);
    color: var(--background-color-dark);
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  width: 100%;
  padding-left: 1rem;
`;

export const TimerSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;
  font-size: 3rem;
  font-weight: bold;
  margin: 0rem 1rem;
  color: var(--brand-color);
`;

export const RoundAndPickContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`;

export const RoundHeader = styled.h2`
  margin-bottom: 0.5rem;
`;

export const TeamList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const TeamListItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  background-color: ${(props) =>
    props.$isHighlighted ? "var(--brand-color)" : "transparent"};
  color: ${(props) =>
    props.$fontColor ? "var(--background-color)" : "var(--brand-color)"};
`;
