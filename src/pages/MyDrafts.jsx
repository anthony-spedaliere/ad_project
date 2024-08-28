// style importsimport { FaPlus } from "react-icons/fa";
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
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDraftDetails } from "../hooks/useDraftDetails";
import JoinedDraftsData from "../components/JoinedDraftsData";
import { setdraftIdTeamInviteLink } from "../store/slices/inviteTeamLinkSlice";

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
  const [selectedUniqueDraftId, setSelectedUniqueDraftId] = useState(null);

  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();

  useDraftDetails(selectedDraftId, shouldUseDraftDetails);

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
    deleteDraft(selectedDraftId, {
      onSuccess: () => {
        navigate("/dashboard/my-drafts", { replace: true });
        toast.success("Draft successfully deleted.");
      },
    });
  };

  //=====================================================================

  //=====================================================================

  // Edit Modal functions
  const showEditDraftModal = (draftId) => {
    setSelectedUniqueDraftId(draftId);
    setIsEditDraftModalVisible(true);
  };

  const handleEditDraftCancel = () => {
    setIsEditDraftModalVisible(false);
  };

  const handleEditDraftConfirm = () => {
    handleEditDraftCancel();
    setSelectedDraftId(selectedDraftId);
    setShouldUseDraftDetails(true);
    dispatch(setIsEditingHistory(false));
    dispatch(setIsEditing(true));
  };

  //=====================================================================

  //=====================================================================

  // Start Modal functions
  const showStartDraftModal = (uniqueDraftId) => {
    setSelectedUniqueDraftId(uniqueDraftId);
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

  function handleClickTeamInvites(uniqueDraftId, draftId) {
    navigate(`/invite-links/${uniqueDraftId}`);
    dispatch(setdraftIdTeamInviteLink(draftId));
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
              {drafts.map((draft) => (
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
                      <ActionButton
                        onClick={() =>
                          showStartDraftModal(draft.unique_draft_url)
                        }
                      >
                        Start Now
                      </ActionButton>
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
              ))}
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
