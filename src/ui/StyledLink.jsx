import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomLink = styled(Link)`
  color: ${(props) => props.$customColor || "white"};
  text-decoration: none;
  font-size: ${(props) => props.$fontSize || "2rem"};
  transition: color 0.3s ease;
  margin-left: ${(props) => props.$marginLeft || "none"};
  font-weight: ${(props) => props.$fontWeight || "none"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

function StyledLink({
  to,
  marginLeft,
  fontWeight,
  customColor,
  fontSize,
  children,
}) {
  return (
    <>
      <CustomLink
        to={to}
        $customColor={customColor}
        $fontWeight={fontWeight}
        $marginLeft={marginLeft}
        $fontSize={fontSize}
      >
        {children}
      </CustomLink>
    </>
  );
}

export default StyledLink;
