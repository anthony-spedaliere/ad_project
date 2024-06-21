import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  WebsiteName,
  NavLinks,
  StyledLink,
} from "../styles/HeaderStyles";

import logo from "../assets/images/great-white-shark.png";

function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
        <WebsiteName>Draft Apex</WebsiteName>
      </LogoContainer>
      <NavLinks>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/signup">Sign Up</StyledLink>
      </NavLinks>
    </HeaderContainer>
  );
}

export default Header;
