import { useDispatch, useSelector } from "react-redux";
import { useUncompletedDrafts } from "../authentication/useUncompletedDrafts";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import {
  ActionButton,
  ActionsContainer,
  CenteredMessage,
} from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import MyDraftsHeader from "../components/MyDraftsHeader";
import { Table, TableCell, TableHeader, TableRow } from "../ui/TableStyles";

import {
  capitalizeFirstLetter,
  formatMinutes,
  formatTime,
  formatDate,
  groupData,
} from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import {
  setIsEditing,
  setIsEditingHistory,
} from "../store/slices/newDraftSlice";

import { useDeleteDraft } from "../authentication/useDeleteDraft";
import {
  DeleteDraftModal,
  EditDraftModal,
  StartDraftSaveModal,
} from "../ui/CustomModals";
import { useEffect, useState } from "react";
import { useDraftDetails } from "../hooks/useDraftDetails";
import JoinedDraftsData from "../components/JoinedDraftsData";
import { setdraftIdTeamInviteLink } from "../store/slices/inviteTeamLinkSlice";
import { useGetLiveDraft } from "../authentication/useGetLiveDraft";
import {
  resetTeamsHaveJoined,
  setAdmin,
  setCurrentTurn,
  setLiveDraftData,
  setLiveDraftId,
  setParticipant,
  setPickStartTime,
} from "../store/slices/liveDraftSlice";
import { useUpdateDraftHasStarted } from "../authentication/useUpdateDraftHasStarted";
import { useUpdateStartClock } from "../authentication/useUpdateStartClock";
import dayjs from "dayjs";
import supabase from "../services/supabase";
import { useGetCurrentTurn } from "../authentication/useGetCurrentTurn";
import { setDraftsLength } from "../store/slices/draftSlice";

function MyDrafts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // delete modal state
  const [isDeleteDraftModalVisible, setIsDeleteDraftSaveModalVisible] =
    useState(false);

  // edit modal state
  const [isEditDraftModalVisible, setIsEditDraftModalVisible] = useState(false);

  // start modal state
  const [isStartDraftModalVisible, setIsStartDraftModalVisible] =
    useState(false);

  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);

  const [shouldUseDraftDetails, setShouldUseDraftDetails] = useState(false);

  const { data: drafts, isPending, error } = useUncompletedDrafts(userId);

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();

  const { liveDraftDetails } = useGetLiveDraft(selectedDraftId);

  const { setUpdateDraftHasStarted, isPending: isPendingDraftHasStarted } =
    useUpdateDraftHasStarted();

  const { setStartClock } = useUpdateStartClock();

  const { currentTurn } = useGetCurrentTurn(selectedDraftId);

  useDraftDetails(selectedDraftId, shouldUseDraftDetails);

  const handleDeleteDraft = async (draftId) => {
    try {
      await deleteDraft(draftId);
      // After successful deletion, set selectedDraftId to null
      setSelectedDraftId(null);
    } catch (error) {
      console.error("Error deleting draft:", error);
    }
  };

  // unsubscribe from all channels
  async function unsubscribe() {
    await supabase.removeAllChannels();
  }

  unsubscribe();

  useEffect(() => {
    if (liveDraftDetails) {
      const groupedData = groupData(liveDraftDetails);
      dispatch(setLiveDraftData(groupedData));
      if (groupedData.draft && groupedData.draft.admin) {
        dispatch(setAdmin(groupedData.draft.admin));
      }
      dispatch(setParticipant(userId));
    }
    dispatch(resetTeamsHaveJoined());
  }, [dispatch, liveDraftDetails, userId]);

  useEffect(() => {
    if (drafts) {
      dispatch(setDraftsLength(drafts.length));
    }
  }, [drafts, dispatch]);

  //=====================================================================

  // Save Modal functions
  const showDeleteDraftModal = (draftId) => {
    setSelectedDraftId(draftId);
    setIsDeleteDraftSaveModalVisible(true);
  };

  const handleDeleteDraftCancel = () => {
    setIsDeleteDraftSaveModalVisible(false);
  };

  const handleDeleteDraftConfirm = () => {
    handleDeleteDraftCancel();
    if (selectedDraftId) {
      handleDeleteDraft(selectedDraftId);
    }
  };

  //=====================================================================

  //=====================================================================

  // Edit Modal functions
  const showEditDraftModal = (draftId) => {
    setSelectedDraftId(draftId);
    setIsEditDraftModalVisible(true);
  };

  const handleEditDraftCancel = () => {
    setIsEditDraftModalVisible(false);
  };

  const handleEditDraftConfirm = () => {
    handleEditDraftCancel();
    setShouldUseDraftDetails(true);
    dispatch(setIsEditingHistory(false));
    dispatch(setIsEditing(true));
  };

  //=====================================================================

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
    const now = dayjs();
    dispatch(setPickStartTime(now.toISOString()));
    dispatch(setLiveDraftId(selectedDraftId));

    handleStartDraftCancel();
    setStartClock({ startTime: now, draftId: selectedDraftId });

    dispatch(setCurrentTurn(currentTurn));

    setUpdateDraftHasStarted(
      {
        hasDraftStarted: true,
        draftId: selectedDraftId,
      },
      {
        onSuccess: () => {
          navigate(`/join-draft`);
        },
      }
    );
  };

  //=====================================================================

  function handleClickTeamInvites(uniqueDraftId, draftId) {
    navigate(`/invite-links/${uniqueDraftId}`);
    dispatch(setdraftIdTeamInviteLink(draftId));
  }

  function handleEnterLiveDraft(admin) {
    if (admin === userId) {
      navigate(`/join-draft`);
    }
  }

  useEffect(() => {
    setShouldUseDraftDetails(false);
  }, []);

  if (isPending || deleteDraftIsPending) {
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
      <MyDraftsHeader isMyDrafts={true} headerTitle="My Drafts" />
      <DashboardContentContainer>
        {drafts.length === 0 ? (
          <h2>No drafts</h2>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader> Details </TableHeader>
                <TableHeader>Invite Links</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {drafts.map((draft) => {
                const draftDateTime = dayjs(
                  `${draft.draft_date} ${draft.draft_time}`
                );
                const now = dayjs();
                const isWithin20Minutes =
                  draftDateTime.diff(now, "minute") <= 20 &&
                  draftDateTime.diff(now, "minute") > 0;
                const isPastDraftTime = now.isAfter(draftDateTime);
                const showStartNowButton = isWithin20Minutes || isPastDraftTime;

                return (
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
                          onClick={() =>
                            handleClickTeamInvites(
                              draft.unique_draft_url,
                              draft.id
                            )
                          }
                        >
                          Team Invite Links
                        </ActionButton>
                      </ActionsContainer>
                    </TableCell>
                    <TableCell>
                      <ActionsContainer>
                        {draft.draft_has_started ? (
                          <ActionButton
                            onClick={() => handleEnterLiveDraft(draft.admin)}
                          >
                            Join Draft - Live!
                          </ActionButton>
                        ) : showStartNowButton ? (
                          <ActionButton
                            onClick={() => showStartDraftModal(draft.id)}
                            disabled={isPendingDraftHasStarted}
                          >
                            Start Now
                          </ActionButton>
                        ) : null}
                        <ActionButton
                          onClick={() => showEditDraftModal(draft.id)}
                        >
                          Edit
                        </ActionButton>
                        <ActionButton
                          onClick={() => showDeleteDraftModal(draft.id)}
                          $customColor="var(--red-color)"
                        >
                          Delete
                        </ActionButton>
                      </ActionsContainer>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        )}
        <DeleteDraftModal
          isDeleteDraftModalVisible={isDeleteDraftModalVisible}
          handleDeleteDraftModalConfirm={handleDeleteDraftConfirm}
          handleDeleteDraftModalCancel={handleDeleteDraftCancel}
        />
      </DashboardContentContainer>
      <EditDraftModal
        isEditDraftModalVisible={isEditDraftModalVisible}
        handleEditDraftModalConfirm={handleEditDraftConfirm}
        handleEditDraftModalCancel={handleEditDraftCancel}
      />
      <StartDraftSaveModal
        isStartModalVisible={isStartDraftModalVisible}
        handleStartConfirm={handleStartDraftConfirm}
        handleStartCancel={handleStartDraftCancel}
      />
      <JoinedDraftsData />
    </>
  );
}

export default MyDrafts;
