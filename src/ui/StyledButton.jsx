// StyledButton.js
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "5rem"};
  margin-top: ${(props) => props.$marginTop || "0"};
  margin-left: ${(props) => props.$marginLeft || "0"};
  margin-right: ${(props) => props.$marginRight || "0"};
  flex: ${(props) => props.$flex || "none"};
  background-color: ${(props) => props.$bgColor || "#35343F"};
  box-shadow: ${(props) =>
    props.dropShadow || "0px 4px 6px rgba(0, 0, 0, 0.1)"};
  border-radius: ${(props) => props.borderRadius || "2rem"};
  border: none;
  color: ${(props) => props.$textColor || "var(--brand-color)"};
  font-size: ${(props) => props.$fontSize || "2.6rem"};
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: ${(props) => props.$padding || "0"};

  &:hover {
    background-color: ${(props) => props.$hoverBgColor || "#2E2D34"};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-700);
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(100%);
    box-shadow: none;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}> {children || "Submit"} </StyledButton>;
};

export default Button;
