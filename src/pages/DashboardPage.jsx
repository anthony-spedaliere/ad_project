// Components
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-width: 100rem;
`;

function DashboardPage() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default DashboardPage;
