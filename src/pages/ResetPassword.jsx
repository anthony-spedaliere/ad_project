import styled from "styled-components";
import StyledInput from "../ui/StyledInput";
import StyledHeader from "../ui/StyledHeader";
import StyledButton from "../ui/StyledButton";
import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";

const CenteredMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function ResetPassword() {
  const [accessToken, setAccessToken] = useState(null);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch the session and access token when the component mounts
  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAccessToken(session?.access_token);
    }

    fetchSession();
  }, []);

  function onSubmit() {}

  return (
    <CenteredMessage>
      <form style={{ padding: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader $color="var(--brand-color)" $fontSize="2.5rem">
          Enter new password.
        </StyledHeader>
        <FormRow
          label="New Password (Minimum of 8 characters.)"
          error={errors?.password?.message}
        >
          <StyledInput
            type="password"
            id="password"
            // disabled={isPending}
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
          label="Confirm New Password"
          error={errors?.confirmPassword?.message}
        >
          <StyledInput
            type="password"
            id="confirmPassword"
            // disabled={isPending}
            {...register("confirmPassword", {
              required: "This field is required.",
              validate: (value) =>
                value === getValues().password || "Passwords need to match.",
            })}
          />
        </FormRow>
        <StyledButton
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
          $marginLeft="1rem"
          $padding="1rem"
          // disabled={isPending}
        >
          Submit
        </StyledButton>
      </form>
    </CenteredMessage>
  );
}

export default ResetPassword;
