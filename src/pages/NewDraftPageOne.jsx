import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";
import { MyDraftCustomLink, NewDraftContainer } from "../styles/MyDraftStyles";

function NewDraftPageOne() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <NewDraftContainer>
      <ProgressBar />
      <MyDraftCustomLink $customColor="var(--red-color)" $textDecoration="none">
        Leave Draft Creation
      </MyDraftCustomLink>
    </NewDraftContainer>
  );
}

export default NewDraftPageOne;
