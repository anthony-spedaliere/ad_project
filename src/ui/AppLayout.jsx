import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { StyledADashboardLayout } from "../styles/DashboardStyles";
import Sidebar from "./Sidebar";

// Styled Components
const Main = styled.main`
  background-color: var(--background-color);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120rem;
  margin: 0 auto;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <>
      <StyledADashboardLayout>
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledADashboardLayout>
    </>
  );
}

export default AppLayout;
