import styled from "styled-components";

// components
import { useForm } from "react-hook-form";

import StyledContainer from "../ui/StyledContainer";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import FormRow from "../ui/FormRow";

import { useSignup } from "../authentication/useSignup";

// Email regex: /\S+@\S+\.\S+/

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ username, email, password }) {
    signup(
      { username, email, password },
      {
        onSettled: reset,
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

            <FormRow label="Username" error={errors?.username?.message}>
              <StyledInput
                type="text"
                id="username"
                disabled={isPending}
                {...register("username", {
                  required: "This field is required.",
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
              label="Password (minimum of 8 characters)"
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

{
  /* <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader
                $fontSize="2rem"
                $fontWeight="400"
                // error={errors?.username?.message}
              >
                Username
              </StyledHeader>
              <StyledInput
                type="text"
                id="username"
                {...register("username", {
                  required: "This field is required.",
                })}
              />
            </StyledContainer> */
}

{
  /* <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
  <StyledHeader $fontSize="2rem" $fontWeight="400">
    Email
  </StyledHeader>
  <StyledInput
    type="email"
    id="email"
    {...register("email", {
      required: "This field is required.",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please provide a valid email address.",
      },
    })}
  />
</StyledContainer>

<StyledContainer $bgColor="var(--background-color)" $rowGap="none">
  <StyledHeader $fontSize="2rem" $fontWeight="400">
    Confirm Email
  </StyledHeader>
  <StyledInput
    type="email"
    id="confirmEmail"
    {...register("confirmEmail", {
      required: "This field is required.",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please provide a valid email address.",
      },
    })}
  />
</StyledContainer>

<StyledContainer $bgColor="var(--background-color)" $rowGap="none">
  <StyledHeader $fontSize="2rem" $fontWeight="400">
    {"Password (minimum of 8 characters)"}
  </StyledHeader>
  <StyledInput
    type="password"
    id="password"
    {...register("password", {
      required: "This field is required.",
      minLength: {
        value: 8,
        message: "Password needs a minimum of 8 characters.",
      },
    })}
  />
</StyledContainer>

<StyledContainer $bgColor="var(--background-color)" $rowGap="none">
  <StyledHeader $fontSize="2rem" $fontWeight="400">
    Confirm Password
  </StyledHeader>
  <StyledInput
    type="password"
    id="confirmPassword"
    {...register("confirmPassword", {
      required: "This field is required.",
      validate: (value) =>
        value === getValues().password ||
        "Passwords need to match.",
    })}
  />
</StyledContainer> */
}
