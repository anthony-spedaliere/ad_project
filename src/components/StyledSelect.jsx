import styled from "styled-components";

const StyledSelect = styled.select`
  border-radius: 1rem;
  background-color: var(--brand-color);
  color: var(--background-color);
  padding: 1rem;
  border: none;
  font-size: 1.6rem;
  width: ${(props) => props.$width || "100%"};
  flex: ${(props) => props.$flex || "none"};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:focus {
    outline: none;
  }
`;

export default StyledSelect;
