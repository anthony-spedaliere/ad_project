// import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { StyledLogoutButton } from "../styles/DashboardStyles";
import { useLogout } from "../authentication/useLogout";
import SpinnerMini from "../ui/SpinnerMini";
import { useState } from "react";
import CustomModal from "../ui/CustomModal";

function Logout() {
  const { logout, isPending } = useLogout();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    // add delete logic here
    logout();
    setIsModalVisible(false);
  };

  return (
    <>
      <StyledLogoutButton
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          showModal();
        }}
      >
        {!isPending ? "Logout" : <SpinnerMini />}
      </StyledLogoutButton>
      <CustomModal
        title="Logout"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
        bgColor="var(--background-color)"
        textColor="var(--brand-color)"
        okBgColor="var(--blue-color)"
        okTextColor="var(--color-grey-200)"
        cancelTextColor="var(--background-color)"
        headerBgColor="var(--background-color)"
        headerTextColor="var(--brand-color)"
        defaultBgColor="var(--brand-color)"
      >
        Please confirm you want to log out.
      </CustomModal>
    </>
  );
}

export default Logout;
