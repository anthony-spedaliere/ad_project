import { DashboardSettingsContentContainer } from "../styles/DashboardStyles";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccountForm from "../components/DeleteAccountForm";
import ChangeUserEmailForm from "../components/ChangeUserEmailForm";
import StyledHeader from "../ui/StyledHeader";
import ChangeUserUsernameForm from "../components/ChangeUserUsernameForm";

function SettingsPage() {
  return (
    <DashboardSettingsContentContainer>
      <StyledHeader $fontSize="4rem">User Settings</StyledHeader>

      <ChangeUserEmailForm />
      <ChangeUserUsernameForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </DashboardSettingsContentContainer>
  );
}

export default SettingsPage;
