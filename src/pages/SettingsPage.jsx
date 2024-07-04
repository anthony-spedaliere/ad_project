import { DashboardSettingsContentContainer } from "../styles/DashboardStyles";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeUserSettingsForm from "../components/ChangeUserSettingsForm";
import DeleteAccountForm from "../components/DeleteAccountForm";

function SettingsPage() {
  return (
    <DashboardSettingsContentContainer>
      <ChangeUserSettingsForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </DashboardSettingsContentContainer>
  );
}

export default SettingsPage;
