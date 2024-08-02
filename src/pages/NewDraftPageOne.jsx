import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDraftForm,
  setCurrentPage,
  setDraftDate,
  setDraftName,
  setDraftTime,
  setDraftTimePerPick,
  setDraftType,
  setIsEditing,
  setShouldSendEmail,
} from "../store/slices/newDraftSlice";

import {
  NewDraftContainer,
  NewDraftFormContainer,
  SubContainer,
  ButtonContainer,
  CustomSpan,
} from "../styles/MyDraftStyles";
import { useNavigate } from "react-router-dom";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import {
  RadioButton,
  RadioGroup,
  RadioLabel,
} from "../components/RadioButtons";
import {
  EditDraftSaveModal,
  EditDraftCancelModal,
  LeaveDraftCreationModal,
  ResetDraftFormModal,
} from "../ui/CustomModals";
import StyledSelect from "../components/StyledSelect";
import StyledHeader from "../ui/StyledHeader";
import DatePickerComponent from "../components/DatePickerComponent";
import StyledCheckbox from "../ui/StyledCheckbox";
import StyledButton from "../ui/StyledButton";
import { MdKeyboardArrowRight } from "react-icons/md";
import NewDraftPageHeader from "../components/NewDraftPageHeader";
import EditDraftsHeader from "../components/EditDraftsHeader";
import { useDeleteDraft } from "../authentication/useDeleteDraft";
import { useSubmitNewDraft } from "../authentication/useSubmitNewDraft";

function NewDraftPageOne() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // error handling state
  const [errors, setErrors] = useState({
    draftName: "",
    draftTimePerPick: "",
    draftDate: "",
  });

  // state to track if the button has been clicked
  const [buttonClicked, setButtonClicked] = useState(false);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  // redux state
  const isEditingState = useSelector((state) => state.newDraft.isEditing); // state to manage whether in new draft mode or edit draft mode
  const currentDraftName = useSelector((state) => state.newDraft.draftName); // Get draftName from state
  const currentDraftType = useSelector((state) => state.newDraft.draftType); // get draftType from state
  const draftTimePerPick = useSelector(
    (state) => state.newDraft.draftTimePerPick
  ); // get draftTimePerPick from state
  const draftDate = useSelector((state) => state.newDraft.draftDate); // get draftDate from state
  const draftTime = useSelector((state) => state.newDraft.draftTime); //get draftTime from state
  const shouldSendEmail = useSelector(
    (state) => state.newDraft.shouldSendEmail
  ); //get shouldSendEmail from state

  // current draft being edited
  const draftInEditing = useSelector((state) => state.draft.currDraftInEditing);
  const [draftBeingEditedId, setDraftBeingEditedId] = useState(
    draftInEditing.draft_id
  );
  const { deleteDraft, isPending: deleteDraftIsPending } = useDeleteDraft();
  const { submitNewDraft, isPending: submitNewDraftIsPending } =
    useSubmitNewDraft();

  // error handling function
  const validateInputs = useCallback(() => {
    const newErrors = {};

    if (!currentDraftName) {
      newErrors.draftName = "Draft Name is required.";
    } else if (currentDraftName.length > 50) {
      newErrors.draftName = "Draft Name cannot exceed 50 characters.";
    }

    if (!draftTimePerPick) {
      newErrors.draftTimePerPick = "Draft Time Per Pick is required.";
    }

    if (!draftDate) {
      newErrors.draftDate = "Draft Date is required.";
    }

    setErrors(newErrors);

    // If there are no errors, return true, otherwise false
    return Object.keys(newErrors).length === 0;
  }, [currentDraftName, draftDate, draftTimePerPick]);

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
    handleResetDraftForm();
    handleCancelCancel();
    navigate("/dashboard/my-drafts");
    dispatch(setIsEditing(false));
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

        deleteDraft(draftBeingEditedId);
        dispatch(resetDraftForm());

        navigate("/dashboard/my-drafts");
      },
    });

    dispatch(setIsEditing(false));
  };

  //=====================================================================
  //=====================================================================

  const handleClick = () => {
    setButtonClicked(true); // Set buttonClicked to true when the button is clicked
    if (validateInputs()) {
      navigate("/new-draft-two");
    }
  };

  // Handle draft name change
  const handleDraftNameChange = (e) => {
    dispatch(setDraftName(e.target.value));
    validateInputs();
  };

  const handleDraftTypeChange = (e) => {
    dispatch(setDraftType(e.target.value));
  };

  // Handle draft time per pick change
  const handleDraftTimePerPickChange = (e) => {
    dispatch(setDraftTimePerPick(parseInt(e.target.value)));
    validateInputs();
  };

  // Handle date and time change
  const handleDateChange = useCallback(
    (date) => {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const localTimeString = date.toLocaleTimeString("en-US", {
        hour12: false,
      });
      dispatch(setDraftDate(localDate.toISOString().split("T")[0])); // Store date as ISO string (yyyy-mm-dd)
      dispatch(setDraftTime(localTimeString)); // Store time as hh:mm:ss
      validateInputs();
    },
    [dispatch, validateInputs]
  );

  // Handle should send email change
  const handleShouldSendEmailChange = (e) => {
    dispatch(setShouldSendEmail(e.target.checked));
  };

  const handleResetDraftForm = () => {
    dispatch(resetDraftForm());
  };

  // Generate time options for the dropdown
  const timeOptions = [];
  for (let i = 30; i <= 300; i += 30) {
    const minutes = Math.floor(i / 60);
    const seconds = i % 60;
    const label = minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";
    const optionLabel = `${label}${minutes > 0 && seconds > 0 ? " " : ""}${
      seconds > 0 ? `${seconds} sec${seconds > 1 ? "s" : ""}` : ""
    }`;
    timeOptions.push(
      <option key={i} value={i}>
        {optionLabel}
      </option>
    );
  }

  // Set the initial state for selected date to 00:00 if not already set
  const [selectedDate, setSelectedDate] = useState(() => {
    if (draftDate && draftTime) {
      return new Date(`${draftDate}T${draftTime}`);
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set the time to 00:00
    return now;
  });

  useEffect(() => {
    // Initialize shouldSendEmail state when component mounts
    dispatch(setShouldSendEmail(shouldSendEmail));
  }, [dispatch, shouldSendEmail]); // Only run once on mount

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (selectedDate) {
      handleDateChange(selectedDate);
    }
  }, [handleDateChange, selectedDate]);

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
            <FormRow
              customPadding="0"
              label="Draft Name (Name cannot exceed 50 characters.)"
              $error={buttonClicked && errors.draftName}
            >
              <StyledInput
                type="text"
                id="draft-name"
                width="100rem"
                $bgColor="var(--brand-color)"
                height="4rem"
                value={currentDraftName}
                onChange={handleDraftNameChange}
              />
            </FormRow>

            <div>
              <FormRow label="Draft Type" error="">
                <RadioGroup
                  onChange={handleDraftTypeChange}
                  value={currentDraftType}
                >
                  <RadioButton
                    type="radio"
                    id="standard"
                    name="draftType"
                    value="Standard"
                    defaultChecked={currentDraftType === "Standard"} // Controlled radio button
                  />
                  <RadioLabel htmlFor="standard">
                    Standard - online snake draft
                  </RadioLabel>
                  <RadioButton
                    type="radio"
                    id="autodraft"
                    name="draftType"
                    value="Autodraft"
                    defaultChecked={currentDraftType === "Autodraft"} // Controlled radio button
                  />
                  <RadioLabel htmlFor="autodraft">
                    Autodraft - online draft with auto-assigned POI&apos;s
                  </RadioLabel>
                  <RadioButton
                    type="radio"
                    id="offline"
                    name="draftType"
                    value="Offline"
                    defaultChecked={currentDraftType === "Offline"} // Controlled radio button
                  />
                  <RadioLabel htmlFor="offline">
                    Offline Draft - draft offline and enter the results
                  </RadioLabel>
                </RadioGroup>
              </FormRow>
              <h4>Learn More</h4>
            </div>

            <FormRow
              customPadding="0"
              label="Draft Time Per Pick"
              $error={buttonClicked && errors.draftTimePerPick}
            >
              <StyledSelect
                id="draft-time"
                name="draftTime"
                value={draftTimePerPick} // Controlled select value
                onChange={handleDraftTimePerPickChange} // Handle change
              >
                {timeOptions}
              </StyledSelect>
            </FormRow>

            <div>
              <FormRow
                label="Draft Schedule"
                $error={buttonClicked && errors.draftDate}
              >
                <DatePickerComponent
                  selectedDate={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </FormRow>
            </div>

            <div>
              <StyledHeader $fontSize="2rem" $fontWeight="100">
                Email Settings
              </StyledHeader>
              <StyledCheckbox
                fontWeight="100"
                textColor="var(--brand-color)"
                checked={shouldSendEmail} // Controlled checkbox value
                onChange={handleShouldSendEmailChange} // Handle change
              >
                Send email with draft results
              </StyledCheckbox>
            </div>
          </SubContainer>
        </form>
        <ButtonContainer>
          <StyledButton
            $bgColor="var(--brand-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--brand-color-dark)"
            height="4rem"
            width="20rem"
            onClick={handleClick}
          >
            <CustomSpan $justifyContent="center">
              Next <MdKeyboardArrowRight />
            </CustomSpan>
          </StyledButton>
        </ButtonContainer>
      </NewDraftFormContainer>
      <LeaveDraftCreationModal
        isModalVisible={isModalVisible}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />

      <ResetDraftFormModal
        isResetModalVisible={isResetModalVisible}
        handleResetConfirm={handleResetConfirm}
        handleResetCancel={handleResetCancel}
      />

      <EditDraftCancelModal
        isCancelModalVisible={isCancelModalVisible}
        handleCancelConfirm={handleCancelConfirm}
        handleCancelCancel={handleCancelCancel}
      />

      <EditDraftSaveModal
        isSaveModalVisible={isSaveModalVisible}
        handleSaveConfirm={handleSaveConfirm}
        handleSaveCancel={handleSaveCancel}
      />
    </NewDraftContainer>
  );
}

export default NewDraftPageOne;
