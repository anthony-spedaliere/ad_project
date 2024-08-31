import { useSelector } from "react-redux";
import styled from "styled-components";
import TeamCard from "../components/TeamCard";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--background-color);
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--brand-color);
`;

const CountdownBox = styled.div`
  background-color: var(--brand-color);
  min-height: 15rem;
  min-width: 15rem;
  padding: 0.5rem;
  color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-left: 2rem;
  border-radius: 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const LeaveDraftButton = styled.button`
  color: ${(props) => props.$customColor || "var(--red-color)"};
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${(props) => props.$mgBottom || "0rem"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  padding: 1rem;
  gap: 1rem;
  max-width: 100%;
`;

function JoinDraftPage() {
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraft);
  const admin = useSelector((state) => state.liveDraft.admin);
  const participant = useSelector((state) => state.liveDraft.participant);

  const teams = Object.values(liveDraftInfo?.draft?.groups || {})
    .flatMap((group) => Object.values(group.teams))
    .sort((a, b) => a.draft_priority - b.draft_priority);

  console.log(liveDraftInfo);

  return (
    <>
      <Header>
        <HeaderContent>
          <Title>{liveDraftInfo?.draft?.draft_name}</Title>
          <CountdownBox>Starts In 0:00</CountdownBox>
        </HeaderContent>
        <LeaveDraftButton>Leave Draft</LeaveDraftButton>
      </Header>
      <TeamsContainer>
        {teams.map((team) => (
          <TeamCard
            key={team.team_id}
            draftPriority={team.draft_priority}
            teamName={team.team_name}
          />
        ))}
      </TeamsContainer>
    </>
  );
}

export default JoinDraftPage;
