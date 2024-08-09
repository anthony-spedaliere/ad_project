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
import { setIsEditing } from "../store/slices/newDraftSlice";

import { useDeleteDraft } from "../authentication/useDeleteDraft";
import { DeleteDraftModal } from "../ui/CustomModals";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDraftDetails } from "../hooks/useDraftDetails";

function MyDrafts() {
  const dispatch = useDispatch();

  // modal state
  const [isDeleteDraftModalVisible, setIsDeleteDraftSaveModalVisible] =
    useState(false);

  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);

  const [shouldUseDraftDetails, setShouldUseDraftDetails] = useState(false);

  const { data: drafts, isPending, error } = useUncompletedDrafts(userId);
  const navigate = useNavigate();

  const [selectedDraftId, setSelectedDraftId] = useState(null);

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

  function handleClickEdit(draftId) {
    setSelectedDraftId(draftId);
    setShouldUseDraftDetails(true);
    dispatch(setIsEditing(true));
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

  if (drafts.length === 0) {
    return (
      <>
        <MyDraftsHeader />
        <DashboardContentContainer>
          <CenteredMessage>No drafts</CenteredMessage>
        </DashboardContentContainer>
      </>
    );
  }

  return (
    <>
      <MyDraftsHeader />
      <DashboardContentContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Draft Details</TableHeader>
              <TableHeader>Draft Link</TableHeader>
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
                <TableCell>www.draftapex.com/4dsDc!SW%#21</TableCell>
                <TableCell>
                  <ActionsContainer>
                    <ActionButton>Start Now</ActionButton>
                    <ActionButton onClick={() => handleClickEdit(draft.id)}>
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
        <DeleteDraftModal
          isDeleteDraftModalVisible={isDeleteDraftModalVisible}
          handleDeleteDraftModalConfirm={handleDeleteDraftConfirm}
          handleDeleteDraftModalCancel={handleDeleteDraftCancel}
        />
      </DashboardContentContainer>
    </>
  );
}

export default MyDrafts;
