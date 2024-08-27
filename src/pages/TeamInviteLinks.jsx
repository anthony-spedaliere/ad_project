import { useSelector } from "react-redux";
import { useGetTeamsByDraftId } from "../authentication/useGetTeamsByDraftId";
import { CenteredMessage } from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { RxQuestionMarkCircled } from "react-icons/rx";
import StyledButton from "../ui/StyledButton";
import { useState } from "react";
import { RemoveTeamModal } from "../ui/CustomModals";
import { useUpdateTeamOwnerAndRegenUuid } from "../authentication/useUpdateTeamOwnerAndRegenUuid";
import { IoReturnUpBack } from "react-icons/io5";

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

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--blue-color); /* Customize the color as needed */
  margin-left: 10px;

  &:hover {
    color: #357ab7; /* Customize the hover color as needed */
  }
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InstructionsBox = styled.div`
  border: 2px solid var(--background-color);
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: var(--background-color-light);

  -webkit-text-fill-color: var(--brand-color);
  color: #111827 !important;
`;

const InstructionsList = styled.ol`
  padding-left: 20px;
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

function TeamInviteLinks() {
  const { uniqueDraftId } = useParams();
  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);

  const navigate = useNavigate();

  // modal state
  const [isRemoveTeamModalVisible, setIsRemoveTeamSaveModalVisible] =
    useState(false);

  const [uniqueTeamId, setUniqueTeamId] = useState(null);

  const { mutate: updateTeamOwnerReject } = useUpdateTeamOwnerAndRegenUuid();

  const draftId = useSelector(
    (state) => state.inviteTeamLinks.draftIdTeamInviteLink
  );

  const { teams, isPending, error } = useGetTeamsByDraftId(draftId);

  const handleCopyClick = (link) => {
    const instructions = `How to Join the Draft:

1. Log in to your Draft Apex account. If you don’t have an account, please visit: https://www.draftapex.com/signup to create a new one.

2. After logging in, paste and open the invite link below in your browser to join the draft.

${link}

Thank you!
    `;

    navigator.clipboard.writeText(instructions).then(() => {
      toast.success("Link copied to clipboard.");
    });
  };

  function handleBack() {
    navigate("/dashboard/my-drafts");
  }

  // Leave Draft Modal Functions

  const showRemoveTeamModal = (uniqueDraftId) => {
    setUniqueTeamId(uniqueDraftId);
    setIsRemoveTeamSaveModalVisible(true);
  };

  const handleRemoveTeamCancel = () => {
    setIsRemoveTeamSaveModalVisible(false);
  };

  const handleRemoveTeamConfirm = () => {
    updateTeamOwnerReject(
      {
        userId: userId,
        uniqueTeamId: uniqueTeamId,
      },
      { onSuccess: () => toast.success("Successfully removed user.") }
    );

    handleRemoveTeamCancel();
  };

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
      <BackButton
        onClick={handleBack}
        $customColor="var(--blue-color)"
        $mgBottom="2rem"
      >
        <IoReturnUpBack />
        Back
      </BackButton>
      <Subtitle>Invite Instructions</Subtitle>
      <InstructionsBox>
        <InstructionsList>
          <li>
            Copy the email contents using the blue icon found in the Invite
            Email data cell.
          </li>
          <li>Paste in an email.</li>
          <li>Send the invite link to the relevant team members.</li>
          <li>Track the invite status in the table below.</li>
          <li>
            If a recipient accepts the invite that status will change from
            &quot;Pending&quot; to &quot;Accepted&quot;.
          </li>
          <li>Manage users with the remove button.</li>
        </InstructionsList>
      </InstructionsBox>

      <Subtitle>Invite Links</Subtitle>

      <Table>
        <thead>
          <HeaderRow>
            <HeaderCell>Teams</HeaderCell>
            <HeaderCell>Invite Email</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>
              Remove User <RxQuestionMarkCircled />
            </HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {teams.team.map((team) => {
            const encodedTeamName = encodeURIComponent(team.team_name).replace(
              /%20/g,
              "+"
            );
            const inviteLink = `http://localhost:5173/dashboard/accept-invite?team=${encodedTeamName}&teamId=${team.unique_team_id}&tid=${team.id}&draftId=${team.draft_id}&uniqueDraftId=${uniqueDraftId}`;

            return (
              <DataRow key={team.id}>
                <DataCell>{team.team_name}</DataCell>
                <DataCell>
                  {team.team_owner ? (
                    "Invite Accepted"
                  ) : (
                    <>
                      Invite Email
                      <CopyButton
                        title="Copy"
                        onClick={() => handleCopyClick(inviteLink)}
                      >
                        <FaCopy />
                      </CopyButton>
                    </>
                  )}
                </DataCell>
                <DataCell>{team.team_owner ? "Accepted" : "Pending"}</DataCell>
                <DataCell>
                  <StyledButton
                    $bgColor="var(--brand-color)"
                    $textColor="var(--background-color)"
                    $hoverBgColor="var(--brand-color-dark)"
                    $fontSize="1.2rem"
                    height="3rem"
                    $padding=".5rem"
                    onClick={() => showRemoveTeamModal(team.unique_team_id)}
                  >
                    Remove
                  </StyledButton>
                </DataCell>
              </DataRow>
            );
          })}
        </tbody>
      </Table>
      <RemoveTeamModal
        isRemoveTeamModalVisible={isRemoveTeamModalVisible}
        handleRemoveTeamModalConfirm={handleRemoveTeamConfirm}
        handleRemoveTeamModalCancel={handleRemoveTeamCancel}
      />
    </Container>
  );
}

export default TeamInviteLinks;
