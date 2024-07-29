import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { insertNewDraft } from "../services/apiDrafts";
import { insertGroupName } from "../services/apiGroup";
import { insertMaps } from "../services/apiMap";
import { insertPois } from "../services/apiPoi";
import { insertTeams } from "../services/apiTeam";
import toast from "react-hot-toast";

export function useSubmitNewDraft() {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.user.id);
  const draftData = useSelector((state) => state.newDraft);

  const { mutate: submitNewDraft, isPending } = useMutation({
    mutationFn: async () => {
      try {
        // insert new draft into db
        const newDraftResponse = await insertNewDraft(
          draftData.draftName,
          draftData.draftType,
          draftData.draftTimePerPick,
          draftData.draftDate,
          draftData.draftTime,
          draftData.shouldSendEmail,
          draftData.numGroups,
          draftData.numTeams,
          draftData.numMap,
          userId
        );
        // check for errors
        if (newDraftResponse.error)
          throw new Error(newDraftResponse.error.message);

        // retrieve id of new draft
        const draftId = newDraftResponse.draft.id;

        // Insert groups, handling the default "No group" if necessary
        const groupsToInsert =
          draftData.groups.length > 0 ? draftData.groups : ["No group"];
        const groupsResponse = await insertGroupName(groupsToInsert, draftId);
        // check for errors
        if (groupsResponse.error) throw new Error(groupsResponse.error.message);

        // insert maps
        const mapsResponse = await insertMaps(draftData.maps, draftId);

        // check for errors
        if (mapsResponse.error) throw new Error(mapsResponse.error.message);

        // insert pois
        await Promise.all(
          mapsResponse.maps.map((map, index) =>
            insertPois(draftData.maps[index].pois, map.id)
          )
        );

        // insert teams
        await insertTeams(draftData.teams, groupsResponse.group, draftId);

        toast.success("Draft submitted successfully!");

        // Invalidate the drafts query cache to refetch the drafts data
        queryClient.invalidateQueries(["uncompletedDrafts", userId]);
      } catch (error) {
        toast.error(`Error submitting new draft: ${error.message}`);
        throw new Error(`Error submitting new draft: ${error.message}`);
      }
    },
  });

  return { submitNewDraft, isPending };
}
