import { useState } from "react";
import styled from "styled-components";
import StyledInput from "../ui/StyledInput";
import StyledHeader from "../ui/StyledHeader";
import StyledButton from "../ui/StyledButton";
import { usePasswordRecovery } from "../authentication/usePasswordRecovery";
import SpinnerMini from "../ui/SpinnerMini";

const CenteredMessage = styled.div`
  display: flex;
  height: 100vh;
  min-width: 60rem;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #c9c7f2;
`;

function ForgotPasswordPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const { pwRecovery, isPending } = usePasswordRecovery();

  function handleSubmit(e) {
    e.preventDefault();

    if (!emailAddress) return;

    pwRecovery(emailAddress, {
      onSettled: () => {
        setEmailAddress("");
      },
    });
  }

  return (
    <CenteredMessage>
      <form style={{ padding: "1rem" }} onSubmit={handleSubmit}>
        <StyledHeader $color="var(--brand-color)" $fontSize="2.5rem">
          Enter account email to initiate password recovery.
        </StyledHeader>
        <StyledInput
          type="email"
          id="email"
          placeholder="Your email"
          value={emailAddress}
          autoComplete="email"
          onChange={(e) => setEmailAddress(e.target.value)}
          width="45rem"
          disabled={isPending}
        />
        <StyledButton
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
          $marginLeft="1rem"
          $padding="1rem"
          disabled={isPending}
        >
          {!isPending ? "Submit" : <SpinnerMini />}
        </StyledButton>
      </form>
    </CenteredMessage>
  );
}

export default ForgotPasswordPage;
