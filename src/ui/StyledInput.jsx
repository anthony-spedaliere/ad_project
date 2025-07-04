import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 2rem;
  background-color: ${(props) => props.$bgColor || "var(--color-grey-50)"};
  box-shadow: ${(props) =>
    props.dropShadow || "0px 4px 6px rgba(0, 0, 0, 0.1)"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "5rem"};
  border: 1px solid #ccc;
  padding: ${(props) => props.$customPadding || "1rem"};
  font-size: 1.6rem;
  color: ${(props) => props.color || "#000"};
  flex: ${(props) => props.$flex || "none"};

  &:focus {
    outline: none;
    border-color: #999;
  }

  /* Hide the arrows in Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* Hide the arrows in Chrome, Safari, Edge, and Opera */
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default StyledInput;
