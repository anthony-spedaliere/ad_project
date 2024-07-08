import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import StyledHeader from "../ui/StyledHeader";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateEmail } from "../authentication/useUpdateEmail";
import { setUserEmail } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomModal from "../ui/CustomModal";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
  background-color: ${(props) => props.$bgColor || "none"};
  height: ${(props) => props.$height || "none"};
  border-radius: ${(props) => props.borderRadius || "2rem"};
  border: none;
`;

function ChangeUserEmailForm() {
  const dispatch = useDispatch();
  const currentEmail = useSelector((state) => state.user.email);

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { updateUserEmail } = useUpdateEmail();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // change email
  const onSubmit = async (data) => {
    const { email } = data;

    try {
      if (email === currentEmail) {
        toast.error("Input a new email to make a change.");
        return;
      }

      // Update the email
      if (email !== currentEmail) {
        await updateUserEmail(email);
        dispatch(setUserEmail(email)); // Update Redux state
        toast.success("User email updated successfully.");
      }

      handleCancel();
      reset();
    } catch (error) {
      toast.error(`There was an error updating your email: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        showModal();
      }}
    >
      <StyledHeader $fontSize="4rem">Change Email</StyledHeader>
      <p>
        Note: You must confirm email changes by clicking the link in the email
        sent to BOTH your previous email AND the updated email. Check your
        inboxes, spam inboxes, etc.
      </p>
      <FormRow label="Email" error={errors?.email?.message}>
        <StyledInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentEmail}
          {...register("email")}
        />
      </FormRow>
      <Container>
        <StyledButton
          $flex="1"
          $marginLeft="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
          type="submit"
        >
          Save
        </StyledButton>
        <StyledButton
          $flex="1"
          $marginRight="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
          type="reset"
        >
          Reset
        </StyledButton>
        <CustomModal
          title="Change Email"
          open={isModalVisible}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          okText="Confirm"
          cancelText="Cancel"
          bgColor="var(--background-color)"
          textColor="var(--brand-color)"
          okBgColor="var(--blue-color)"
          okTextColor="var(--color-grey-200)"
          cancelTextColor="var(--background-color)"
          headerBgColor="var(--background-color)"
          headerTextColor="var(--brand-color)"
          defaultBgColor="var(--brand-color)"
        >
          Please confirm you want to make this change.
        </CustomModal>
      </Container>
    </form>
  );
}

export default ChangeUserEmailForm;
