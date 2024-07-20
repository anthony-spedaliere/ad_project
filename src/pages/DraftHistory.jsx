// function imports
import { useSelector } from "react-redux";
import { useCompletedDrafts } from "../authentication/useCompletedDrafts";

// style imports
import { DashboardContentContainer } from "../styles/DashboardStyles";

// draft history style imports
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  CenteredMessage,
  ActionsContainer,
  DraftHistoryContentContainer,
} from "../styles/DraftHistoryStyles";

import StyledHeader from "../ui/StyledHeader";
import Spinner from "../ui/Spinner";

function DraftHistory() {
  const userId = useSelector((state) => state.user.id);
  const { data: drafts, isPending, error } = useCompletedDrafts(userId);

  // Format date to MM/DD/YYYY
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to HH:MM PM/AM
  const formatTime = (timeString) => {
    const [time] = timeString.split("-");
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(seconds));
    let formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedTime;
  };

  // Convert seconds to minutes
  const formatMinutes = (seconds) => (seconds / 60).toFixed(1);

  // Capitalize first letter
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

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

  if (drafts.length === 0) {
    return (
      <DashboardContentContainer>
        <CenteredMessage>No draft history</CenteredMessage>
      </DashboardContentContainer>
    );
  }

  return (
    <DashboardContentContainer>
      <DraftHistoryContentContainer>
        <StyledHeader $fontSize="4rem" $mgBottom="4rem">
          Draft History
        </StyledHeader>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Draft Details</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {drafts.map((draft) => (
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
                    <ActionButton>View Results</ActionButton>
                    <ActionButton>Redraft</ActionButton>
                  </ActionsContainer>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </DraftHistoryContentContainer>
    </DashboardContentContainer>
  );
}

export default DraftHistory;
