import CustomModal from "../ui/CustomModal";

export function EditDraftSaveModal({
  isSaveModalVisible,
  handleSaveConfirm,
  handleSaveCancel,
}) {
  return (
    <CustomModal
      title="Save Changes"
      open={isSaveModalVisible}
      onOk={handleSaveConfirm}
      onCancel={handleSaveCancel}
      okText="Confirm"
      cancelText="Cancel"
      bgColor="var(--background-color)"
      textColor="var(--brand-color)"
      okBgColor="var(--brand-color)"
      okTextColor="var(--background-color)"
      cancelTextColor="var(--background-color)"
      headerBgColor="var(--background-color)"
      headerTextColor="var(--brand-color)"
      defaultBgColor="var(--red-color)"
    >
      Please confirm you want to save changes.
    </CustomModal>
  );
}

export function LeaveDraftCreationModal({
  isModalVisible,
  handleConfirm,
  handleCancel,
}) {
  return (
    <CustomModal
      title="Leave Draft Creation"
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
      Are you sure you want to exit Draft Creation? You may lose your progress.
    </CustomModal>
  );
}

export function ResetDraftFormModal({
  isResetModalVisible,
  handleResetConfirm,
  handleResetCancel,
}) {
  return (
    <CustomModal
      title="Reset New Draft Form"
      open={isResetModalVisible}
      onOk={handleResetConfirm}
      onCancel={handleResetCancel}
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
      Are you sure you want to reset the new draft form? This will reset all
      your progress.
    </CustomModal>
  );
}

export function EditDraftCancelModal({
  isCancelModalVisible,
  handleCancelConfirm,
  handleCancelCancel,
}) {
  return (
    <CustomModal
      title="Leave Edit Draft"
      open={isCancelModalVisible}
      onOk={handleCancelConfirm}
      onCancel={handleCancelCancel}
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
      Are you sure you want to leave edit draft mode?
    </CustomModal>
  );
}

export function DeleteDraftModal({
  isDeleteDraftModalVisible,
  handleDeleteDraftModalConfirm,
  handleDeleteDraftModalCancel,
}) {
  return (
    <CustomModal
      title="Delete Draft"
      open={isDeleteDraftModalVisible}
      onOk={handleDeleteDraftModalConfirm}
      onCancel={handleDeleteDraftModalCancel}
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
      Are you sure you want to delete this draft? It cannot be undone.
    </CustomModal>
  );
}

export function LeaveDraftModal({
  isLeaveDraftModalVisible,
  handleLeaveDraftModalConfirm,
  handleLeaveDraftModalCancel,
}) {
  return (
    <CustomModal
      title="Leave Draft"
      open={isLeaveDraftModalVisible}
      onOk={handleLeaveDraftModalConfirm}
      onCancel={handleLeaveDraftModalCancel}
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
      Are you sure you want to leave this draft? It cannot be undone.
    </CustomModal>
  );
}

export function RemoveTeamModal({
  isRemoveTeamModalVisible,
  handleRemoveTeamModalConfirm,
  handleRemoveTeamModalCancel,
}) {
  return (
    <CustomModal
      title="Remove User"
      open={isRemoveTeamModalVisible}
      onOk={handleRemoveTeamModalConfirm}
      onCancel={handleRemoveTeamModalCancel}
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
      Are you sure you want to remove user from draft?
    </CustomModal>
  );
}
