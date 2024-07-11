import styled from "styled-components";

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RadioButton = styled.input`
  display: none;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  color: var(--background-color);
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--brand-color);
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
    content: "";
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 1rem;
    border: 2px solid white;
    border-radius: 50%;
    background-color: ${(props) => (props.checked ? "white" : "transparent")};
    transition: background-color 0.3s;
  }

  ${RadioButton}:checked + &::before {
    background-color: var(--blue-color);
  }
`;

export default { RadioGroup, RadioButton, RadioLabel };
