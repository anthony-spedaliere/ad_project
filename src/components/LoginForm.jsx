// LoginForm.js
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import StyledContainer from "../ui/StyledContainer";
import styled from "styled-components";
import StyledHeader from "../ui/StyledHeader";
import StyledCheckbox from "../ui/StyledCheckbox";
import StyledLink from "../ui/StyledLink";
import HorizontalLine from "../ui/HorizontalLine";
import SocialMediaIcons from "../ui/SocialMediaIcons";
import SignUp from "../ui/SignUp";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function LoginForm() {
  return (
    <>
      <FullScreenContainer>
        <StyledContainer
          $width="46.5rem"
          $height="74rem"
          $margin="1rem"
          $customPadding="2.5rem"
        >
          <StyledHeader $color="var(--background-color)" $fontSize="5rem">
            Login
          </StyledHeader>
          <StyledInput type="text" placeholder="username"></StyledInput>
          <StyledInput type="password" placeholder="password"></StyledInput>
          <StyledCheckbox>Remember Me?</StyledCheckbox>
          <StyledButton>Login</StyledButton>
          <StyledLink
            to="/signup"
            customColor="var(--background-color)"
            fontWeight="700"
          >
            Forgot Password?
          </StyledLink>
          <HorizontalLine />
          <SocialMediaIcons />
          <SignUp />
        </StyledContainer>
      </FullScreenContainer>
    </>
  );
}

export default LoginForm;
