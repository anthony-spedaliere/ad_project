import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
// styles
import {
  LeaveButton,
  NewDraftContainer,
  ProgressBarContainer,
  SubContainer,
  NewDraftFormContainer,
} from "../styles/MyDraftStyles";
import ProgressBar from "../components/ProgressBar";
import CustomModal from "../ui/CustomModal";
import StyledHeader from "../ui/StyledHeader";
import StyledCheckbox from "../ui/StyledCheckbox";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";

function NewDraftPageTwo() {
  const dispatch = useDispatch();
  //modal
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showGroups, setShowGroups] = useState(false); // State for checkbox
  const [groupCount, setGroupCount] = useState(0);
  const {
    control,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    register,
  } = useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(2));
  }, [dispatch]);

  const handleCheckboxChange = (e) => {
    setShowGroups(e.target.checked);
    if (!e.target.checked) {
      setGroupCount(0);
      clearErrors("groupCount");
    }
  };

  const handleGroupCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 10) {
      setValue("groupCount", 10);
    } else if (value < 0) {
      setValue("groupCount", 0);
    } else {
      setGroupCount(value);
    }
  };

  const groupInputs = Array.from({ length: groupCount }).map((_, index) => (
    <FormRow key={index} customPadding="0" label={`Group ${index + 1} Name`}>
      <StyledInput
        type="text"
        $bgColor="var(--brand-color)"
        height="4rem"
        {...register(`group${index + 1}`, { required: true })}
      />
    </FormRow>
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
              <StyledHeader $fontSize="2rem" $fontWeight="100">
                Groups
              </StyledHeader>
              <p>
                Use the group section to organize teams into groups (i.e. Group
                A, Group B, etc.)
              </p>
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
                      defaultValue={0}
                      render={({ field }) => (
                        <StyledInput
                          type="number"
                          $bgColor="var(--brand-color)"
                          height="4rem"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleGroupCountChange(e);
                          }}
                          value={field.value}
                        />
                      )}
                    />
                  </FormRow>
                  {groupInputs}
                </>
              )}
            </div>
          </SubContainer>
        </form>
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
