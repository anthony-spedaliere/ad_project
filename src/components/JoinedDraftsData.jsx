import { useDispatch, useSelector } from "react-redux";
import { useGetDraftsJoined } from "../authentication/useGetDraftsJoined";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import {
  ActionButton,
  ActionsContainer,
  CenteredMessage,
} from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import MyDraftsHeader from "./MyDraftsHeader";
import { Table, TableCell, TableHeader, TableRow } from "../ui/TableStyles";
import {
  capitalizeFirstLetter,
  formatMinutes,
  formatTime,
  formatDate,
} from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import { setJoinedDrafts } from "../store/slices/joinedDraftsSlice";
import { useGetUniqueTeamId } from "../authentication/useGetUniqueTeamId";
import { LeaveDraftModal } from "../ui/CustomModals";
import { useUpdateTeamOwnerAndRegenUuid } from "../authentication/useUpdateTeamOwnerAndRegenUuid";
import { useUpdateInviteAccepted } from "../authentication/useUpdateInviteAccepted";

function JoinedDraftsData() {
  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  // modal state
  const [isLeaveDraftModalVisible, setIsLeaveDraftSaveModalVisible] =
    useState(false);

  const {
    data: joinedDraftsData,
    isPending,
    error,
  } = useGetDraftsJoined(userId);

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  const { selectedTeam } = useGetUniqueTeamId({
    userId: userId,
    draftId: selectedDraftId,
  });

  const { setInviteAccepted } = useUpdateInviteAccepted();

  const { mutate: updateTeamOwnerReject } = useUpdateTeamOwnerAndRegenUuid();

  useEffect(() => {
    dispatch(setJoinedDrafts(joinedDraftsData));
  }, [dispatch, joinedDraftsData]);

  // Leave Draft Modal Functions

  const showLeaveDraftModal = () => {
    setIsLeaveDraftSaveModalVisible(true);
  };

  const handleLeaveDraftCancel = () => {
    setIsLeaveDraftSaveModalVisible(false);
  };

  const handleLeaveDraftConfirm = () => {
    handleLeaveDraftCancel();

    setInviteAccepted({
      isAccepted: false,
      uniqTeamId: selectedTeam.team.unique_team_id,
    });

    updateTeamOwnerReject({
      userId: userId,
      uniqueTeamId: selectedTeam.team.unique_team_id,
    });
  };

  const handleLeaveDraftClick = (draftId) => {
    setSelectedDraftId(draftId);
    showLeaveDraftModal();
  };

  if (isPending) {
    return (
      <DashboardContentContainer>
        <CenteredMessage>
          <Spinner />
        </CenteredMessage>
      </DashboardContentContainer>
    );
  }

  if (error) {
    return (
      <DashboardContentContainer>
        <h1>Error loading drafts</h1>
      </DashboardContentContainer>
    );
  }

  return (
    <>
      <MyDraftsHeader
        isMyDrafts={false}
        headerTitle="Drafts I Joined"
        marginTop="4rem"
      />
      <DashboardContentContainer>
        {joinedDraftsData.length === 0 ? (
          <h2>No drafts</h2>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader> Details </TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {joinedDraftsData.map((draft) => (
                <TableRow key={draft.id}>
                  <TableCell>
                    {draft.name} <br />
                    {formatDate(draft.draft_date)}
                    <br />
                    {formatTime(draft.draft_time)}
                    <br />
                    {capitalizeFirstLetter(draft.draft_type)} Draft
                    <br />
                    {`${formatMinutes(
                      draft.draft_time_per_pick
                    )} minute(s) per pick`}
                    <br />
                    {`${draft.number_of_teams} teams`}
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <ActionButton
                        $customColor="var(--red-color)"
                        onClick={() => handleLeaveDraftClick(draft.id)}
                      >
                        Leave Draft
                      </ActionButton>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
        <LeaveDraftModal
          isLeaveDraftModalVisible={isLeaveDraftModalVisible}
          handleLeaveDraftModalConfirm={handleLeaveDraftConfirm}
          handleLeaveDraftModalCancel={handleLeaveDraftCancel}
        />
      </DashboardContentContainer>
    </>
  );
}

export default JoinedDraftsData;
