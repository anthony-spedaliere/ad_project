import styled from "styled-components";
import { DashboardSettingsContentContainer } from "../styles/DashboardStyles";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";

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

function SettingsPage() {
  return (
    <DashboardSettingsContentContainer>
      <form onSubmit={() => {}}>
        <h1>Settings</h1>
        <FormRow label="Username">
          <StyledInput type="text" id="username" placeholder="Username" />
        </FormRow>
        <FormRow label="Email">
          <StyledInput type="email" id="email" placeholder="Email" />
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

      <form onSubmit={() => {}}>
        <h1>Change Password</h1>
        <FormRow label="Current Password">
          <StyledInput
            type="password"
            id="currentPassword"
            placeholder="Current password"
          />
        </FormRow>
        <FormRow label="New Password">
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
      <form onSubmit={() => {}}>
        <Container $bgColor="var(--background-color-dark)" $height="8rem">
          <StyledButton
            $flex="1"
            $marginRight="2rem"
            $marginLeft="2rem"
            $bgColor="var(--red-color)"
            $textColor="var(--background-color)"
            $hoverBgColor="var(--red-color-dark)"
          >
            Delete Account
          </StyledButton>
        </Container>
      </form>
    </DashboardSettingsContentContainer>
  );
}

export default SettingsPage;
