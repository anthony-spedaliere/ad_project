import styled from "styled-components";
import StyledSelect from "./StyledSelect";
import StyledInput from "../ui/StyledInput";
import StyledCheckbox from "../ui/StyledCheckbox";
import StyledButton from "../ui/StyledButton";
import { useUpdateDraftTurn } from "../authentication/useUpdateDraftTurn";
import { useSelector } from "react-redux";

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
  const { setDraftTurn } = useUpdateDraftTurn();
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraftData);
  const currentTurn = useSelector((state) => state.liveDraft.currentTurn);

  function handleResetTurn(currTurn, draftId) {
    setDraftTurn({ newTurn: 0, draftId: draftId });
  }

  return (
    <StyledHeader>
      <HeaderTop>
        <HeaderTitle>POI Pool</HeaderTitle>
      </HeaderTop>
      <HeaderBottom>
        <StyledSelect $width="auto">
          <option value="option1">Map Name 1</option>
        </StyledSelect>
        <StyledInput
          height="4rem"
          $bgColor="var(--brand-color)"
          placeholder="Search Poi's"
        />

        <StyledCheckbox textColor="var(--brand-color)" marginBottom="0rem">
          Hide Drafted
        </StyledCheckbox>
        <StyledButton
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="#B5B3DE"
          $padding="1rem 3rem"
          onClick={() =>
            handleResetTurn(currentTurn, liveDraftInfo?.draft?.draft_id)
          }
        >
          Pick
        </StyledButton>
      </HeaderBottom>
    </StyledHeader>
  );
}

export default DraftHeader;
