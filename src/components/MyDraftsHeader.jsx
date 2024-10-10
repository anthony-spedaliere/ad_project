import { FaPlus } from "react-icons/fa";
import {
  CustomSpan,
  MyDraftContainer,
  MyDraftCustomLink,
} from "../styles/MyDraftStyles";
import { useDispatch, useSelector } from "react-redux";
import { resetDraftForm, setIsEditing } from "../store/slices/newDraftSlice";
import StyledHeader from "../ui/StyledHeader";
import { toast } from "react-hot-toast";

function MyDraftsHeader({ isMyDrafts, headerTitle, marginTop }) {
  const dispatch = useDispatch();
  const draftsLength = useSelector((state) => state.draft.draftsLength);

  const handleCreateNewDraft = () => {
    if (draftsLength > 5) {
      toast.error("Only 5 drafts allowed at a time");
    } else {
      dispatch(resetDraftForm());
      dispatch(setIsEditing(false));
    }
  };

  return (
    <MyDraftContainer>
      <StyledHeader $fontSize="4rem" $mgBottom="2rem" $mgTop={marginTop}>
        {headerTitle}
      </StyledHeader>
      {isMyDrafts ? (
        <MyDraftCustomLink
          onClick={handleCreateNewDraft}
          to={draftsLength <= 5 ? "/new-draft-one" : "#"}
          $customColor="var(--color-grey-300)"
        >
          <CustomSpan>
            <FaPlus />
          </CustomSpan>
          Create New Draft
        </MyDraftCustomLink>
      ) : (
        <></>
      )}
    </MyDraftContainer>
  );
}

export default MyDraftsHeader;
