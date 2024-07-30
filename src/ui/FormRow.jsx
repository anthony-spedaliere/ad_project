import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;

  padding: ${(props) => props.$customPadding || "1.2rem 0"};
  /* font-weight: ${(props) => props.$fontWeight || "none"}; */

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--red-color);
`;

function FormRow({ customPadding, label, $error, children }) {
  return (
    <StyledFormRow $customPadding={customPadding}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {$error && <Error>{$error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
