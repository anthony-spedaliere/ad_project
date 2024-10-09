// function imports
import { useDispatch, useSelector } from "react-redux";
import { useCompletedDrafts } from "../authentication/useCompletedDrafts";

// style imports
import { DashboardContentContainer } from "../styles/DashboardStyles";

// draft history style imports
import {
  ActionButton,
  CenteredMessage,
  ActionsContainer,
  DraftHistoryContentContainer,
} from "../styles/DraftHistoryStyles";

import { Table, TableHeader, TableRow, TableCell } from "../ui/TableStyles";

import StyledHeader from "../ui/StyledHeader";
import Spinner from "../ui/Spinner";
import {
  capitalizeFirstLetter,
  formatDate,
  formatMinutes,
  formatTime,
} from "../utils/helperFunctions";

import { DeleteDraftModal, RedraftDraftModal } from "../ui/CustomModals";
import { useEffect, useState, useMemo } from "react";
import { useDeleteDraft } from "../authentication/useDeleteDraft";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setIsEditing,
  setIsEditingHistory,
} from "../store/slices/newDraftSlice";
import { useDraftDetails } from "../hooks/useDraftDetails";
import { setDraftResultsId } from "../store/slices/draftResultsSlice";

function DraftHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.id);

  const [shouldUseDraftDetails, setShouldUseDraftDetails] = useState(false);

  const {
    data: completedDrafts,
    isPending,
    error,
  } = useCompletedDrafts(userId);

  // delete modal state
  const [isDeleteDraftModalVisible, setIsDeleteDraftSaveModalVisible] =
    useState(false);

  const joinedDraftsData = useSelector(
    (state) => state.joinedDrafts.joinedDrafts
  );

  // redraft modal state
  const [isRedraftDraftModalVisible, setIsRedraftDraftSaveModalVisible] =
    useState(false);

  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  useDraftDetails(selectedDraftId, shouldUseDraftDetails);

  const allDrafts = useMemo(() => {
    const completedJoinedDrafts = joinedDraftsData.filter(
      (draft) => draft.is_draft_complete
    );
    return [...(completedDrafts || []), ...completedJoinedDrafts];
  }, [completedDrafts, joinedDraftsData]);

  //=====================================================================

  // Delete Modal functions
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
        navigate("/dashboard/draft-history", { replace: true });
        toast.success("Draft successfully deleted.");
      },
    });
  };

  //=====================================================================

  //=====================================================================

  // Redraft Modal functions
  const showRedraftDraftModal = (draftId) => {
    setSelectedDraftId(draftId);
    setIsRedraftDraftSaveModalVisible(true);
  };

  const handleRedraftDraftCancel = () => {
    setIsRedraftDraftSaveModalVisible(false);
  };

  const handleRedraftDraftConfirm = () => {
    handleRedraftDraftCancel();

    setSelectedDraftId(selectedDraftId);
    setShouldUseDraftDetails(true);
    dispatch(setIsEditing(true));
    dispatch(setIsEditingHistory(true));
  };

  //=====================================================================

  function handleOnViewResults(draftId) {
    dispatch(setDraftResultsId(draftId));
    navigate(`/dashboard/draft-results/${draftId}`);
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

  if (allDrafts.length === 0) {
    return (
      <DashboardContentContainer>
        <CenteredMessage>No draft history</CenteredMessage>
      </DashboardContentContainer>
    );
  }

  return (
    <DashboardContentContainer>
      <DraftHistoryContentContainer>
        <StyledHeader $fontSize="4rem" $mgBottom="4rem">
          Draft History
        </StyledHeader>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Draft Details</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {allDrafts.map((draft) => (
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
                    <ActionButton onClick={() => handleOnViewResults(draft.id)}>
                      View Results
                    </ActionButton>
                    <ActionButton
                      onClick={() => showRedraftDraftModal(draft.id)}
                    >
                      Redraft
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
        <DeleteDraftModal
          isDeleteDraftModalVisible={isDeleteDraftModalVisible}
          handleDeleteDraftModalConfirm={handleDeleteDraftConfirm}
          handleDeleteDraftModalCancel={handleDeleteDraftCancel}
        />
        <RedraftDraftModal
          isRedraftDraftModalVisible={isRedraftDraftModalVisible}
          handleRedraftDraftModalConfirm={handleRedraftDraftConfirm}
          handleRedraftDraftModalCancel={handleRedraftDraftCancel}
        />
      </DraftHistoryContentContainer>
    </DashboardContentContainer>
  );
}

export default DraftHistory;
