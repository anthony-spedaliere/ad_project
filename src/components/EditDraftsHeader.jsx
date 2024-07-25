import {
  ButtonHeaderContainer,
  NewDraftButton,
  ProgressBarContainer,
} from "../styles/MyDraftStyles";

function NewDraftPageHeader({ showCancelModal, showSaveModal }) {
  return (
    <>
      <ButtonHeaderContainer>
        <NewDraftButton onClick={showCancelModal}>Cancel</NewDraftButton>
        <NewDraftButton onClick={showSaveModal}>Save</NewDraftButton>
      </ButtonHeaderContainer>

      <ProgressBarContainer>Edit Draft</ProgressBarContainer>
    </>
  );
}

export default NewDraftPageHeader;
