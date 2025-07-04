import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledADashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export const DashboardCustomLink = styled(Link)`
  color: ${(props) => props.$customColor || "white"};
  text-decoration: none;
  font-size: ${(props) => props.$fontSize || "2rem"};
  transition: color 0.3s ease;
  margin-left: ${(props) => props.$marginLeft || "none"};
  font-weight: ${(props) => props.$fontWeight || "none"};

  padding: 1rem;
  border-radius: 1.5rem;

  ${(props) =>
    props.$selected
      ? "background-color: var(--brand-color); color: var(--background-color);"
      : "background-color: transparent; color: var(--brand-color);"}

  &:hover {
    color: var(--color-grey-400);
  }
`;

export const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  color: #ba5f5f;
  font-weight: 700;
  font-size: 2.6rem;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

export const DashboardLinkContainer = styled.div`
  background-color: var(--background-color);
  height: 100vh;
  max-width: 90rem;
  margin: 0 auto;
`;

export const DashboardContentContainer = styled.div`
  background-color: var(--background-color);
  min-width: 120rem;
`;

export const DashboardSettingsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  background-color: var(--background-color);
  max-width: 90rem;
  margin: 0 auto;
`;
