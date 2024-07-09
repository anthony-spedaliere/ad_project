import FormRow from "../ui/FormRow";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../authentication/useUpdatePassword";
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

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { updateUserPassword, isPending } = useUpdatePassword();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await updateUserPassword(data.newPassword);
      toast.success("Password updated successfully.");
      reset();
      handleCancel();
    } catch (error) {
      toast.error(`Error updating password: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (data.newPassword !== data.confirmNewPassword) {
          toast.error("Passwords do not match.");
          return;
        }
        showModal();
      })}
    >
      <StyledHeader $fontSize="4rem">Change Password</StyledHeader>
      <FormRow
        label="New Password (Minimum of 8 characters.)"
        error={errors?.newPassword?.message}
      >
        <StyledInput
          type="password"
          id="newPassword"
          placeholder="New password"
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm New Password"
        error={errors?.confirmNewPassword?.message}
      >
        <StyledInput
          type="password"
          id="confirmNewPassword"
          placeholder="Confirm new password"
          {...register("confirmNewPassword", {
            required: "Please confirm your password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>
      <Container>
        <StyledButton
          $flex="1"
          $marginRight="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
          type="submit"
          disabled={isPending}
        >
          Submit
        </StyledButton>
        <CustomModal
          title="Change Password"
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

export default ChangePasswordForm;
