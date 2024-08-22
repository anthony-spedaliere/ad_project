import styled from "styled-components";

export const DraftHistoryContentContainer = styled.div`
  padding: 20px;
`;

export const ActionButton = styled.button`
  background: none;
  color: ${(props) => props.$customColor || "var(--blue-color)"};
  font-size: 2rem;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 5px 0;

  &:hover {
    color: var(--color-grey-400);
  }
`;

export const CenteredMessage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--brand-color);
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
