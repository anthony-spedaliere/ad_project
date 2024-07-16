import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setGroups } from "../store/slices/newDraftSlice";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
  const [showGroups, setShowGroups] = useState(false); // State for checkbox
  const [groupCount, setGroupCount] = useState(0);

  //**
  const [teamCount, setTeamCount] = useState(0);
  const groupNames = useSelector((state) => state.newDraft.groups);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    register,
  } = useForm({
    defaultValues: {
      groups: [],
    },
  });

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
    setShowGroups(e.target.checked);
    if (!e.target.checked) {
      setGroupCount(0);
      setValue("groupCount", 0);
      clearErrors("groupCount");
    }
  };

  const handleGroupCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGroupCount(value);
  };

  // **
  const handleTeamCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTeamCount(value);
  };

  const groupInputs = Array.from({ length: groupCount }).map((_, index) => (
    <FormRow key={index} customPadding="0" label={`Group ${index + 1} Name`}>
      <StyledInput
        type="text"
        $bgColor="var(--brand-color)"
        height="4rem"
        {...register(`group${index + 1}`, {
          required: true,
          onChange: (e) => {
            const currentGroups = watch("groups") || [];
            const updatedGroups = [...currentGroups];
            updatedGroups[index] = e.target.value;
            setValue("groups", updatedGroups);
            dispatch(setGroups(updatedGroups));
          },
        })}
      />
    </FormRow>
  ));

  const teamRows = Array.from({ length: teamCount }).map((_, index) => (
    <TeamRowContainer key={index}>
      <StyledInput
        type="text"
        $bgColor="var(--brand-color)"
        height="4rem"
        $flex="1"
        placeholder={`Team ${index + 1} Name`}
        {...register(`team${index + 1}Name`, { required: true })}
      />
      <StyledInput
        type="number"
        $bgColor="var(--brand-color)"
        height="4rem"
        $flex="1"
        value={index + 1}
        disabled
      />
      <StyledSelect $flex="1" {...register(`team${index + 1}Group`)}>
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
                onChange={handleCheckboxChange}
              >
                Add Groups
              </StyledCheckbox>

              {showGroups && (
                <>
                  <FormRow
                    customPadding="2rem 0"
                    label="Number of Groups (max. of 10 group allowed)"
                  >
                    <Controller
                      name="groupCount"
                      control={control}
                      render={({ field }) => (
                        <StyledSelect
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleGroupCountChange(e);
                          }}
                          value={field.value}
                        >
                          {Array.from({ length: 11 }).map((_, index) => (
                            <option key={index} value={index}>
                              {index}
                            </option>
                          ))}
                        </StyledSelect>
                      )}
                    />
                  </FormRow>

                  {groupInputs}
                </>
              )}
            </div>
            <div>
              <StyledHeader
                $textDecoration="underline"
                $fontSize="2rem"
                $fontWeight="100"
              >
                Teams
              </StyledHeader>
              <StyledHeader
                $fontSize="1.5rem"
                $fontWeight="100"
                $mgBottom="1rem"
              >
                Add teams who will participate in the draft.
              </StyledHeader>
              <FormRow label="Number of Teams (max. of 20 Teams allowed)">
                <StyledInput
                  type="number"
                  $bgColor="var(--brand-color)"
                  height="4rem"
                  onChange={handleTeamCountChange}
                  onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling with mouse wheel
                />
              </FormRow>
              <TeamContainer>
                <TeamHeader>
                  <TeamHeaderItem>Team Name</TeamHeaderItem>
                  <TeamHeaderItem>Draft Priority</TeamHeaderItem>
                  <TeamHeaderItem>Group</TeamHeaderItem>
                </TeamHeader>
                {teamRows}
              </TeamContainer>
            </div>
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
