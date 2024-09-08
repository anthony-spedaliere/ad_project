// PoiPoolPage.jsx
import { useSelector } from "react-redux";
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

import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

const PoiPoolPage = () => {
  const liveDraftData = useSelector((state) => state.liveDraft.liveDraft);
  const maps = liveDraftData.draft.maps || {};

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
          {Object.values(maps).map((map) =>
            Object.values(map.pois).map((poi) => (
              <DataRow key={poi.poi_id}>
                <DataCell>
                  <FaRegStar />
                </DataCell>
                <DataCell>{poi.poi_name}</DataCell>
                <DataCell>{map.map_name}</DataCell>
                <DataCell>{poi.poi_number}</DataCell>
                <DataCell />
              </DataRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default PoiPoolPage;
