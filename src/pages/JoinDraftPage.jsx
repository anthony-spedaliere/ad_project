import { useSelector } from "react-redux";

function JoinDraftPage() {
  const liveDraftInfo = useSelector((state) => state.liveDraft.liveDraft);
  console.log(liveDraftInfo);

  return (
    <div>
      <h1>JoinDraftPage</h1>
    </div>
  );
}

export default JoinDraftPage;
