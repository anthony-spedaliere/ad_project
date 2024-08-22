import { useSearchParams } from "react-router-dom";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";
import { useUpdateTeamOwner } from "../authentication/useUpdateTeamOwner";
import { useSelector } from "react-redux";
import { useUpdateTeamOwnerAndRegenUuid } from "../authentication/useUpdateTeamOwnerAndRegenUuid";

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

function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const uniqueTeamId = searchParams.get("teamId");
  const teamName = searchParams.get("team");
  const decodedTeamName = decodeURIComponent(teamName);
  const { setTeamOwner, isPending, error } = useUpdateTeamOwner();
  const {
    mutate: updateTeamOwnerReject,
    isPending: isPendingReject,
    error: errorReject,
  } = useUpdateTeamOwnerAndRegenUuid();
  const userId = useSelector((state) => state.user.id);

  function handleAccept() {
    setTeamOwner({ userId, uniqTeamId: uniqueTeamId });
  }

  function handleReject() {
    updateTeamOwnerReject({ userId, uniqueTeamId });
  }

  return (
    <CenteredMessage>
      <h1>Draft Invitation: {decodedTeamName} </h1>
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
