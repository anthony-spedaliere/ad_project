import {
  ButtonHeaderContainer,
  NewDraftButton,
  ProgressBarContainer,
} from "../styles/MyDraftStyles";
import ProgressBar from "./ProgressBar";

function NewDraftPageHeader({ showExitModal, showResetModal }) {
  return (
    <>
      <ButtonHeaderContainer>
        <NewDraftButton onClick={showExitModal}>
          Leave Draft Creation
        </NewDraftButton>
        <NewDraftButton onClick={showResetModal}>
          Reset Draft Form
        </NewDraftButton>
      </ButtonHeaderContainer>

      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
    </>
  );
}

export default NewDraftPageHeader;
