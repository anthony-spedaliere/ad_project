import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";
import {
  NewDraftContainer,
  LeaveButton,
  ProgressBarContainer,
  NewDraftFormContainer,
  SubContainer,
  ButtonContainer,
  CustomSpan,
} from "../styles/MyDraftStyles";
import CustomModal from "../ui/CustomModal";
import { useNavigate } from "react-router-dom";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import {
  RadioButton,
  RadioGroup,
  RadioLabel,
} from "../components/RadioButtons";
import StyledSelect from "../components/StyledSelect";
import StyledHeader from "../ui/StyledHeader";
import DatePickerComponent from "../components/DatePickerComponent";
import StyledCheckbox from "../ui/StyledCheckbox";
import StyledButton from "../ui/StyledButton";
import { MdKeyboardArrowRight } from "react-icons/md";

function NewDraftPageOne() {
  const dispatch = useDispatch();
  //modal
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  const handleClick = () => {
    navigate("/new-draft-two");
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

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  // Set the initial state for selected date to 00:00
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set the time to 00:00
    return now;
  });

  return (
    <NewDraftContainer>
      <LeaveButton onClick={showModal}>Leave Draft Creation</LeaveButton>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
      <NewDraftFormContainer>
        <form>
          <SubContainer>
            <FormRow customPadding="0" label="Draft Name">
              <StyledInput
                type="text"
                id="draft-name"
                width="100rem"
                $bgColor="var(--brand-color)"
                height="4rem"
              />
            </FormRow>

            <div>
              <FormRow label="Draft Type">
                <RadioGroup>
                  <RadioButton
                    type="radio"
                    id="standard"
                    name="draftType"
                    value="Standard"
                  />
                  <RadioLabel htmlFor="standard">
                    Standard - online snake draft
                  </RadioLabel>
                  <RadioButton
                    type="radio"
                    id="autodraft"
                    name="draftType"
                    value="Autodraft"
                  />
                  <RadioLabel htmlFor="autodraft">
                    Autodraft - online draft with auto-assigned POI&apos;s
                  </RadioLabel>
                  <RadioButton
                    type="radio"
                    id="offline"
                    name="draftType"
                    value="Offline"
                  />
                  <RadioLabel htmlFor="offline">
                    Offline Draft - draft offline and enter the results
                  </RadioLabel>
                </RadioGroup>
              </FormRow>
              <h4>Learn More</h4>
            </div>

            <FormRow customPadding="0" label="Draft Time Per Pick">
              <StyledSelect id="draft-time" name="draftTime">
                {timeOptions}
              </StyledSelect>
            </FormRow>

            <div>
              <FormRow label="Draft Date and Time">
                <DatePickerComponent
                  selectedDate={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </FormRow>
              {/* <StyledCheckbox textColor="var(--brand-color)">
            Draft Now
            </StyledCheckbox> */}
            </div>

            <div>
              <StyledHeader $fontSize="2rem" $fontWeight="100">
                Email Settings
              </StyledHeader>
              <StyledCheckbox fontWeight="100" textColor="var(--brand-color)">
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

export default NewDraftPageOne;
