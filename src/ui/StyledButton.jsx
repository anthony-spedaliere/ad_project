// StyledButton.js
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "5rem"};
  margin-top: ${(props) => props.$marginTop || "none"};
  margin-left: ${(props) => props.$marginLeft || "none"};
  margin-right: ${(props) => props.$marginRight || "none"};
  flex: ${(props) => props.$flex || "none"};
  background-color: ${(props) => props.$bgColor || "#35343F"};
  box-shadow: ${(props) =>
    props.dropShadow || "0px 4px 6px rgba(0, 0, 0, 0.1)"};
  border-radius: ${(props) => props.borderRadius || "2rem"};
  border: none;
  color: ${(props) => props.$textColor || "var(--brand-color)"};
  font-size: 2.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: ${(props) => props.$padding || "none"};

  &:hover {
    background-color: ${(props) => props.$hoverBgColor || "#2E2D34"};
  }

  &:focus {
    outline: none;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}> {children || "Submit"} </StyledButton>;
};

export default Button;
