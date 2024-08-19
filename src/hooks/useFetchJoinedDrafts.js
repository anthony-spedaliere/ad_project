import { useEffect, useState } from "react";
import { useGetDraft } from "../hooks/useGetDraft";

export const useFetchJoinedDrafts = (joinedDrafts) => {
  const [draftsIJoined, setDraftsIJoined] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const draftPromises = joinedDrafts.map((draftId) => {
          const { data } = useGetDraft(draftId); // This is fine now, since the hook is within a React function.
          return data;
        });

        const fetchedDrafts = await Promise.all(draftPromises);
        setDraftsIJoined(fetchedDrafts);
      } catch (err) {
        setError(err);
      }
    };

    if (joinedDrafts.length > 0) {
      fetchDrafts();
    }
  }, [joinedDrafts]);

  return { draftsIJoined, error };
};
