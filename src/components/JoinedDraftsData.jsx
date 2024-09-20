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
  groupData,
} from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import { setJoinedDrafts } from "../store/slices/joinedDraftsSlice";
import { useGetUniqueTeamId } from "../authentication/useGetUniqueTeamId";
import { LeaveDraftModal, StartLiveDraftModal } from "../ui/CustomModals";
import { useUpdateTeamOwnerAndRegenUuid } from "../authentication/useUpdateTeamOwnerAndRegenUuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetLiveDraft } from "../authentication/useGetLiveDraft";
import {
  setAdmin,
  setLiveDraftData,
  setParticipant,
} from "../store/slices/liveDraftSlice";

function JoinedDraftsData() {
  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // start modal state
  const [isStartDraftModalVisible, setIsStartDraftModalVisible] =
    useState(false);

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

  const { mutate: updateTeamOwnerReject } = useUpdateTeamOwnerAndRegenUuid();

  const { liveDraftDetails } = useGetLiveDraft(selectedDraftId);

  useEffect(() => {
    if (liveDraftDetails) {
      const groupedData = groupData(liveDraftDetails);
      dispatch(setLiveDraftData(groupedData));
      dispatch(setAdmin(groupedData.draft.admin));
      dispatch(setParticipant(userId));
    }
  }, [dispatch, liveDraftDetails, selectedDraftId, userId]);

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

    updateTeamOwnerReject(
      {
        userId: userId,
        uniqueTeamId: selectedTeam.team.unique_team_id,
      },
      {
        onSuccess: () => {
          toast.success("Successfully left draft.");
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      }
    );
  };

  const handleLeaveDraftClick = (draftId) => {
    setSelectedDraftId(draftId);
    showLeaveDraftModal();
  };

  //=====================================================================

  // Start Modal functions
  const showStartDraftModal = (draftId) => {
    setSelectedDraftId(draftId);
    setIsStartDraftModalVisible(true);
  };

  const handleStartDraftCancel = () => {
    setIsStartDraftModalVisible(false);
  };

  const handleStartDraftConfirm = () => {
    handleStartDraftCancel();
    navigate(`/join-draft`);
  };

  //=====================================================================

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
              {joinedDraftsData.map((draft, index) => (
                <TableRow key={`${draft.id}-${index}`}>
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
                      {draft.draft_has_started ? (
                        <ActionButton
                          onClick={() => showStartDraftModal(draft.id)}
                        >
                          Join Draft - Live!
                        </ActionButton>
                      ) : (
                        <></>
                      )}
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
        <StartLiveDraftModal
          isStartModalVisible={isStartDraftModalVisible}
          handleStartConfirm={handleStartDraftConfirm}
          handleStartCancel={handleStartDraftCancel}
        />
      </DashboardContentContainer>
    </>
  );
}

export default JoinedDraftsData;
