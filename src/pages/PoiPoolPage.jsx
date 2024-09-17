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
import { setSelectedFavorites } from "../store/slices/liveDraftSlice";

const PoiPoolPage = () => {
  const dispatch = useDispatch();

  const selectedFavorites = useSelector(
    (state) => state.liveDraft.selectedFavorites
  );

  const [selectedPois, setSelectedPois] = useState(selectedFavorites || []); // Local state to track selected POIs
  const [highlightedRow, setHighlightedRow] = useState(null);
  const liveDraftData = useSelector((state) => state.liveDraft.liveDraftData);
  const maps = liveDraftData.draft.maps || {};

  // Sync local state with Redux state on mount
  useEffect(() => {
    if (selectedFavorites) {
      setSelectedPois(selectedFavorites);
    }
  }, [selectedFavorites]);

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

  function handleClickTest() {
    console.log("clicked");
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
                  {highlightedRow === poi.poi_id && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <StyledButton
                        $bgColor="var(--brand-color)"
                        $textColor="var(--background-color)"
                        $fontSize="1.6rem"
                        height="2.5rem"
                        $hoverBgColor="var(--blue-color)"
                        width="10rem"
                        onClick={handleClickTest}
                      >
                        Draft
                      </StyledButton>
                    </div>
                  )}
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
