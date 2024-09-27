import styled from "styled-components";
import StyledSelect from "./StyledSelect";
import StyledInput from "../ui/StyledInput";
import StyledCheckbox from "../ui/StyledCheckbox";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedMap,
  toggleIsHideDraftedChecked,
} from "../store/slices/liveDraftSlice";

const StyledHeader = styled.header`
  background-color: var(--background-color-dark);
  color: var(--brand-color);
  text-align: center;
  z-index: 1;
  grid-area: header;
  min-height: 18rem;
  display: flex;
  flex-direction: column;
`;

const HeaderTop = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderBottom = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-top: 1px solid rgb(201, 199, 242, 0.2);
  padding: 1rem;
  gap: 1rem;
`;

const HeaderTitle = styled.h1`
  text-decoration: underline;
`;

function DraftHeader() {
  const dispatch = useDispatch();
  const isHideDrafted = useSelector(
    (state) => state.liveDraft.isHideDraftedChecked
  );
  const selectedMap = useSelector((state) => state.liveDraft.selectedMaps);
  const searchQuery = useSelector((state) => state.liveDraft.searchQuery);

  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);

  const handleCheckboxChange = () => {
    dispatch(toggleIsHideDraftedChecked());
  };

  const handleMapChange = (e) => {
    dispatch(setSelectedMap(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value)); // Dispatch the search query to Redux store
  };

  return (
    <StyledHeader>
      <HeaderTop>
        <HeaderTitle>POI Pool</HeaderTitle>
      </HeaderTop>
      <HeaderBottom>
        <StyledSelect
          $width="auto"
          onChange={handleMapChange}
          value={selectedMap}
        >
          <option value="all-maps">All maps</option>
          {liveDraftInfo?.draft?.maps &&
            Object.values(liveDraftInfo.draft.maps).map((map) => (
              <option key={map.map_id} value={map.map_name}>
                {map.map_name}
              </option>
            ))}
        </StyledSelect>
        <StyledInput
          height="4rem"
          $bgColor="var(--brand-color)"
          placeholder="Search Poi's"
          value={searchQuery}
          onChange={handleSearchChange} // Update search query in Redux
        />

        <StyledCheckbox
          textColor="var(--brand-color)"
          marginBottom="0rem"
          onChange={handleCheckboxChange}
          checked={isHideDrafted}
        >
          Hide Drafted
        </StyledCheckbox>
      </HeaderBottom>
    </StyledHeader>
  );
}

export default DraftHeader;
