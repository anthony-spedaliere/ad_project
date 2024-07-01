import styled from "styled-components";

// components
import { useForm } from "react-hook-form";

import StyledContainer from "../ui/StyledContainer";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import FormRow from "../ui/FormRow";

import { useSignup } from "../authentication/useSignup";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password, username }) {
    signup(
      { email, password, username },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <>
      <FullScreenContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledContainer $width="60rem" $bgColor="var(--background-color)">
            <StyledContainer
              $bgColor="var(--background-color)"
              $rowGap="none"
              $customPadding="0rem 1rem"
            >
              <StyledHeader $fontSize="4rem" $fontWeight="400">
                Sign Up
              </StyledHeader>
            </StyledContainer>

            <FormRow
              label="Username (Username can be between 1-20 characters in length.)"
              error={errors?.username?.message}
            >
              <StyledInput
                type="text"
                id="username"
                disabled={isPending}
                {...register("username", {
                  required: "This field is required.",
                  minLength: {
                    value: 1,
                    message: "Username must be between 1 and 20 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be between 1 and 20 characters.",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
              <StyledInput
                type="email"
                id="email"
                disabled={isPending}
                {...register("email", {
                  required: "This field is required.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address.",
                  },
                })}
              />
            </FormRow>

            <FormRow
              label="Confirm Email"
              error={errors?.confirmEmail?.message}
            >
              <StyledInput
                type="email"
                id="confirmEmail"
                disabled={isPending}
                {...register("confirmEmail", {
                  required: "This field is required.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address.",
                  },
                  validate: (value) =>
                    value === getValues().email || "Emails need to match.",
                })}
              />
            </FormRow>

            <FormRow
              label="Password (Minimum of 8 characters.)"
              error={errors?.password?.message}
            >
              <StyledInput
                type="password"
                id="password"
                disabled={isPending}
                {...register("password", {
                  required: "This field is required.",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters.",
                  },
                })}
              />
            </FormRow>

            <FormRow
              label="Confirm Password"
              error={errors?.confirmPassword?.message}
            >
              <StyledInput
                type="password"
                id="confirmPassword"
                disabled={isPending}
                {...register("confirmPassword", {
                  required: "This field is required.",
                  validate: (value) =>
                    value === getValues().password ||
                    "Passwords need to match.",
                })}
              />
            </FormRow>

            <FormRow>
              <StyledButton
                $bgColor="var(--brand-color)"
                $textColor="var(--background-color)"
                $hoverBgColor="#B5B3DE"
                $marginTop="2rem"
                disabled={isPending}
              ></StyledButton>
              <StyledButton
                $bgColor="var(--brand-color)"
                $textColor="var(--background-color)"
                $hoverBgColor="#B5B3DE"
                $marginTop="2rem"
                type="reset"
                disabled={isPending}
              >
                Cancel
              </StyledButton>
            </FormRow>
          </StyledContainer>
        </form>
      </FullScreenContainer>
    </>
  );
}

export default SignupForm;
