import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";

function NewDraftPageThree() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(3));
  }, [dispatch]);

  return (
    <div>
      <ProgressBar />
      <div>
        <h2>Content for Set Up Maps</h2>
        {/* Add your page content here */}
      </div>
    </div>
  );
}

export default NewDraftPageThree;
