import {
  ButtonHeaderContainer,
  NewDraftButton,
  ProgressBarContainer,
} from "../styles/MyDraftStyles";
import StyledHeader from "../ui/StyledHeader";

function NewDraftPageHeader({ showCancelModal, showSaveModal }) {
  return (
    <>
      <ButtonHeaderContainer>
        <NewDraftButton onClick={showCancelModal}>Cancel</NewDraftButton>
        <NewDraftButton
          $customColor="var(--color-grey-0)"
          onClick={showSaveModal}
        >
          Save
        </NewDraftButton>
      </ButtonHeaderContainer>

      <ProgressBarContainer>
        <StyledHeader $fontSize="3rem">Edit Draft</StyledHeader>
      </ProgressBarContainer>
    </>
  );
}

export default NewDraftPageHeader;
