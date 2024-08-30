import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { groupData } from "../utils/helperFunctions";
import {
  setDraftDate,
  setDraftName,
  setDraftTime,
  setDraftTimePerPick,
  setDraftType,
  setGroups,
  setMapData,
  setNumberOfMaps,
  setNumGroups,
  setNumTeams,
  setShouldAddGroups,
  setShouldSendEmail,
  setTeams,
} from "../store/slices/newDraftSlice";
import { setCurrDraftInEditing } from "../store/slices/draftSlice";
import { useGetDraftDetails } from "../authentication/useGetDraftDetails";

export const useDraftDetails = (selectedDraftId, checkState) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { draftDetails } = useGetDraftDetails(selectedDraftId);

  useEffect(() => {
    // Wait for the draft data to be fetched
    if (draftDetails && checkState) {
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

      // Sort teams by draftPriority
      teams.sort((a, b) => a.draftPriority - b.draftPriority);

      dispatch(setTeams(teams));

      navigate("/new-draft-one");
    }
  }, [draftDetails, dispatch, navigate, checkState]);
};
