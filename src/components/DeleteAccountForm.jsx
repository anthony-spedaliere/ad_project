import StyledButton from "../ui/StyledButton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
  background-color: ${(props) => props.$bgColor || "none"};
  height: ${(props) => props.$height || "none"};
  border-radius: ${(props) => props.borderRadius || "2rem"};
  border: none;
`;

function DeleteAccountForm() {
  return (
    <form onSubmit={() => {}}>
      <Container $bgColor="var(--background-color-dark)" $height="8rem">
        <StyledButton
          $flex="1"
          $marginRight="2rem"
          $marginLeft="2rem"
          $bgColor="var(--red-color)"
          $textColor="var(--background-color)"
          $hoverBgColor="var(--red-color-dark)"
        >
          Delete Account
        </StyledButton>
      </Container>
    </form>
  );
}

export default DeleteAccountForm;
