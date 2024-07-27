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
  setDraftDate,
  setDraftName,
  setDraftTime,
  setDraftTimePerPick,
  setDraftType,
  setGroups,
  setIsEditing,
  setNumberOfMaps,
  setNumGroups,
  setNumTeams,
  setShouldAddGroups,
  setShouldSendEmail,
} from "../store/slices/newDraftSlice";
import { useGetDraft } from "../authentication/useGetDraft";
import { setDraftId } from "../store/slices/draftSlice";
import { useGetGroups } from "../authentication/useGetGroups";
import { useGetMaps } from "../authentication/useGetMapsNames";
import { useGetPois } from "../authentication/useGetPois";
import { useEffect, useMemo, useState } from "react";

function MyDrafts() {
  const dispatch = useDispatch();

  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);
  const isEditingState = useSelector((state) => state.newDraft.isEditing);
  const { data: drafts, isPending, error } = useUncompletedDrafts(userId);
  const navigate = useNavigate();

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  const { selectedDraft } = useGetDraft(selectedDraftId);
  const { selectedGroups } = useGetGroups(selectedDraftId);
  const {
    selectedMaps,
    isPending: mapsIsLoading,
    error: mapsError,
  } = useGetMaps(selectedDraftId);

  const groupsNameArray = useMemo(
    () =>
      selectedGroups && selectedGroups.group
        ? selectedGroups.group.map((obj) => Object.values(obj)[0])
        : [],
    [selectedGroups]
  );

  useEffect(() => {
    // Wait for the draft data to be fetched
    if (selectedDraft && selectedGroups && selectedMaps && isEditingState) {
      dispatch(setDraftName(selectedDraft.draft[0].name));
      dispatch(setDraftType(selectedDraft.draft[0].draft_type));
      dispatch(setDraftTimePerPick(selectedDraft.draft[0].draft_time_per_pick));
      dispatch(setDraftDate(selectedDraft.draft[0].draft_date));
      dispatch(setDraftTime(selectedDraft.draft[0].draft_time));
      dispatch(setShouldSendEmail(selectedDraft.draft[0].send_email));
      if (selectedDraft.draft[0].number_of_groups) {
        dispatch(setShouldAddGroups(true));
      }
      dispatch(setNumGroups(selectedDraft.draft[0].number_of_groups));
      dispatch(setNumTeams(selectedDraft.draft[0].number_of_teams));
      dispatch(setNumberOfMaps(selectedDraft.draft[0].number_of_maps));
      dispatch(setGroups(groupsNameArray));
      navigate("/new-draft-one");
    }
  }, [
    selectedDraft,
    selectedGroups,
    selectedMaps,
    dispatch,
    groupsNameArray,
    navigate,
    isEditingState,
  ]);

  function handleClickEdit(draftId) {
    dispatch(setDraftId(draftId));
    dispatch(setIsEditing(true));
    setSelectedDraftId(draftId);
  }

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
                    <ActionButton $customColor="var(--red-color)">
                      Delete
                    </ActionButton>
                  </ActionsContainer>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </DashboardContentContainer>
    </>
  );
}

export default MyDrafts;
