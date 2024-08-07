// function imports
import { useSelector } from "react-redux";
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

import { DeleteDraftModal } from "../ui/CustomModals";
import { useState } from "react";
import { useDeleteDraft } from "../authentication/useDeleteDraft";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DraftHistory() {
  const userId = useSelector((state) => state.user.id);
  const { data: drafts, isPending, error } = useCompletedDrafts(userId);

  // modal state
  const [isDeleteDraftModalVisible, setIsDeleteDraftSaveModalVisible] =
    useState(false);

  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  const navigate = useNavigate();

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
        navigate("/dashboard/draft-history", { replace: true });
        toast.success("Draft successfully deleted.");
      },
    });
  };

  //=====================================================================

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

  if (drafts.length === 0) {
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
                    <ActionButton>View Results</ActionButton>
                    <ActionButton>Redraft</ActionButton>
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
      </DraftHistoryContentContainer>
    </DashboardContentContainer>
  );
}

export default DraftHistory;
