import { FaPlus } from "react-icons/fa";
import {
  CustomSpan,
  MyDraftContainer,
  MyDraftCustomLink,
} from "../styles/MyDraftStyles";
import { useDispatch } from "react-redux";
import { resetDraftForm } from "../store/slices/newDraftSlice";

function MyDraftsHeader() {
  const dispatch = useDispatch();

  return (
    <MyDraftContainer>
      <h1>My Drafts</h1>
      <MyDraftCustomLink
        onClick={() => dispatch(resetDraftForm())}
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
