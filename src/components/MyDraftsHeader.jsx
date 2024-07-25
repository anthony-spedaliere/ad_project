import { FaPlus } from "react-icons/fa";
import {
  CustomSpan,
  MyDraftContainer,
  MyDraftCustomLink,
} from "../styles/MyDraftStyles";

function MyDraftsHeader() {
  return (
    <MyDraftContainer>
      <h1>My Drafts</h1>
      <MyDraftCustomLink to="/new-draft-one" $customColor="var(--blue-color)">
        <CustomSpan>
          <FaPlus />
        </CustomSpan>
        Create New Draft
      </MyDraftCustomLink>
    </MyDraftContainer>
  );
}

export default MyDraftsHeader;
