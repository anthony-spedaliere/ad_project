import { useSelector } from "react-redux";
import styled from "styled-components";
import TeamCard from "../components/TeamCard";
import CountdownBox from "../components/CountdownBox";

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

  return (
    <>
      <Header>
        <HeaderContent>
          <CountdownBox draftId={liveDraftInfo?.draft?.draft_id} />
          <Title>{liveDraftInfo?.draft?.draft_name}</Title>
        </HeaderContent>
        <LeaveDraftButton>Leave Draft</LeaveDraftButton>
      </Header>
      <TeamsContainer>
        {teams.map((team) => (
          <TeamCard
            key={team.team_id}
            draftPriority={team.draft_priority}
            teamName={team.team_name}
            participant={participant}
            teamOwner={team.team_owner}
          />
        ))}
      </TeamsContainer>
    </>
  );
}

export default JoinDraftPage;
