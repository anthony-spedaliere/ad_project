import FormRow from "../ui/FormRow";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";

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
  return (
    <form onSubmit={() => {}}>
      <StyledHeader $fontSize="4rem">Change Password</StyledHeader>
      <FormRow label="Enter Current Password">
        <StyledInput
          type="password"
          id="currentPassword"
          placeholder="Current password"
        />
      </FormRow>
      <FormRow label="New Password (Minimum of 8 characters.)">
        <StyledInput
          type="password"
          id="newPassword"
          placeholder="New password"
        />
      </FormRow>
      <FormRow label="Confirm New Password">
        <StyledInput
          type="password"
          id="confirmNewPassword"
          placeholder="Confirm new password"
        />
      </FormRow>
      <Container>
        <StyledButton
          $flex="1"
          $marginRight="0"
          $bgColor="var(--brand-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--brand-color-dark)"
        >
          Submit
        </StyledButton>
      </Container>
    </form>
  );
}

export default ChangePasswordForm;
