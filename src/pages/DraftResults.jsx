import { useGetPoisWithDraftId } from "../authentication/useGetPoisWithDraftId";
import { setPois } from "../store/slices/draftResultsSlice";

function DraftResults() {
  return (
    <div>
      <h1>Draft Results</h1>
    </div>
  );
}

export default DraftResults;

// add user info to the global state on login
// useEffect(() => {
//   if (isAuthenticated && user?.id && usernameData && !isDeleted) {
//     dispatch(setUserId(user.id));
//     dispatch(setUserEmail(user?.email));
//     dispatch(setUserUsername(usernameData[0].username));
//   }
// }, [isAuthenticated, user, dispatch, usernameData, isDeleted]);
