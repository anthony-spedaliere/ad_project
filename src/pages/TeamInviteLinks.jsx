import { useSelector } from "react-redux";
import { useGetTeamsByDraftId } from "../authentication/useGetTeamsByDraftId";
import { CenteredMessage } from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const Subtitle = styled.h1`
  text-align: left;
  margin-bottom: 1rem;
  margin-top: ${(props) => props.$mgTop || "0"};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background-color: var(--background-color-light);
`;

const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid var(--background-color);
  text-align: left;
`;

const DataRow = styled.tr``;

const DataCell = styled.td`
  padding: 10px;
  border: 1px solid var(--background-color-light);
  text-align: left;
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function TeamInviteLinks() {
  const { uniqueDraftId } = useParams();

  const draftId = useSelector(
    (state) => state.inviteTeamLinks.draftIdTeamInviteLink
  );

  const { teams, isPending, error } = useGetTeamsByDraftId(draftId);

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (error) {
    return (
      <DashboardContentContainer>
        <h1>Error loading drafts</h1>
      </DashboardContentContainer>
    );
  }

  if (teams.length === 0) {
    return (
      <>
        <DashboardContentContainer>
          <CenteredMessage>No teams to invite</CenteredMessage>
        </DashboardContentContainer>
      </>
    );
  }

  return (
    <Container>
      <Subtitle>Invite Links</Subtitle>
      <Table>
        <thead>
          <HeaderRow>
            <HeaderCell>Teams</HeaderCell>
            <HeaderCell>Links</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {teams.team.map((team) => {
            const encodedTeamName = encodeURIComponent(team.team_name).replace(
              /%20/g,
              "+"
            );
            const inviteLink = `http://localhost:5173/dashboard/accept-invite?team=${encodedTeamName}&teamId=${team.unique_team_id}&draftId=${team.draft_id}&uniqueDraftId=${uniqueDraftId}`;
            return (
              <DataRow key={team.id}>
                <DataCell>{team.team_name}</DataCell>
                <DataCell>{inviteLink}</DataCell>
                <DataCell>
                  {team.team_owner ? "Accepted" : "Unsent/Pending"}
                </DataCell>
              </DataRow>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default TeamInviteLinks;
