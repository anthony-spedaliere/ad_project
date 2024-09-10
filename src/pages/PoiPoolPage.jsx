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
import { FaStar, FaRegStar } from "react-icons/fa6";
import { setSelectedFavorites } from "../store/slices/liveDraftSlice";

const PoiPoolPage = () => {
  const dispatch = useDispatch();

  const selectedFavorites = useSelector(
    (state) => state.liveDraft.selectedFavorites
  );

  const [selectedPois, setSelectedPois] = useState(selectedFavorites || []); // Local state to track selected POIs
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

  const isPoiSelected = (poi) =>
    selectedPois.some((selectedPoi) => selectedPoi.poi_id === poi.poi_id);

  useEffect(() => {
    dispatch(setSelectedFavorites(selectedPois));
  }, [dispatch, selectedPois]);

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
              <DataRow key={poi.poi_id}>
                <DataCell>
                  {isPoiSelected(poi) ? (
                    <FaStar
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFavoriteClick(poi)}
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
                <DataCell />
              </DataRow>
            ));
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default PoiPoolPage;
