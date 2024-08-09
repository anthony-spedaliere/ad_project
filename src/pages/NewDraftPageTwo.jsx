import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setGroups,
  setNumGroups,
  setShouldAddGroups,
  setNumTeams,
  setTeams,
  updateTeam,
  resetDraftForm,
  setIsEditing,
} from "../store/slices/newDraftSlice";
import { useNavigate } from "react-router-dom";
// styles
import {
  NewDraftContainer,
  SubContainer,
  NewDraftFormContainer,
  TeamContainer,
  TeamHeader,
  TeamHeaderItem,
  TeamRowContainer,
  ButtonContainer,
  CustomSpan,
  TeamRowTeamNameContainer,
  TeamRowError,
} from "../styles/MyDraftStyles";
import CustomModal from "../ui/CustomModal";
import StyledHeader from "../ui/StyledHeader";
import StyledCheckbox from "../ui/StyledCheckbox";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import StyledSelect from "../components/StyledSelect";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StyledButton from "../ui/StyledButton";
import NewDraftPageHeader from "../components/NewDraftPageHeader";
import EditDraftsHeader from "../components/EditDraftsHeader";
import { useSubmitNewDraft } from "../authentication/useSubmitNewDraft";
import { useDeleteDraft } from "../authentication/useDeleteDraft";

function NewDraftPageTwo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // error handling state
  const [errors, setErrors] = useState({
    numGroupsError: "",
    numTeamsError: "",
    groupNamesErrors: [],
    teamNamesErrors: [],
  });

  // state to track if the button has been clicked
  const [buttonClicked, setButtonClicked] = useState(false);

  //================end of error handling state=================

  // modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  // state
  const isEditingState = useSelector((state) => state.newDraft.isEditing); // state to manage whether in new draft mode or edit draft mode
  const isEditingHistoryState = useSelector(
    (state) => state.newDraft.isEditingHistory
  );
  const groupNames = useSelector((state) => state.newDraft.groups);
  const shouldAddGroups = useSelector(
    (state) => state.newDraft.shouldAddGroups
  );
  const numGroups = useSelector((state) => state.newDraft.numGroups);
  const groups = useSelector((state) => state.newDraft.groups);
  const numTeams = useSelector((state) => state.newDraft.numTeams);
  const teams = useSelector((state) => state.newDraft.teams);

  // current draft being edited
  const draftInEditing = useSelector((state) => state.draft.currDraftInEditing);

  const { deleteDraft } = useDeleteDraft();
  const { submitNewDraft } = useSubmitNewDraft();

  // validation
  const validateInputs = useCallback(() => {
    const newErrors = {
      numGroupsError: "",
      numTeamsError: "",
      groupNamesErrors: [],
      teamNamesErrors: [],
    };

    let isValid = true;

    if (shouldAddGroups) {
      if (!numGroups) {
        newErrors.numGroupsError = "This field is required.";
        isValid = false;
      } else if (numGroups < 0 || numGroups > 6) {
        newErrors.numGroupsError = "Number of groups must be between 1 and 6.";
        isValid = false;
      }

      for (let i = 0; i < numGroups; i++) {
        if (!groups[i]) {
          newErrors.groupNamesErrors[i] = "This field is required.";
          isValid = false;
        } else if (groups[i].length > 20) {
          newErrors.groupNamesErrors[i] = "Cannot exceed 20 characters.";
          isValid = false;
        }
      }
    }

    if (numTeams <= 0) {
      newErrors.numTeamsError = "Cannot have zero or negative number of teams.";
      isValid = false;
    } else if (numTeams > 30) {
      newErrors.numTeamsError = "Number of teams must be between 1 and 30.";
      isValid = false;
    }

    for (let i = 0; i < numTeams; i++) {
      if (!teams[i]?.teamName) {
        newErrors.teamNamesErrors[i] = "This field is required."; // add team name error
        isValid = false;
      } else if (teams[i].teamName.length > 30) {
        newErrors.teamNamesErrors[i] = "Team name cannot exceed 30 characters."; // add team name error
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  }, [groups, numGroups, numTeams, shouldAddGroups, teams]);

  // Exit Modal functions
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  //=====================================================================
  //=====================================================================

  // Reset Modal functions

  const showResetModal = () => {
    setIsResetModalVisible(true);
  };

  const handleResetCancel = () => {
    setIsResetModalVisible(false);
  };

  const handleResetConfirm = () => {
    handleResetDraftForm();
    handleResetCancel();
  };

  const handleResetDraftForm = () => {
    dispatch(resetDraftForm());
    navigate("/new-draft-one");
  };

  //=====================================================================
  //=====================================================================

  // Cancel Modal functions
  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
  };

  const handleCancelConfirm = () => {
    // handleResetDraftForm();
    handleCancelCancel();
    if (isEditingHistoryState) {
      navigate("/dashboard/draft-history");
    } else {
      navigate("/dashboard/my-drafts");
    }
  };

  //=====================================================================
  //=====================================================================

  // Save Modal functions
  const showSaveModal = () => {
    setIsSaveModalVisible(true);
  };

  const handleSaveCancel = () => {
    setIsSaveModalVisible(false);
  };

  const handleSaveConfirm = () => {
    submitNewDraft(undefined, {
      onSuccess: () => {
        handleSaveCancel();

        if (!draftInEditing.is_draft_complete) {
          deleteDraft(draftInEditing.draft_id);
        }
        dispatch(resetDraftForm());

        navigate("/dashboard/my-drafts");
      },
    });

    dispatch(setIsEditing(false));
  };

  //=====================================================================
  //=====================================================================

  const handleClickNext = () => {
    setButtonClicked(true);
    if (validateInputs()) {
      navigate("/new-draft-three");
    }
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
      dispatch(setGroups([])); // Clear groups in Redux state
    }
  };

  const handleGroupCountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      dispatch(setGroups([])); // Clear groups if value is erased
    }
    if (value >= 0 && value <= 6) {
      dispatch(setNumGroups(isNaN(value) ? 0 : value)); // Update numGroups in Redux state
      if (!value || value === 0) {
        dispatch(setGroups([])); // Clear groups if value is 0
      }
    }

    if (shouldAddGroups) {
      validateInputs();
    }
  };

  // Handle group name change
  const handleGroupNameChange = (index, value) => {
    const updatedGroups = [...groups];
    updatedGroups[index] = value;
    dispatch(setGroups(updatedGroups));

    // Update group names in teams
    const updatedTeams = teams.map((team) => {
      if (team.groupOfTeam === groups[index]) {
        return { ...team, groupOfTeam: value };
      }
      return team;
    });
    dispatch(setTeams(updatedTeams));
  };

  // Initialize teams with default values
  const handleTeamCountChange = (e) => {
    const value = e.target.value;

    if (value >= 0 && value <= 30) {
      dispatch(setNumTeams(isNaN(value) ? 0 : value));
      dispatch(
        setTeams(
          Array.from({ length: isNaN(value) ? 0 : value }, (_, index) => ({
            teamName: "",
            draftPriority: index + 1, // Set draftPriority to index + 1
            groupOfTeam: groupNames.length > 0 ? groupNames[0] : "No group", // Set groupOfTeam to the first group
          }))
        )
      );
    }
    validateInputs();
  };

  const handleTeamDetailChange = (index, key, value) => {
    dispatch(updateTeam({ index, key, value }));
  };

  const groupInputs = Array.from({ length: numGroups }).map((_, index) => (
    <FormRow
      key={index}
      customPadding="0"
      label={`Group ${
        index + 1
      } Name (Group name cannot exceed 20 characters.)`}
      $error={buttonClicked && errors.groupNamesErrors[index]}
    >
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
      <TeamRowTeamNameContainer $flex="1">
        <StyledInput
          type="text"
          id={`teamName${index}`}
          $bgColor="var(--brand-color)"
          height="4rem"
          width="100%"
          placeholder={`Team ${index + 1} Name`}
          value={teams[index]?.teamName || ""}
          onChange={(e) =>
            handleTeamDetailChange(index, "teamName", e.target.value)
          }
        />
        <TeamRowError>
          {buttonClicked && errors.teamNamesErrors[index]}
        </TeamRowError>
      </TeamRowTeamNameContainer>

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
        value={
          teams[index]?.groupOfTeam ||
          (groupNames.length > 0 ? groupNames[0] : "No group")
        }
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
          <option value="No group">No group</option>
        )}
      </StyledSelect>
    </TeamRowContainer>
  ));

  return (
    <NewDraftContainer>
      {!isEditingState ? (
        <NewDraftPageHeader
          showExitModal={showModal}
          showResetModal={showResetModal}
        />
      ) : (
        <EditDraftsHeader
          showCancelModal={showCancelModal}
          showSaveModal={showSaveModal}
        />
      )}

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
                    label="Number of Groups (max. of 6 group allowed)"
                    $error={buttonClicked && errors.numGroupsError}
                  >
                    <StyledInput
                      type="number"
                      $bgColor="var(--brand-color)"
                      height="4rem"
                      value={numGroups || ""} // Set value from Redux state
                      onChange={handleGroupCountChange}
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                    />
                  </FormRow>
                  {groupInputs}
                </>
              )}
            </div>
            <TeamContainer>
              <FormRow
                label="Number of Teams (max. of 30 teams allowed)"
                $error={buttonClicked && errors.numTeamsError}
              >
                <StyledInput
                  type="number"
                  $bgColor="var(--brand-color)"
                  height="4rem"
                  value={numTeams || ""}
                  onChange={handleTeamCountChange}
                  onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                />
              </FormRow>
              {numTeams ? (
                <TeamHeader>
                  <TeamHeaderItem>Team Name</TeamHeaderItem>
                  <TeamHeaderItem>Draft Priority</TeamHeaderItem>
                  <TeamHeaderItem>Group</TeamHeaderItem>
                </TeamHeader>
              ) : (
                <></>
              )}
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
      <CustomModal
        title="Reset New Draft Form"
        open={isResetModalVisible}
        onOk={handleResetConfirm}
        onCancel={handleResetCancel}
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
        Are you sure you want to reset the new draft form? This will reset all
        your progress.
      </CustomModal>
      <CustomModal
        title="Edit Draft"
        open={isCancelModalVisible}
        onOk={handleCancelConfirm}
        onCancel={handleCancelCancel}
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
        Are you sure you want to leave edit draft mode?
      </CustomModal>
      <CustomModal
        title="Save Changes"
        open={isSaveModalVisible}
        onOk={handleSaveConfirm}
        onCancel={handleSaveCancel}
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
        Please confirm you want to save changes.
      </CustomModal>
    </NewDraftContainer>
  );
}

export default NewDraftPageTwo;
