import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/newDraftSlice";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import {
  LeaveButton,
  NewDraftContainer,
  ProgressBarContainer,
} from "../styles/MyDraftStyles";
import CustomModal from "../ui/CustomModal";

function NewDraftPageThree() {
  const dispatch = useDispatch();
  //modal
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    navigate("/dashboard/my-drafts");
  };

  // track new draft creation page number
  useEffect(() => {
    dispatch(setCurrentPage(3));
  }, [dispatch]);

  return (
    <NewDraftContainer>
      <LeaveButton onClick={showModal}>Leave Draft Creation</LeaveButton>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
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
        Are you sure you want to exit Draft Creation? You may lose your
        progress.
      </CustomModal>
    </NewDraftContainer>
  );
}

export default NewDraftPageThree;
