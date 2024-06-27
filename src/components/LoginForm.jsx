// LoginForm.js
import { useState } from "react";
import { useLogin } from "../authentication/useLogin";

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
import SpinnerMini from "../ui/SpinnerMini";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <FullScreenContainer>
        <form onSubmit={handleSubmit}>
          <StyledContainer
            $width="46.5rem"
            $height="74rem"
            $margin="1rem"
            $customPadding="2.5rem"
          >
            <StyledHeader $color="var(--background-color)" $fontSize="5rem">
              Login
            </StyledHeader>
            <StyledInput
              type="email"
              id="email"
              placeholder="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
            <StyledInput
              type="password"
              id="password"
              placeholder="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />

            <StyledCheckbox>Remember Me?</StyledCheckbox>
            <StyledButton disabled={isPending}>
              {!isPending ? "Login" : <SpinnerMini />}
            </StyledButton>

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
        </form>
      </FullScreenContainer>
    </>
  );
}

export default LoginForm;
