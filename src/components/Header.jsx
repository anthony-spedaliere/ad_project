import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  WebsiteName,
  NavLinks,
  StyledHeaderLink,
} from "../styles/HeaderStyles";

import logo from "../assets/images/Duck.png";

function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
        <WebsiteName>Draft Apex</WebsiteName>
      </LogoContainer>
      <NavLinks>
        <StyledHeaderLink to="/about">About</StyledHeaderLink>
        <StyledHeaderLink to="/signup">Sign Up</StyledHeaderLink>
      </NavLinks>
    </HeaderContainer>
  );
}

export default Header;
