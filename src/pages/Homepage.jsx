import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import StyledContainer from "../ui/StyledContainer";
import styled from "styled-components";
import Header from "../components/Header";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c3b48;
  margin: 4rem;
`;

function Homepage() {
  return (
    <>
      <Header />
      <FullScreenContainer>
        <StyledContainer $width="46.5rem" $height="74rem">
          <StyledInput type="text" placeholder="username"></StyledInput>
          <StyledInput type="password" placeholder="password"></StyledInput>
          <StyledButton></StyledButton>
        </StyledContainer>
      </FullScreenContainer>
    </>
  );
}

export default Homepage;
