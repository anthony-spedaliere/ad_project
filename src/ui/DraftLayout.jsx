import styled from "styled-components";
import { Outlet } from "react-router-dom";

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
  max-width: 140rem;
  margin: 0 auto;
  gap: 3.2rem;
`;

function DraftLayout() {
  return (
    <>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </>
  );
}

export default DraftLayout;
