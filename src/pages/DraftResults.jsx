import { useDispatch, useSelector } from "react-redux";
import { useGetPoisWithDraftId } from "../authentication/useGetPoisWithDraftId";
import { setMaps, setPois, setTeams } from "../store/slices/draftResultsSlice";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useGetTeamsByDraftId } from "../authentication/useGetTeamsByDraftId";
import DraftResultsOverview from "../components/DraftResultsOverview";
import { useGetMaps } from "../authentication/useGetMapsNames";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DraftResults() {
  const dispatch = useDispatch();

  const draftResultsId = useSelector(
    (state) => state.draftResults.draftResultsId
  );

  const { pois, isPending: getPoisPending } =
    useGetPoisWithDraftId(draftResultsId);
  const { teams, isPending: getTeamsPending } =
    useGetTeamsByDraftId(draftResultsId);
  const { selectedMaps, isPending: getMapsPending } =
    useGetMaps(draftResultsId);

  useEffect(() => {
    if (pois) {
      dispatch(setPois(pois));
    }
    if (teams) {
      dispatch(setTeams(teams.team));
    }

    if (selectedMaps) {
      dispatch(setMaps(selectedMaps));
    }
  }, [dispatch, pois, selectedMaps, teams]);

  if (getPoisPending || getTeamsPending || getMapsPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return (
    <div>
      <DraftResultsOverview />
    </div>
  );
}

export default DraftResults;
