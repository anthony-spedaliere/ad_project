import { FaPlus } from "react-icons/fa";
import {
  CustomSpan,
  MyDraftContainer,
  MyDraftCustomLink,
} from "../styles/MyDraftStyles";
import { useDispatch } from "react-redux";
import { resetDraftForm, setIsEditing } from "../store/slices/newDraftSlice";
import StyledHeader from "../ui/StyledHeader";

function MyDraftsHeader({ isMyDrafts, headerTitle, marginTop }) {
  const dispatch = useDispatch();

  return (
    <MyDraftContainer>
      <StyledHeader $fontSize="4rem" $mgBottom="2rem" $mgTop={marginTop}>
        {headerTitle}
      </StyledHeader>
      {isMyDrafts ? (
        <MyDraftCustomLink
          onClick={() => {
            dispatch(resetDraftForm());
            dispatch(setIsEditing(false));
          }}
          to="/new-draft-one"
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
