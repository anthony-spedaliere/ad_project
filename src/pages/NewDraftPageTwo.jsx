import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";

function NewDraftPageTwo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(2));
  }, [dispatch]);

  return (
    <div>
      <ProgressBar />
      <div>
        <h2>Content for Set Up Teams</h2>
        {/* Add your page content here */}
      </div>
    </div>
  );
}

export default NewDraftPageTwo;
