import styled from "styled-components";
import DraftLeftSidebar from "../components/DraftLeftSidebar";
import DraftRightSidebar from "../components/DraftRightSidebar";
import { Outlet } from "react-router-dom";
import DraftPageFooter from "../components/DraftPageFooter";
import DraftHeader from "../components/DraftHeader";

// Styled Components
const DraftMain = styled.main`
  background-color: var(--background-color);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  grid-area: main;
  box-sizing: border-box;
  min-width: 120rem;
  min-height: 100rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 140rem;
  margin: 0 auto;
  gap: 3.2rem;
`;

const StyledADraftLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr 26rem;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "left header right"
    "left main right"
    "footer footer footer";
  min-height: 100vh;
  width: 100%;
`;

function DraftPage() {
  return (
    <>
      <StyledADraftLayout>
        <DraftLeftSidebar />
        <DraftHeader />
        <DraftMain>
          <Container>
            <Outlet />
          </Container>
        </DraftMain>
        <DraftRightSidebar />
        <DraftPageFooter />
      </StyledADraftLayout>
    </>
  );
}

export default DraftPage;
