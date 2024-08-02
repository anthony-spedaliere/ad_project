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
  groupData,
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
  setMapData,
  setNumberOfMaps,
  setNumGroups,
  setNumTeams,
  setShouldAddGroups,
  setShouldSendEmail,
  setTeams,
} from "../store/slices/newDraftSlice";
import { useEffect, useState } from "react";
import { useGetDraftDetails } from "../authentication/useGetDraftDetails";
import { setCurrDraftInEditing } from "../store/slices/draftSlice";
import { useDeleteDraft } from "../authentication/useDeleteDraft";

function MyDrafts() {
  const dispatch = useDispatch();

  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);
  const isEditingState = useSelector((state) => state.newDraft.isEditing);
  const { data: drafts, isPending, error } = useUncompletedDrafts(userId);
  const navigate = useNavigate();

  const [selectedDraftId, setSelectedDraftId] = useState(null);

  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();

  // custom hook to get selected draft details for editing
  const { draftDetails } = useGetDraftDetails(selectedDraftId);

  useEffect(() => {
    // Wait for the draft data to be fetched
    if (draftDetails && isEditingState) {
      const groupedData = groupData(draftDetails);
      const draft = Object.values(groupedData)[0];
      dispatch(setCurrDraftInEditing(draft));

      // // set global state
      dispatch(setDraftName(draft.draft_name));
      dispatch(setDraftType(draft.draft_type));
      dispatch(setDraftTimePerPick(draft.draft_time_per_pick));
      dispatch(setDraftDate(draft.draft_date));
      dispatch(setDraftTime(draft.draft_time));
      dispatch(setShouldSendEmail(draft.send_email));
      if (draft.number_of_groups) {
        dispatch(setShouldAddGroups(true));
        dispatch(setNumGroups(draft.number_of_groups));
        dispatch(setGroups(Object.keys(draft.groups)));
      }
      dispatch(setNumTeams(draft.number_of_teams));
      dispatch(setNumberOfMaps(draft.number_of_maps));

      const maps = Object.values(draft.maps).map((map) => ({
        mapName: map.map_name,
        numPoi: Object.keys(map.pois).length,
        pois: Object.values(map.pois).map((poi) => ({
          name: poi.poi_name,
          points: poi.poi_number,
        })),
      }));
      dispatch(setMapData({ maps }));

      const teams = [];
      Object.values(draft.groups).forEach((group) => {
        Object.values(group.teams).forEach((team) => {
          teams.push({
            groupOfTeam: group.group_name,
            teamName: team.team_name,
            draftPriority: team.draft_priority,
          });
        });
      });
      dispatch(setTeams(teams));

      // const teams = Object.values(draft.teams || {}).map((team) => ({
      //   teamName: team.team_name || "",
      //   draftPriority: team.draft_priority || 0,
      //   groupOfTeam: team.group_of_team || "",
      // }));
      // dispatch(setTeamsData({ teams }));

      navigate("/new-draft-one");
    }
  }, [draftDetails, dispatch, navigate, isEditingState]);

  function handleClickEdit(draftId) {
    setSelectedDraftId(draftId);

    dispatch(setIsEditing(true));
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
                    <ActionButton
                      onClick={() => deleteDraft(draft.id)}
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
      </DashboardContentContainer>
    </>
  );
}

export default MyDrafts;
