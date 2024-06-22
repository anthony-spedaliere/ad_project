import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomLink = styled(Link)`
  color: ${(props) => props.$customColor || "white"};
  text-decoration: none;
  font-size: 2rem;
  transition: color 0.3s ease;
  margin-left: auto;
  font-weight: ${(props) => props.$fontWeight || "none"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

function StyledLink({ to, fontWeight, customColor, children }) {
  return (
    <>
      <CustomLink to={to} $customColor={customColor} $fontWeight={fontWeight}>
        {children}
      </CustomLink>
    </>
  );
}

export default StyledLink;
