import { useSelector } from "react-redux";
import { useGetDraftsJoined } from "../authentication/useGetDraftsJoined";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import {
  ActionButton,
  ActionsContainer,
  CenteredMessage,
} from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import MyDraftsHeader from "./MyDraftsHeader";
import { Table, TableCell, TableHeader, TableRow } from "../ui/TableStyles";
import {
  capitalizeFirstLetter,
  formatMinutes,
  formatTime,
  formatDate,
} from "../utils/helperFunctions";

function JoinedDraftsData() {
  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);

  const {
    data: joinedDraftsData,
    isPending,
    error,
  } = useGetDraftsJoined(userId);

  if (isPending) {
    return (
      <DashboardContentContainer>
        <CenteredMessage>
          <Spinner />
        </CenteredMessage>
      </DashboardContentContainer>
    );
  }

  if (error) {
    return (
      <DashboardContentContainer>
        <h1>Error loading drafts</h1>
      </DashboardContentContainer>
    );
  }

  return (
    <>
      <MyDraftsHeader
        isMyDrafts={false}
        headerTitle="Drafts I Joined"
        marginTop="4rem"
      />
      <DashboardContentContainer>
        {joinedDraftsData.length === 0 ? (
          <h2>No drafts</h2>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader> Details </TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {joinedDraftsData.map((draft) => (
                <TableRow key={draft.id}>
                  <TableCell>
                    {draft.name} <br />
                    {formatDate(draft.draft_date)}
                    <br />
                    {formatTime(draft.draft_time)}
                    <br />
                    {capitalizeFirstLetter(draft.draft_type)} Draft
                    <br />
                    {`${formatMinutes(
                      draft.draft_time_per_pick
                    )} minute(s) per pick`}
                    <br />
                    {`${draft.number_of_teams} teams`}
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <ActionButton $customColor="var(--red-color)">
                        Leave Draft
                      </ActionButton>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </DashboardContentContainer>
    </>
  );
}

export default JoinedDraftsData;
