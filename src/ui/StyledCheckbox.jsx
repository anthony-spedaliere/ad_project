import styled from "styled-components";

const StyledCheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${(props) => props.$textColor || "var(--background-color)"};
  font-weight: ${(props) => props.$fontWeight || "700"};
  margin-left: 0.5rem;
  margin-bottom: ${(props) => props.$marginBottom || "5rem"};
`;

const StyledCheckboxInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: var(--blue-color);

    &:after {
      display: block;
    }
  }
`;

const StyledCheckboxSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: var(--color-grey-50);
  border-radius: 0.5rem;
  box-shadow: ${(props) =>
    props.dropShadow || "0px 4px 6px rgba(0, 0, 0, 0.1)"};

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

function StyledCheckbox({
  fontWeight,
  marginBottom,
  textColor,
  checked,
  onChange,
  children,
}) {
  return (
    <StyledCheckboxLabel
      $fontWeight={fontWeight}
      $marginBottom={marginBottom}
      $textColor={textColor}
    >
      {children}
      <StyledCheckboxInput
        checked={checked}
        onChange={onChange}
      ></StyledCheckboxInput>
      <StyledCheckboxSpan></StyledCheckboxSpan>
    </StyledCheckboxLabel>
  );
}

export default StyledCheckbox;
