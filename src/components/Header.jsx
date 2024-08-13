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
import { Button, Modal } from "antd";
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
        centered
        open={isAboutModalVisible}
        onOk={handleConfirm}
        footer={[
          <Button key="ok" type="primary" onClick={handleConfirm}>
            Ok
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        Draft Apex is a versatile web application created to support users with
        a wide range of drafting needs, including fantasy sports, video games,
        and more. Developed as a personal project, Draft Apex operates
        independently and is not associated with any other organization or
        entity. &copy;2024
      </StyledAboutModal>
    </HeaderContainer>
  );
}

export default Header;
