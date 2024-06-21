// HeaderStyles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--background-color);
  color: var(--color-grey-50);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  height: 5rem;
  margin-right: 1rem;
  background-color: var(--color-grey-50);
`;

export const WebsiteName = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
`;

export const StyledLink = styled(Link)`
  color: var(--color-grey-50);
  text-decoration: none;
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-grey-400);
  }
`;
