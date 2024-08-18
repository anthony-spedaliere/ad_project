import { FaPlus } from "react-icons/fa";
import {
  CustomSpan,
  MyDraftContainer,
  MyDraftCustomLink,
} from "../styles/MyDraftStyles";
import { useDispatch } from "react-redux";
import { resetDraftForm, setIsEditing } from "../store/slices/newDraftSlice";
import StyledHeader from "../ui/StyledHeader";

function MyDraftsHeader() {
  const dispatch = useDispatch();

  return (
    <MyDraftContainer>
      <StyledHeader $fontSize="4rem" $mgBottom="4rem">
        My Drafts
      </StyledHeader>
      <MyDraftCustomLink
        onClick={() => {
          dispatch(resetDraftForm());
          dispatch(setIsEditing(false));
        }}
        to="/new-draft-one"
        $customColor="var(--blue-color)"
      >
        <CustomSpan>
          <FaPlus />
        </CustomSpan>
        Create New Draft
      </MyDraftCustomLink>
    </MyDraftContainer>
  );
}

export default MyDraftsHeader;
