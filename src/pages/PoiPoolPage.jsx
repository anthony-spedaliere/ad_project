import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableBody,
  HeaderRow,
  HeaderCell,
  DataCell,
  DataRow,
} from "../styles/PoiPoolPageStyles";
import StyledButton from "../ui/StyledButton";
import { FaStar, FaRegStar } from "react-icons/fa6";
import {
  setSelectedFavorites,
  setUsersPicks,
} from "../store/slices/liveDraftSlice";
import { useUpdateDraftTurn } from "../authentication/useUpdateDraftTurn";
import { useUpdateRoundDrafted } from "../authentication/useUpdateRoundDrafted";
import { useUpdateDraftedBy } from "../authentication/useUpdateDraftedBy";
import { useUpdateNumberPicked } from "../authentication/useUpdateNumberPicked";
import { useUpdateStartClock } from "../authentication/useUpdateStartClock";
import dayjs from "dayjs";

const PoiPoolPage = () => {
  const dispatch = useDispatch();

  const selectedFavorites = useSelector(
    (state) => state.liveDraft.selectedFavorites
  );

  const [selectedPois, setSelectedPois] = useState(selectedFavorites || []); // Local state to track selected POIs
  const [draftedPois, setDraftedPois] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const liveDraftData = useSelector((state) => state.liveDraft.liveDraftData);
  const participant = useSelector((state) => state.liveDraft.participant);
  const admin = useSelector((state) => state.liveDraft.admin);
  const activeUser = useSelector((state) => state.liveDraft.activeUser);
  const currentTurn = useSelector((state) => state.liveDraft.currentTurn);
  const teamOwnersArray = useSelector((state) => state.liveDraft.teamTurnList);
  const teamIds = useSelector((state) => state.liveDraft.teamIdList);
  const numberOfMaps = liveDraftData?.draft?.number_of_maps || 0;
  const maps = liveDraftData.draft.maps || {};
  const userPicks = useSelector((state) => state.liveDraft.usersPicks);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // test variable
  const { setDraftTurn } = useUpdateDraftTurn();
  const { setRoundDrafted } = useUpdateRoundDrafted();
  const { setDraftedBy } = useUpdateDraftedBy();
  const { setNumberPicked } = useUpdateNumberPicked();
  const { setStartClock } = useUpdateStartClock();

  // -------- Calculate the round ---------
  const totalPicks = teamOwnersArray.length;
  // Calculate picks per round
  const picksPerRound = totalPicks / numberOfMaps;
  // Calculate round based on the currentTurn and picksPerRound
  const currentRound =
    currentTurn > 0 ? Math.floor((currentTurn - 1) / picksPerRound) + 1 : 1; //
  // ----------------------------------------------------------------------------

  // Sync local state with Redux state on mount
  useEffect(() => {
    if (selectedFavorites) {
      setSelectedPois(selectedFavorites);
    }
  }, [selectedFavorites]);

  useEffect(() => {
    if (userPicks && userPicks.length > 0) {
      setDraftedPois(userPicks); // Sync with persisted picks if they exist
    }
  }, [userPicks]);

  // Toggle selection of POI
  const handleFavoriteClick = (poi) => {
    if (selectedPois.some((selectedPoi) => selectedPoi.poi_id === poi.poi_id)) {
      // If the POI is already selected, remove it
      setSelectedPois((prevSelected) =>
        prevSelected.filter((selectedPoi) => selectedPoi.poi_id !== poi.poi_id)
      );
    } else {
      // Otherwise, add the POI to the selected list
      setSelectedPois((prevSelected) => [...prevSelected, poi]);
    }
  };

  const handleRowClick = (poi) => {
    setHighlightedRow(poi.poi_id);
  };

  const isPoiSelected = (poi) =>
    selectedPois.some((selectedPoi) => selectedPoi.poi_id === poi.poi_id);

  useEffect(() => {
    dispatch(setSelectedFavorites(selectedPois));
  }, [dispatch, selectedPois]);

  function handleUpdateUserPick(poiId, currTurn, user, currRound, poiName) {
    setButtonDisabled(true);

    const updatedDraftedPois = [...draftedPois, poiName];
    setDraftedPois(updatedDraftedPois); // Update local state
    dispatch(setUsersPicks(updatedDraftedPois)); // Persist the new state in Redux
    const now = dayjs();
    setStartClock({
      startTime: now,
      draftId: liveDraftData?.draft?.draft_id,
    });

    setDraftTurn({
      newTurn: currentTurn + 1,
      draftId: liveDraftData?.draft?.draft_id,
    });

    setRoundDrafted({ poiId: poiId, roundDrafted: currRound });
    setDraftedBy({ poiId: poiId, userUuid: user });
    setNumberPicked({ poiId: poiId, numberPicked: currTurn });

    setButtonDisabled(false);
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <HeaderRow>
            <HeaderCell>Favorite</HeaderCell>
            <HeaderCell>Poi Name</HeaderCell>
            <HeaderCell>Map Name</HeaderCell>
            <HeaderCell>Poi Number</HeaderCell>
            <HeaderCell>Selected by</HeaderCell>
          </HeaderRow>
        </TableHeader>
        <TableBody>
          {Object.values(maps).map((map) => {
            // Sort the POIs by poi_number in ascending order
            const sortedPois = Object.values(map.pois).sort(
              (a, b) => a.poi_number - b.poi_number
            );

            return sortedPois.map((poi) => (
              <DataRow
                key={poi.poi_id}
                $isSelected={highlightedRow === poi.poi_id}
                onClick={() => handleRowClick(poi)}
              >
                <DataCell>
                  {isPoiSelected(poi) ? (
                    <FaStar
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFavoriteClick(poi)}
                      color="yellow"
                    />
                  ) : (
                    <FaRegStar
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFavoriteClick(poi)}
                    />
                  )}
                </DataCell>
                <DataCell>{poi.poi_name}</DataCell>
                <DataCell>{map.map_name}</DataCell>
                <DataCell>{poi.poi_number}</DataCell>
                <DataCell>
                  {participant === activeUser || participant === admin
                    ? highlightedRow === poi.poi_id && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <StyledButton
                            $bgColor="var(--brand-color)"
                            $textColor="var(--background-color)"
                            $fontSize="1.6rem"
                            height="2.5rem"
                            $hoverBgColor="var(--blue-color)"
                            width="10rem"
                            onClick={() =>
                              handleUpdateUserPick(
                                poi.poi_id,
                                currentTurn,
                                teamIds[currentTurn - 1],
                                currentRound,
                                poi.poi_name
                              )
                            }
                            disabled={buttonDisabled}
                          >
                            Draft
                          </StyledButton>
                        </div>
                      )
                    : null}
                </DataCell>
              </DataRow>
            ));
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default PoiPoolPage;
