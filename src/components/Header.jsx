import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  WebsiteName,
  NavLinks,
  StyledHeaderLink,
} from "../styles/HeaderStyles";

import logo from "../assets/images/Duck.png";
import styled from "styled-components";
import { Modal } from "antd";
import { useState } from "react";

const AboutButton = styled.button`
  color: var(--color-grey-50);
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-grey-400);
  }
`;

const StyledAboutModal = styled(Modal)``;

function Header() {
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);

  //=====================================================================
  //=====================================================================

  // Reset Modal functions
  const showAboutModal = () => {
    setIsAboutModalVisible(true);
  };

  const handleCancel = () => {
    setIsAboutModalVisible(false);
  };

  const handleConfirm = () => {
    handleCancel();
  };

  //=====================================================================
  //=====================================================================

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
        <WebsiteName>Draft Apex</WebsiteName>
      </LogoContainer>
      <NavLinks>
        <AboutButton onClick={showAboutModal}>About</AboutButton>
        <StyledHeaderLink to="/signup">Sign Up</StyledHeaderLink>
      </NavLinks>
      <StyledAboutModal
        title="About Draft Apex"
        open={isAboutModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        This is a test.
      </StyledAboutModal>
    </HeaderContainer>
  );
}

export default Header;
