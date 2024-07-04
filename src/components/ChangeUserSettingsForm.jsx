import FormRow from "../ui/FormRow";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";

import { useUser } from "../authentication/useUser";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const currentUsername = useSelector((state) => state.user.username);
  const currentEmail = useSelector((state) => state.user.email);

  return (
    <form onSubmit={() => {}}>
      <StyledHeader $fontSize="4rem">User Settings</StyledHeader>
      <FormRow label="Username (Username can be between 1-20 characters in length.)">
        <StyledInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUsername}
        />
      </FormRow>
      <FormRow label="Email (cannot be modified)">
        <StyledInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentEmail}
          disabled={true}
          $bgColor="var(--color-grey-400)"
        />
      </FormRow>
      <Container>
        <StyledButton
          $flex="1"
          $marginLeft="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
        >
          Save
        </StyledButton>
        <StyledButton
          $flex="1"
          $marginRight="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
        >
          Cancel
        </StyledButton>
      </Container>
    </form>
  );
}

export default ChangeUserSettingsForm;
