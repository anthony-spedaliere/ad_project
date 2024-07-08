import FormRow from "../ui/FormRow";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateUsername } from "../authentication/useUpdateUsername";
import { setUserUsername } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { isUsernameUnique } from "../services/apiUsernames";
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

function ChangeUserUsernameForm() {
  const dispatch = useDispatch();
  const currentUsername = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { updateUsername } = useUpdateUsername();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // change username
  const onSubmit = async (data) => {
    const { username } = data;

    try {
      if (!(await isUsernameUnique(username))) {
        throw new Error("Username is already taken.");
      }

      if (username === currentUsername) {
        toast.error("Input a new username to make a change.");
        return;
      }

      if (username !== currentUsername) {
        // Update the username
        if (username !== currentUsername) {
          await updateUsername({ userId, newUsername: username });
          dispatch(setUserUsername(username)); // Update Redux state
        }

        toast.success("Your username was updated successfully.");
      }

      handleCancel();
      reset();
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        showModal();
      }}
    >
      <StyledHeader $fontSize="4rem">Change Username</StyledHeader>
      <FormRow
        label="Username (Username can be between 1-20 characters in length.)"
        error={errors?.username?.message}
      >
        <StyledInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUsername}
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 1,
              message: "Username must be at least 1 character",
            },
            maxLength: {
              value: 20,
              message: "Username cannot exceed 20 characters",
            },
          })}
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
          title="Change Username"
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

export default ChangeUserUsernameForm;
