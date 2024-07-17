import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setGroups,
  setNumGroups,
  setShouldAddGroups,
  setNumTeams,
  setTeams,
  updateTeam,
} from "../store/slices/newDraftSlice";
import { useNavigate } from "react-router-dom";
// styles
import {
  LeaveButton,
  NewDraftContainer,
  ProgressBarContainer,
  SubContainer,
  NewDraftFormContainer,
  TeamContainer,
  TeamHeader,
  TeamHeaderItem,
  TeamRowContainer,
  ButtonContainer,
  CustomSpan,
} from "../styles/MyDraftStyles";
import ProgressBar from "../components/ProgressBar";
import CustomModal from "../ui/CustomModal";
import StyledHeader from "../ui/StyledHeader";
import StyledCheckbox from "../ui/StyledCheckbox";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import StyledSelect from "../components/StyledSelect";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StyledButton from "../ui/StyledButton";

function NewDraftPageTwo() {
  const dispatch = useDispatch();
  //modal
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  //**
  const [teamCount, setTeamCount] = useState(0);
  const groupNames = useSelector((state) => state.newDraft.groups);
  const shouldAddGroups = useSelector(
    (state) => state.newDraft.shouldAddGroups
  );
  const numGroups = useSelector((state) => state.newDraft.numGroups);
  const groups = useSelector((state) => state.newDraft.groups);
  const numTeams = useSelector((state) => state.newDraft.numTeams);
  const teams = useSelector((state) => state.newDraft.teams);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  const handleClickNext = () => {
    navigate("/new-draft-three");
  };

  const handleClickPrev = () => {
    navigate("/new-draft-one");
  };

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(2));
  }, [dispatch]);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    dispatch(setShouldAddGroups(isChecked)); // Dispatch the action
    if (!isChecked) {
      dispatch(setNumGroups(0)); // Reset numGroups in Redux state
    }
  };

  const handleGroupCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setNumGroups(isNaN(value) ? 0 : value)); // Update numGroups in Redux state
  };

  // Handle group name change
  const handleGroupNameChange = (index, value) => {
    const updatedGroups = [...groups];
    updatedGroups[index] = value;
    dispatch(setGroups(updatedGroups));
  };

  const handleTeamCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setNumTeams(isNaN(value) ? 0 : value));
    dispatch(
      setTeams(
        Array.from({ length: isNaN(value) ? 0 : value }, () => ({
          teamName: "",
          draftPriority: 0,
          groupOfTeam: "",
        }))
      )
    );
  };

  const handleTeamDetailChange = (index, key, value) => {
    dispatch(updateTeam({ index, key, value }));
  };

  const groupInputs = Array.from({ length: numGroups }).map((_, index) => (
    <FormRow key={index} customPadding="0" label={`Group ${index + 1} Name`}>
      <StyledInput
        type="text"
        $bgColor="var(--brand-color)"
        height="4rem"
        value={groups[index] || ""}
        onChange={(e) => handleGroupNameChange(index, e.target.value)}
      />
    </FormRow>
  ));

  const teamRows = Array.from({ length: numTeams }).map((_, index) => (
    <TeamRowContainer key={index}>
      <StyledInput
        type="text"
        id={`teamName${index}`}
        $bgColor="var(--brand-color)"
        height="4rem"
        $flex="1"
        placeholder={`Team ${index + 1} Name`}
        value={teams[index]?.teamName || ""}
        onChange={(e) =>
          handleTeamDetailChange(index, "teamName", e.target.value)
        }
      />
      <StyledInput
        type="number"
        id={`draftPriority${index}`}
        $bgColor="var(--brand-color)"
        height="4rem"
        $flex="1"
        value={index + 1}
        // value={teams[index]?.draftPriority || 0}
        onChange={(e) =>
          handleTeamDetailChange(
            index,
            "draftPriority",
            parseInt(e.target.value, 10)
          )
        }
        disabled
      />
      <StyledSelect
        $flex="1"
        value={teams[index]?.groupOfTeam || ""}
        onChange={(e) =>
          handleTeamDetailChange(index, "groupOfTeam", e.target.value)
        }
      >
        {groupNames.length > 0 ? (
          groupNames.map((group, i) => (
            <option key={i} value={group}>
              {group}
            </option>
          ))
        ) : (
          <option value="">No groups</option>
        )}
      </StyledSelect>
    </TeamRowContainer>
  ));

  return (
    <NewDraftContainer>
      <LeaveButton onClick={showModal}>Leave Draft Creation</LeaveButton>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
      <NewDraftFormContainer>
        <form>
          <SubContainer>
            <div>
              <StyledHeader
                $textDecoration="underline"
                $fontSize="2rem"
                $fontWeight="100"
              >
                Groups
              </StyledHeader>
              <StyledHeader
                $fontSize="1.5rem"
                $fontWeight="100"
                $mgBottom="1rem"
              >
                Use the groups section to categorize teams (i.e. Group A, Group
                B, etc.)
              </StyledHeader>

              <StyledCheckbox
                marginBottom="0"
                textColor="var(--brand-color)"
                fontWeight="100"
                checked={shouldAddGroups}
                onChange={handleCheckboxChange}
              >
                Add Groups
              </StyledCheckbox>

              {shouldAddGroups && (
                <>
                  <FormRow
                    customPadding="2rem 0"
                    label="Number of Groups (max. of 10 group allowed)"
                  >
                    <StyledInput
                      type="number"
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      min={1}
                      max={10}
                      value={numGroups || ""} // Set value from Redux state
                      onChange={handleGroupCountChange}
                    />
                  </FormRow>
                  {groupInputs}
                </>
              )}
            </div>
            <TeamContainer>
              <FormRow label="Number of Teams">
                <StyledInput
                  type="number"
                  $bgColor="var(--brand-color)"
                  height="4rem"
                  value={numTeams || ""}
                  onChange={handleTeamCountChange}
                />
              </FormRow>
              <TeamHeader>
                <TeamHeaderItem>Team Name</TeamHeaderItem>
                <TeamHeaderItem>Team Number</TeamHeaderItem>
                <TeamHeaderItem>Group</TeamHeaderItem>
              </TeamHeader>
              {teamRows}
            </TeamContainer>
          </SubContainer>
        </form>
        <ButtonContainer $marginTop="4rem" $justifyContent="space-between">
          <StyledButton
            $bgColor="var(--brand-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--brand-color-dark)"
            height="4rem"
            width="20rem"
            onClick={handleClickPrev}
          >
            <CustomSpan $justifyContent="center">
              <MdKeyboardArrowLeft /> Prev
            </CustomSpan>
          </StyledButton>
          <StyledButton
            $bgColor="var(--brand-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--brand-color-dark)"
            height="4rem"
            width="20rem"
            onClick={handleClickNext}
          >
            <CustomSpan $justifyContent="center">
              Next <MdKeyboardArrowRight />
            </CustomSpan>
          </StyledButton>
        </ButtonContainer>
      </NewDraftFormContainer>
      <CustomModal
        title="Leave Draft Creation"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        bgColor="var(--background-color)"
        textColor="var(--brand-color)"
        okBgColor="var(--red-color)"
        okTextColor="var(--background-color)"
        cancelTextColor="var(--background-color)"
        headerBgColor="var(--background-color)"
        headerTextColor="var(--red-color)"
        defaultBgColor="var(--brand-color)"
      >
        Are you sure you want to exit Draft Creation? You may lose your
        progress.
      </CustomModal>
    </NewDraftContainer>
  );
}

export default NewDraftPageTwo;
