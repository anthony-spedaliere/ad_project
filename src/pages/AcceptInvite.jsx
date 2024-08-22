import { useSearchParams } from "react-router-dom";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";
import { useUpdateTeamOwner } from "../authentication/useUpdateTeamOwner";
import { useSelector } from "react-redux";

export const CenteredMessage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--brand-color);
`;

function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const uniqueTeamId = searchParams.get("teamId");
  const teamName = searchParams.get("team");
  const decodedTeamName = decodeURIComponent(teamName);
  const { setTeamOwner, isPending, error } = useUpdateTeamOwner();

  const userId = useSelector((state) => state.user.id);

  function handleAccept() {
    setTeamOwner({ userId, uniqTeamId: uniqueTeamId });
  }

  return (
    <CenteredMessage>
      <h1>Invite to join draft {decodedTeamName}</h1>

      <StyledButton
        $bgColor="var(--brand-color)"
        $textColor="var(--background-color)"
        $hoverBgColor="var(--brand-color-dark)"
        $padding="1rem"
        onClick={handleAccept}
        disabled={isPending}
      >
        Accept
      </StyledButton>
      <StyledButton
        $bgColor="var(--brand-color)"
        $textColor="var(--background-color)"
        $hoverBgColor="var(--brand-color-dark)"
        $padding="1rem"
        onClick={() => {}}
      >
        Reject
      </StyledButton>
    </CenteredMessage>
  );
}

export default AcceptInvite;
