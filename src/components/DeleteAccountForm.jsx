import { useState } from "react";
import { useLogout } from "../authentication/useLogout";
import { useUpdateUserDeletedToTrue } from "../authentication/useUpdateUserDeletedToTrue";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

// styles
import StyledButton from "../ui/StyledButton";
import styled from "styled-components";
import CustomModal from "../ui/CustomModal";

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

function DeleteAccountForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useLogout();
  const { id } = useUser();
  const { deleteUser, isPending } = useUpdateUserDeletedToTrue();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    deleteUser(id, {
      onSuccess: () => {
        logout();
      },
      onError: (error) => {
        toast.error(`There was an error deleting the draft: ${error.message}`);
      },
    });
    setIsModalVisible(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        showModal();
      }}
    >
      <Container $bgColor="var(--background-color-dark)" $height="8rem">
        <StyledButton
          disabled={isPending}
          $flex="1"
          $marginRight="2rem"
          $marginLeft="2rem"
          $bgColor="var(--red-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--red-color-dark)"
        >
          Delete Account
        </StyledButton>
        <CustomModal
          title="Delete Account"
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={handleCancel}
          okText="Confirm"
          cancelText="Cancel"
          bgColor="var(--background-color)"
          textColor="var(--brand-color)"
          okBgColor="var(--red-color)"
          okTextColor="var(--background-color)"
          cancelTextColor="var(--background-color)"
          headerBgColor="var(--background-color)"
          headerTextColor="var(--red-color)"
          defaultBgColor="var(--brand-color)"
        >
          Are you sure you want to delete the account? This cannot be undone.
        </CustomModal>
      </Container>
    </form>
  );
}

export default DeleteAccountForm;
