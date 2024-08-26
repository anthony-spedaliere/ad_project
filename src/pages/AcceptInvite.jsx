import { useNavigate, useSearchParams } from "react-router-dom";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";
import { useUpdateTeamOwner } from "../authentication/useUpdateTeamOwner";
import { useSelector } from "react-redux";
import { useUpdateTeamOwnerAndRegenUuid } from "../authentication/useUpdateTeamOwnerAndRegenUuid";
import { useGetDraftByUniqueId } from "../authentication/useGetDraftByUniqueId";
import Spinner from "../ui/Spinner";
import { useGetTeamById } from "../authentication/useGetTeamById";
import toast from "react-hot-toast";
import { useGetTeamsByDraftId } from "../authentication/useGetTeamsByDraftId";

export const CenteredMessage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--brand-color);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DraftOverview = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: var(--background-color-light);
  border-radius: 8px;
  color: var(--brand-color);
`;

const DraftOverviewParagraph = styled.p`
  margin: 1rem 0rem 1rem 0rem;
`;

function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const uniqueTeamId = searchParams.get("teamId");
  const uniqueDraftId = searchParams.get("uniqueDraftId");
  const teamName = searchParams.get("team");
  const tid = searchParams.get("tid");
  const draftId = searchParams.get("draftId");
  const decodedTeamName = decodeURIComponent(teamName);

  const { setTeamOwner, isPending } = useUpdateTeamOwner();
  const { mutate: updateTeamOwnerReject, isPending: isPendingReject } =
    useUpdateTeamOwnerAndRegenUuid();

  const { selectedDraftByUniqueId, isPending: isPendingGetUniqueDraftId } =
    useGetDraftByUniqueId(uniqueDraftId);

  const { selectedTeam, isPending: isPendingGetSelectedTeam } =
    useGetTeamById(tid);

  const { teams } = useGetTeamsByDraftId(draftId);

  const userId = useSelector((state) => state.user.id);

  function handleAccept() {
    const userAlreadyTeamOwner = teams.team.some(
      (team) => team.team_owner === userId
    );

    if (!userAlreadyTeamOwner) {
      setTeamOwner({ userId, uniqTeamId: uniqueTeamId });
    } else {
      toast.error(
        "You have already joined this draft. You may only join a draft once."
      );
    }
  }

  function handleReject() {
    updateTeamOwnerReject(
      { userId, uniqueTeamId },
      {
        onSuccess: () => {
          window.location.reload();
          navigate("/dashboard/my-drafts");
          toast.success("Invite accepted.");
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      }
    );
  }

  if (isPendingGetUniqueDraftId || isPendingGetSelectedTeam) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  const draft = selectedDraftByUniqueId.draft[0];
  const idCheck = selectedTeam.team[0].unique_team_id === uniqueTeamId;

  if (!idCheck || selectedTeam.team[0].team_owner) {
    return (
      <CenteredMessage>
        <h1>Link expired. Please contact draft owner for new link.</h1>
      </CenteredMessage>
    );
  }

  return (
    <CenteredMessage>
      <h1>Draft Invitation: {decodedTeamName} </h1>

      {draft && (
        <DraftOverview>
          <h2>Draft Overview</h2>
          <DraftOverviewParagraph>
            <strong>Draft Name:</strong> {draft.name}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Draft Date:</strong> {draft.draft_date}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Draft Time:</strong> {draft.draft_time}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Draft Type:</strong> {draft.draft_type}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Time Per Pick (sec.):</strong> {draft.draft_time_per_pick}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Number of teams:</strong> {draft.number_of_teams}
          </DraftOverviewParagraph>
          <DraftOverviewParagraph>
            <strong>Number of maps:</strong> {draft.number_of_maps}
          </DraftOverviewParagraph>
        </DraftOverview>
      )}

      <h1>Join draft? </h1>

      <ButtonsContainer>
        <StyledButton
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--blue-color)"
          $padding="1rem"
          onClick={handleAccept}
          disabled={isPending || isPendingReject}
        >
          Accept
        </StyledButton>
        <StyledButton
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--red-color)"
          $padding="1rem"
          onClick={handleReject}
          disabled={isPending || isPendingReject}
        >
          Reject
        </StyledButton>
      </ButtonsContainer>
    </CenteredMessage>
  );
}

export default AcceptInvite;
