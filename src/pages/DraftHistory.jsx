// function imports
import { useSelector } from "react-redux";
import { useCompletedDrafts } from "../authentication/useCompletedDrafts";

// style imports
import { DashboardContentContainer } from "../styles/DashboardStyles";

// draft history style imports
import {
  ActionButton,
  CenteredMessage,
  ActionsContainer,
  DraftHistoryContentContainer,
} from "../styles/DraftHistoryStyles";

import { Table, TableHeader, TableRow, TableCell } from "../ui/TableStyles";

import StyledHeader from "../ui/StyledHeader";
import Spinner from "../ui/Spinner";
import {
  capitalizeFirstLetter,
  formatDate,
  formatMinutes,
  formatTime,
} from "../utils/helperFunctions";

function DraftHistory() {
  const userId = useSelector((state) => state.user.id);
  const { data: drafts, isPending, error } = useCompletedDrafts(userId);

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
                    <ActionButton $customColor="var(--red-color)">
                      Delete
                    </ActionButton>
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
