import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TeamCard from "../components/TeamCard";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import supabase from "../services/supabase";
import { setTeamsHaveJoined } from "../store/slices/liveDraftSlice";
import CustomCountdownBox from "../components/CustomCountdownBox";

const Main = styled.main`
  background-color: var(--background-color);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 140rem;
  margin: 0 auto;
  gap: 3.2rem;
`;

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

export const BackButton = styled.button`
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

const AdminJoinDraftButton = styled.button`
  color: ${(props) => props.$customColor || "var(--blue-color)"};
  text-decoration: underline;
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

function JoinDraftPage() {
  const navigate = useNavigate();

  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);
  const admin = useSelector((state) => state.liveDraft.admin);
  const participant = useSelector((state) => state.liveDraft.participant);

  const teams = Object.values(liveDraftInfo?.draft?.groups || {})
    .flatMap((group) => Object.values(group.teams))
    .sort((a, b) => a.draft_priority - b.draft_priority);

  function handleJoinDraft() {
    navigate("/draft/poi-pool");
  }

  function handleBack() {
    navigate("/dashboard/my-drafts");
  }

  const dispatch = useDispatch();

  const channelUpdates = supabase
    .channel("has-joined-updates")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "team",
        filter: `draft_id=eq.${liveDraftInfo?.draft?.draft_id}`,
      },
      (payload) => {
        dispatch(setTeamsHaveJoined(payload.new));
      }
    )
    .subscribe();

  return (
    <Main>
      <Container>
        <Header>
          <HeaderContent>
            <Title>{liveDraftInfo?.draft?.draft_name}</Title>
            <CountdownBoxStyle>
              <CustomCountdownBox
                draftId={liveDraftInfo?.draft?.draft_id}
                duration={30}
              />
            </CountdownBoxStyle>
          </HeaderContent>
          <BackButton
            onClick={handleBack}
            $customColor="var(--color-grey-100)"
            $mgBottom="2rem"
          >
            <IoReturnUpBack />
            Back to Dashboard
          </BackButton>
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
          {admin === participant ? (
            <AdminJoinDraftButton onClick={handleJoinDraft}>
              Join Draft As Admin
            </AdminJoinDraftButton>
          ) : (
            <></>
          )}
        </TeamsContainer>
      </Container>
    </Main>
  );
}

export default JoinDraftPage;
