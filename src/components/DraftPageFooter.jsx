import styled from "styled-components";
import { LeaveLiveDraft } from "../ui/CustomModals";
import { useState } from "react";
import { useUpdateHasJoined } from "../authentication/useUpdateHasJoined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledFooter = styled.footer`
  grid-area: footer;
  background-color: var(--background-color-dark);
  color: var(--brand-color);
  display: flex;
  justify-content: flex-end;
  text-align: left;
  padding: 1rem 0;
  margin-right: 2rem;
  min-height: 5rem;
`;

const LeaveDraftButton = styled.button`
  color: ${(props) => props.$customColor || "var(--red-color)"};
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-bottom: ${(props) => props.$mgBottom || "0rem"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

function DraftPageFooter() {
  const navigate = useNavigate();
  // Get current draft ID and user ID from Redux state
  const userId = useSelector((state) => state.user.id);
  const [isLiveDraftModalVisible, setIsLiveDraftModalVisible] = useState(false);
  const { setHasJoined, isPending } = useUpdateHasJoined();

  //=====================================================================

  // Edit Modal functions
  const showLeaveLiveDraftModal = () => {
    setIsLiveDraftModalVisible(true);
  };

  const handleLeaveLiveDraftCancel = () => {
    setIsLiveDraftModalVisible(false);
  };

  const handleLeaveLiveDraftConfirm = () => {
    setHasJoined({ hasJoined: false, teamOwner: userId });
    handleLeaveLiveDraftCancel();
    navigate("/join-draft");
  };

  //=====================================================================

  return (
    <StyledFooter>
      <LeaveDraftButton onClick={showLeaveLiveDraftModal} disabled={isPending}>
        Leave Draft
      </LeaveDraftButton>
      <LeaveLiveDraft
        isLeaveLiveDraftModalVisible={isLiveDraftModalVisible}
        handleLeaveLiveDraftModalConfirm={handleLeaveLiveDraftConfirm}
        handleLeaveLiveDraftModalCancel={handleLeaveLiveDraftCancel}
      />
    </StyledFooter>
  );
}

export default DraftPageFooter;
