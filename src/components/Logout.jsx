// import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { StyledLogoutButton } from "../styles/DashboardStyles";
import { useLogout } from "../authentication/useLogout";
import SpinnerMini from "../ui/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <StyledLogoutButton disabled={isPending} onClick={logout}>
      {!isPending ? "Logout" : <SpinnerMini />}
    </StyledLogoutButton>
  );
}

export default Logout;
