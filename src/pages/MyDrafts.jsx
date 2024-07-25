// style importsimport { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useUncompletedDrafts } from "../authentication/useUncompletedDrafts";
import { DashboardContentContainer } from "../styles/DashboardStyles";
import {
  ActionButton,
  ActionsContainer,
  CenteredMessage,
} from "../styles/DraftHistoryStyles";
import Spinner from "../ui/Spinner";
import MyDraftsHeader from "../components/MyDraftsHeader";
import { Table, TableCell, TableHeader, TableRow } from "../ui/TableStyles";

import {
  capitalizeFirstLetter,
  formatMinutes,
  formatTime,
  formatDate,
} from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { setIsEditing } from "../store/slices/newDraftSlice";

function MyDrafts() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const { data: drafts, isPending, error } = useUncompletedDrafts(userId);
  const navigate = useNavigate();

  function handleClickEdit() {
    dispatch(setIsEditing(true));
    navigate("/new-draft-one");
  }

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
      <>
        <MyDraftsHeader />
        <DashboardContentContainer>
          <CenteredMessage>No drafts</CenteredMessage>
        </DashboardContentContainer>
      </>
    );
  }

  return (
    <>
      <MyDraftsHeader />
      <DashboardContentContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Draft Details</TableHeader>
              <TableHeader>Draft Link</TableHeader>
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
                <TableCell>www.draftapex.com/4dsDc!SW%#21</TableCell>
                <TableCell>
                  <ActionsContainer>
                    <ActionButton>Start Now</ActionButton>
                    <ActionButton onClick={handleClickEdit}>Edit</ActionButton>
                    <ActionButton $customColor="var(--red-color)">
                      Delete
                    </ActionButton>
                  </ActionsContainer>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </DashboardContentContainer>
    </>
  );
}

export default MyDrafts;
