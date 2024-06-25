import styled from "styled-components";

// components
import StyledContainer from "../ui/StyledContainer";
import StyledHeader from "../ui/StyledHeader";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function SignupForm() {
  return (
    <>
      <FullScreenContainer>
        <form>
          <StyledContainer $width="60rem" $bgColor="var(--background-color)">
            <StyledContainer
              $bgColor="var(--background-color)"
              $rowGap="none"
              $customPadding="0rem 1rem"
            >
              <StyledHeader $fontSize="4rem" $fontWeight="400">
                Sign Up
              </StyledHeader>
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader $fontSize="2rem" $fontWeight="400">
                Username
              </StyledHeader>
              <StyledInput />
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader $fontSize="2rem" $fontWeight="400">
                Email
              </StyledHeader>
              <StyledInput />
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader $fontSize="2rem" $fontWeight="400">
                Confirm Email
              </StyledHeader>
              <StyledInput />
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader $fontSize="2rem" $fontWeight="400">
                Password
              </StyledHeader>
              <StyledInput />
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledHeader $fontSize="2rem" $fontWeight="400">
                Confirm Password
              </StyledHeader>
              <StyledInput />
            </StyledContainer>

            <StyledContainer $bgColor="var(--background-color)" $rowGap="none">
              <StyledButton
                $bgColor="var(--brand-color)"
                $textColor="var(--background-color)"
                $hoverBgColor="#B5B3DE"
              ></StyledButton>
            </StyledContainer>
          </StyledContainer>
        </form>
      </FullScreenContainer>
    </>
  );
}

export default SignupForm;
