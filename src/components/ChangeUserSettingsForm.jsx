import FormRow from "../ui/FormRow";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateEmail } from "../authentication/useUpdateEmail";
import { useUpdateUsername } from "../authentication/useUpdateUsername";
import { setUserEmail, setUserUsername } from "../store/slices/userSlice";
import toast from "react-hot-toast";

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

function ChangeUserSettingsForm() {
  const dispatch = useDispatch();
  const currentUsername = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);
  const currentEmail = useSelector((state) => state.user.email);

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { updateUserEmail } = useUpdateEmail();
  const { updateUsername } = useUpdateUsername();

  const onSubmit = async (data) => {
    const { username, email } = data;

    try {
      // Update the email
      if (email !== currentEmail) {
        await updateUserEmail(email);
        dispatch(setUserEmail(email)); // Update Redux state
      }

      // Update the username
      if (username !== currentUsername) {
        await updateUsername({ userId, newUsername: username });
        dispatch(setUserUsername(username)); // Update Redux state
      }

      toast.success("User settings updated successfully.");
      reset();
    } catch (error) {
      toast.error(`There was an error updating the settings: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledHeader $fontSize="4rem">User Settings</StyledHeader>
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
          onClick={() => reset()}
        >
          Cancel
        </StyledButton>
      </Container>
    </form>
  );
}

export default ChangeUserSettingsForm;
